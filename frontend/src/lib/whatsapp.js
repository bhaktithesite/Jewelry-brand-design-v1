import { inr, METAL_LABEL } from "@/data/products";

export const WHATSAPP_PHONE = process.env.REACT_APP_WHATSAPP_PHONE;
export const WHATSAPP_DISPLAY = process.env.REACT_APP_WHATSAPP_DISPLAY;
const WHATSAPP_BASE_URL = process.env.REACT_APP_WHATSAPP_BASE_URL;
if (!WHATSAPP_PHONE || !WHATSAPP_DISPLAY || !WHATSAPP_BASE_URL) throw new Error("WhatsApp configuration is missing");

export const waLink = (message) =>
  `${WHATSAPP_BASE_URL}/${WHATSAPP_PHONE}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const displaySize = (size) => typeof size === "number" ? `US ${size}` : (size || "Standard Free Size / Adjustable");
const open = (url) => window.open(url, "_blank", "noopener,noreferrer");

export function buyNowWhatsApp(product, metal, size) {
  const message =
`✨ *ORDER INQUIRY — LUMIÈRE DEMI-FINE* ✨
━━━━━━━━━━━━━━━━━━━━
💍 *Piece:* ${product.name}
🏷️ *SKU:* ${product.id}
🪙 *Finish:* ${METAL_LABEL[metal] || metal || "18K Yellow Gold"}
📏 *Selected Size:* ${displaySize(size)}
💎 *Craft:* ${product.material} (Waterproof & Anti-Tarnish)
💰 *Offer Price:* ${inr(product.price)} (MRP: ${inr(product.originalPrice)})
🚚 *Shipping:* Free Express Delivery (COD / Prepaid Available)

💬 *Client Note:* "Hi LUMIÈRE team, I would like to purchase this piece. Please confirm availability and share payment/delivery steps."
━━━━━━━━━━━━━━━━━━━━`;
  const url = waLink(message);
  open(url);
  return url;
}

export function checkoutBagWhatsApp(cartItems, discount = 0) {
  if (!cartItems?.length) return null;
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const pieces = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const listText = cartItems.map((item, idx) =>
    `${idx + 1}. *${item.name}* (Qty: ${item.quantity})\n   • SKU: ${item.id}\n   • Finish: ${METAL_LABEL[item.selectedMetal] || item.selectedMetal} | Size: ${displaySize(item.selectedSize)}\n   • Line Price: ${inr(item.price * item.quantity)}`
  ).join("\n\n");
  const couponLine = discount > 0 ? `\n• Coupon LUXE10 (Buy 2, 10% OFF): -${inr(discount)}` : "";
  const message =
`🛍️ *VIP BAG CHECKOUT — LUMIÈRE DEMI-FINE* 🛍️
━━━━━━━━━━━━━━━━━━━━
Dear LUMIÈRE Concierge, I wish to place an order for my bag items:
${listText}
━━━━━━━━━━━━━━━━━━━━
📊 *Order Summary:*
• Total Pieces: ${pieces} Item${pieces > 1 ? "s" : ""}
• Subtotal: ${inr(total)}${couponLine}
• Grand Total: ${inr(total - discount)} INR
• Armored Shipping: FREE (Prepaid & Cash-on-Delivery)
• Lifetime Guarantee: 100% Anti-Tarnish & Waterproof

"Please confirm stock availability, estimated delivery date, and send payment details (UPI/Card/COD)."
━━━━━━━━━━━━━━━━━━━━`;
  const url = waLink(message);
  open(url);
  return url;
}

export function conciergeWhatsApp() {
  const url = waLink("Hi LUMIÈRE team 👋 I'd love some help choosing a piece from your demi-fine catalog.");
  open(url);
  return url;
}
