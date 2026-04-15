"use server";

import { Order, Product } from "../types/firestore";
import { adminDb } from "../firebase/admin";
import path from "path";
import { formatPrice } from "@/lib/utils";

const fonts = {
  Roboto: {
    normal: path.join(process.cwd(), "src/lib/fonts/Roboto-Regular.ttf"),
    bold: path.join(process.cwd(), "src/lib/fonts/Roboto-Bold.ttf"),
    italics: path.join(process.cwd(), "src/lib/fonts/Roboto-Regular.ttf"),
    bolditalics: path.join(process.cwd(), "src/lib/fonts/Roboto-Bold.ttf"),
  },
};

export async function generateReceipt(
  userId: string,
  orderId: string
): Promise<{ success: boolean; pdf?: string; error?: string }> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const PdfPrinter = require("pdfmake/js/Printer").default;

    const orderDoc = await adminDb.collection("orders").doc(orderId).get();
    if (!orderDoc.exists) {
      throw new Error("Order not found");
    }

    const orderData = orderDoc.data() as Order;
    if (orderData.user_id !== userId) {
      throw new Error("Unauthorized to access this receipt");
    }

    // 1. Fetch full product details
    const products: (Product & { quantity: number; orderedPrice: number })[] = [];
    let grossTotal = 0;
    let vatTotal = 0;

    for (const item of orderData.items) {
      const doc = await adminDb.collection("products").doc(item.product_id).get();
      if (doc.exists) {
        const data = doc.data() as Product;
        products.push({ ...data, quantity: item.quantity, orderedPrice: item.price });
        const itemGross = item.price * item.quantity;
        const itemTaxRate = data.tax_rate || 25.5;
        const itemTax = itemGross - (itemGross / (1 + (itemTaxRate / 100)));
        grossTotal += itemGross;
        vatTotal += itemTax;
      }
    }

    const subtotal = grossTotal - vatTotal;
    const total = grossTotal;

    // 2. Define PDF Document
    const printer = new PdfPrinter(fonts);

    const docDefinition: Record<string, unknown> = {
      content: [
        { text: "EQILO.FI - RECEIPT / KUITTI", style: "header" },
        { text: `Receipt No: ${orderId.substring(0, 8).toUpperCase()}`, alignment: "right" },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        { text: `Date: ${new Date(orderData.created_at as any).toLocaleDateString('fi-FI')}`, alignment: "right", margin: [0, 0, 0, 20] },

        {
          columns: [
            {
              width: "*",
              stack: [
                { text: "FROM:", style: "subHeader" },
                "Eqilo Oy",
                "Hakkapeliitantie 4",
                "08350 LOHJA, Finland",
                "Business ID: 3530342-3",
              ],
            },
            {
              width: "*",
              stack: [
                { text: "BILLED TO:", style: "subHeader" },
                orderData.shipping_address.line1,
                `${orderData.shipping_address.postal_code} ${orderData.shipping_address.city}`,
                orderData.shipping_address.country || "Finland",
              ],
            },
          ],
        },

        { text: "Order Details", style: "sectionHeader", margin: [0, 20, 0, 10] },

        {
          table: {
            headerRows: 1,
            widths: ["*", "auto", "auto", "auto"],
            body: [
              [
                { text: "Product", style: "tableHeader" },
                { text: "Qty", style: "tableHeader" },
                { text: "Unit Price", style: "tableHeader" },
                { text: "Total", style: "tableHeader" },
              ],
              ...products.map((p) => [
                p.name,
                p.quantity.toString(),
                `${formatPrice(p.orderedPrice)} €`,
                `${formatPrice(p.orderedPrice * p.quantity)} €`,
              ]),
            ],
          },
          layout: "lightHorizontalLines",
        },

        {
          margin: [0, 20, 0, 0],
          layout: "noBorders",
          table: {
            widths: ["*", "auto"],
            body: [
              ["Subtotal (0% VAT)", { text: `${formatPrice(subtotal)} €`, alignment: "right" }],
              ["VAT (25.5%)", { text: `${formatPrice(vatTotal)} €`, alignment: "right" }],
              [
                { text: "GRAND TOTAL", bold: true, fontSize: 14 },
                { text: `${formatPrice(total)} €`, bold: true, fontSize: 14, alignment: "right" },
              ],
            ],
          },
        },
      ],
      styles: {
        header: { fontSize: 22, bold: true, color: "#0055A4", margin: [0, 0, 0, 10] },
        subHeader: { fontSize: 10, bold: true, color: "#666", margin: [0, 0, 0, 5] },
        sectionHeader: { fontSize: 14, bold: true, margin: [0, 20, 0, 10] },
        tableHeader: { bold: true, fontSize: 11, color: "black" },
      },
      defaultStyle: { font: "Roboto" },
    };

    // 3. Generate PDF and return as base64
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
      pdfDoc.on("data", (chunk: Buffer) => chunks.push(chunk));
      pdfDoc.on("end", async () => {
        const result = Buffer.concat(chunks);
        const base64 = result.toString("base64");
        resolve({ success: true, pdf: base64 });
      });
      pdfDoc.on("error", (err: Error) => reject({ success: false, error: err.message }));
      pdfDoc.end();
    });
  } catch (error) {
    console.error("Receipt generation failed:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}