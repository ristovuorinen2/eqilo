import { formatPrice } from "@/lib/utils";
export function getOrderConfirmationEmailHtml(orderId: string, totalAmount: string | number, lang: "FI" | "EN" | "SE" = "FI") {
  const content = {
    FI: {
      title: "Tilaus vahvistettu!",
      p1: `Kiitos ostoksestasi Eqilolta. Tilauksesi <strong>#${orderId}</strong> on vastaanotettu ja se on nyt käsittelyssä.`,
      ref: "Tilausviite:",
      total: "Yhteensä:",
      delivery: "FDS Timing -laitteiden vakiotoimitusaika on <strong>1-2 viikkoa</strong>. Saat erillisen ilmoituksen seurantatunnuksella, kun laitteistosi on lähetetty.",
      questions: "Jos sinulla on kysyttävää, vastaa tähän sähköpostiin tai ota yhteyttä WhatsApp-asiakaspalveluumme.",
      regards: "Ystävällisin terveisin,<br/><strong>Eqilo-tiimi</strong>"
    },
    EN: {
      title: "Order Confirmed!",
      p1: `Thank you for your purchase from Eqilo. Your order <strong>#${orderId}</strong> has been successfully placed and is now being processed.`,
      ref: "Order Reference:",
      total: "Total Amount:",
      delivery: "Standard delivery for FDS Timing equipment is <strong>1-2 weeks</strong>. You will receive a separate notification with a tracking number once your equipment has been dispatched.",
      questions: "If you have any questions, feel free to reply to this email or contact us via our WhatsApp Helpdesk.",
      regards: "Best regards,<br/><strong>The Eqilo Team</strong>"
    },
    SE: {
      title: "Order bekräftad!",
      p1: `Tack för ditt köp från Eqilo. Din beställning <strong>#${orderId}</strong> har tagits emot och behandlas nu.`,
      ref: "Orderreferens:",
      total: "Totalbelopp:",
      delivery: "Standardleveranstid för FDS Timing-utrustning är <strong>1-2 veckor</strong>. Du kommer att få ett separat meddelande med ett spårningsnummer när din utrustning har skickats.",
      questions: "Om du har några frågor är du välkommen att svara på detta e-postmeddelande eller kontakta oss via vår WhatsApp-kundtjänst.",
      regards: "Med vänliga hälsningar,<br/><strong>Eqilo-teamet</strong>"
    }
  }[lang];

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
            <h2>${content.title}</h2>
            <p>${content.p1}</p>
            
            <div class="order-details">
              <div class="order-row">
                <span>${content.ref}</span>
                <span class="highlight">${orderId}</span>
              </div>
              <div class="order-row">
                <span>${content.total}</span>
                <span class="highlight">${formatPrice(Number(totalAmount))} €</span>
              </div>
            </div>

            <p>${content.delivery}</p>
            <p>${content.questions}</p>
            
            <p style="margin-top: 30px;">${content.regards}</p>
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
          <p><strong>Total Paid:</strong> ${formatPrice(Number(totalAmount))} €</p>
          <p><strong>Customer ID:</strong> ${customerId}</p>
          <br/>
          <p>Please check the <a href="https://eqilo.fi/admin">Eqilo Admin Dashboard</a> to begin processing this order.</p>
        </div>
      </body>
    </html>
  `;
}
