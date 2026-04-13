import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="container py-10 md:py-16 max-w-3xl">
      <Link href="/checkout" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Checkout
      </Link>

      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">E-store Terms & Conditions</h1>
          <p className="text-muted-foreground">Last updated: April 2026</p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h3>1. General Information</h3>
          <p>
            Welcome to the Eqilo.fi webstore. These terms and conditions apply to all purchases of FDS Timing equipment and related services through our platform. By placing an order, you agree to be bound by these terms. 
          </p>
          <p>
            <strong>Company Details:</strong><br/>
            Eqilo Oy<br/>
            Business ID: 3530342-3<br/>
            Hakkapeliitantie 4, 08350 LOHJA<br/>
            Phone: +358 50 5633097
          </p>

          <h3>2. Pricing and Taxes</h3>
          <p>
            All prices displayed in the webstore are in Euros (€) and include the standard Finnish Value Added Tax (VAT) of 25.5%, unless explicitly stated otherwise for logged-in B2B customers with a valid Business ID (Y-tunnus). We reserve the right to change prices without prior notice.
          </p>

          <h3>3. Shipping and Delivery</h3>
          <p>
            <strong>Shipping within Finland:</strong> We offer a flat shipping rate of 20 € for orders under 200 €. Orders totaling 200 € or more qualify for free standard shipping. 
          </p>
          <p>
            <strong>Delivery Time:</strong> Standard delivery time is 1-2 weeks from the order confirmation, as FDS Timing devices are specialized professional equipment. You will receive a tracking number once your order has been dispatched.
          </p>
          <p>
            <strong>International Shipping:</strong> Shipping outside of Finland is available. However, custom shipping rates will apply and must be calculated separately.
          </p>

          <h3>4. Payment Methods</h3>
          <p>
            We use Stripe as our secure payment processor. Accepted payment methods include:
          </p>
          <ul>
            <li>MobilePay</li>
            <li>Apple Pay</li>
            <li>Google Pay</li>
            <li>Major Credit and Debit Cards</li>
          </ul>
          <p>
            Payment is captured at the time of order placement. For approved B2B customers, invoicing via Holvi.fi is available.
          </p>

          <h3>5. Account Creation and Privacy</h3>
          <p>
            To facilitate order tracking and customer service, an account is automatically created for you during your first purchase using your provided email or phone number. We process your personal data strictly in accordance with GDPR regulations.
          </p>

          <h3>6. Returns and Refunds</h3>
          <p>
            Consumers have the right to return unused, original-condition products within 14 days of receipt, in accordance with Finnish consumer protection laws. B2B purchases are generally non-refundable unless the equipment is defective. Please contact our support before returning any items.
          </p>

          <h3>7. Warranty and Liability</h3>
          <p>
            FDS Timing products are covered by a manufacturer's warranty. Eqilo Oy is not liable for indirect or consequential damages arising from the use of the equipment during competitions or training.
          </p>
        </div>
      </div>
    </div>
  );
}
