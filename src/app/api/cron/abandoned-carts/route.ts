import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

export async function GET(request: Request) {
  try {
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not defined in the environment.");
    }
    const resend = new Resend(resendApiKey);
    // 1. Verify authorization header to prevent public triggering
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // 2. Calculate the threshold: 24 hours ago
    const yesterday = new Date();
    yesterday.setHours(yesterday.getHours() - 24);

    // 3. Find abandoned carts
    const cartsRef = adminDb.collection('carts');
    const abandonedCartsQuery = await cartsRef
      .where('updated_at', '<', yesterday)
      .where('abandoned_recovery_sent', '==', false)
      .where('is_public_link', '==', false)
      .get();

    let emailsSent = 0;

    for (const doc of abandonedCartsQuery.docs) {
      const cart = doc.data();
      
      // Skip empty carts or carts without a linked user
      if (!cart.items || cart.items.length === 0 || !cart.user_id) continue;

      // Fetch user email
      const userDoc = await adminDb.collection('customers').doc(cart.user_id).get();
      if (!userDoc.exists) continue;

      const user = userDoc.data();
      if (!user?.email) continue;

      // Send the email
      await resend.emails.send({
        from: 'Eqilo.fi <orders@eqilo.fi>',
        to: [user.email],
        subject: 'Did you forget something?',
        html: `
          <h1>Hi there!</h1>
          <p>We noticed you left some professional FDS Timing equipment in your cart.</p>
          <p>Your items are safe, but inventory is moving fast. Click below to return to your cart and complete your secure checkout.</p>
          <br/>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://eqilo.fi'}/cart" style="background-color: #0055A4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Return to Cart
          </a>
          <br/><br/>
          <p>Eqilo Oy</p>
        `
      });

      // Mark as sent so we don't spam them
      await doc.ref.update({ abandoned_recovery_sent: true });
      emailsSent++;
    }

    return NextResponse.json({ success: true, emailsSent });

  } catch (error: any) {
    console.error('Abandoned cart recovery failed:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
