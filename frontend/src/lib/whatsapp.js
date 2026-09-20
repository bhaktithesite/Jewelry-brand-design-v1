export const WHATSAPP_PHONE = "919112299902";
export const WHATSAPP_DISPLAY = "+91 91122 99902";

export const waLink = (message) =>
  `https://wa.me/${WHATSAPP_PHONE}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

const open = (url) => window.open(url, "_blank", "noopener,noreferrer");

export function buyNowWhatsApp(product, metal, size) {
  const message =
`✨ *NEW ORDER INQUIRY — LUMIÈRE DEMI-FINE* ✨
━━━━━━━━━━━━━━━━━━━━
💍 *Item:* ${product.name}
🏷️ *SKU:* ${product.id}
🪙 *Finish:* ${metal}
📏 *Size:* ${size || 'Standard Free Size'}
💎 *Material:* 18K PVD Gold Plating over 925 Silver (Anti-Tarnish)
💰 *Offer Price:* ₹${product.price.toLocaleString()} (MRP: ~₹${product.originalPrice.toLocaleString()}~)
🚚 *Delivery:* Free Express Shipping (COD / Prepaid Available)

💬 *Client Message:* "Hi LUMIÈRE team, I want to order this piece! Please share delivery time and payment options."
━━━━━━━━━━━━━━━━━━━━`;

  const url = waLink(message);
  open(url);
  return url;
}

export function checkoutBagWhatsApp(cartItems, discount = 0) {
  if (!cartItems.length) return null;

  let listText = "";
  let total = 0;

  cartItems.forEach((item, idx) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    listText += `\n${idx + 1}. *${item.name}* (Qty: ${item.quantity})\n   • Finish: ${item.selectedMetal} | Size: ${item.selectedSize || 'Free Size'}\n   • Price: ₹${itemTotal.toLocaleString()}\n`;
  });

  const couponLine = discount > 0
    ? `\n• Subtotal: ₹${total.toLocaleString()}\n• Coupon LUXE10 (Buy 2, 10% OFF): -₹${discount.toLocaleString()}`
    : "";

  const message =
`🛍️ *SHOPPING BAG ORDER — LUMIÈRE DEMI-FINE* 🛍️
━━━━━━━━━━━━━━━━━━━━
Hi LUMIÈRE team, I would like to place an order for my bag items:
${listText}
━━━━━━━━━━━━━━━━━━━━
📊 *Order Summary:*
• Total Items: ${cartItems.reduce((sum, i) => sum + i.quantity, 0)}${couponLine}
• Grand Total: ₹${(total - discount).toLocaleString()} INR
• Shipping: FREE Express Delivery
• Guarantee: Lifetime Anti-Tarnish & Waterproof Warranty

"Please confirm my order and share payment details (UPI/Card/COD)."
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
