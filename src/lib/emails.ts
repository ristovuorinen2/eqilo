export function getOrderConfirmationEmailHtml(orderId: string, totalAmount: string | number) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-scale; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; border: 1px solid #eaeaeb; border-radius: 8px; overflow: hidden; }
          .header { background-color: #0055A4; color: white; padding: 30px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
          .content { padding: 30px; background-color: #ffffff; }
          .content h2 { margin-top: 0; font-size: 20px; color: #1a1a1a; }
          .order-details { background-color: #f8fafc; padding: 20px; border-radius: 6px; margin: 20px 0; border: 1px solid #f1f5f9; }
          .order-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
          .order-row:last-child { margin-bottom: 0; padding-top: 10px; border-top: 1px solid #e2e8f0; font-weight: bold; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #64748b; background-color: #f8fafc; border-top: 1px solid #eaeaeb; }
          .highlight { color: #0055A4; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>EQILO.FI</h1>
          </div>
          <div class="content">
            <h2>Order Confirmed!</h2>
            <p>Thank you for your purchase from Eqilo. Your order <strong>#${orderId}</strong> has been successfully placed and is now being processed.</p>
            
            <div class="order-details">
              <div class="order-row">
                <span>Order Reference:</span>
                <span class="highlight">${orderId}</span>
              </div>
              <div class="order-row">
                <span>Total Amount:</span>
                <span class="highlight">€${Number(totalAmount).toFixed(2)}</span>
              </div>
            </div>

            <p>Standard delivery for FDS Timing equipment is <strong>1-2 weeks</strong>. You will receive a separate notification with a tracking number once your equipment has been dispatched.</p>
            <p>If you have any questions, feel free to reply to this email or contact us via our WhatsApp Helpdesk.</p>
            
            <p style="margin-top: 30px;">Best regards,<br/><strong>The Eqilo Team</strong></p>
          </div>
          <div class="footer">
            Eqilo Oy | Business ID: 3530342-3 | Hakkapeliitantie 4, 08350 LOHJA
          </div>
        </div>
      </body>
    </html>
  `;
}

export function getAdminNotificationEmailHtml(orderId: string, totalAmount: string | number, customerId: string) {
  return `
    <!DOCTYPE html>
    <html>
      <body style="font-family: sans-serif; color: #333; line-height: 1.5; padding: 20px;">
        <div style="border-left: 4px solid #0055A4; padding-left: 16px;">
          <h2 style="margin-top: 0; color: #0055A4;">🚨 New Eqilo Order Received</h2>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Total Paid:</strong> €${Number(totalAmount).toFixed(2)}</p>
          <p><strong>Customer ID:</strong> ${customerId}</p>
          <br/>
          <p>Please check the <a href="https://eqilo.fi/admin">Eqilo Admin Dashboard</a> to begin processing this order.</p>
        </div>
      </body>
    </html>
  `;
}
