import { store } from "../data/siteData";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  weight: string;
  price: number;
  mrp: number;
  quantity: number;
  customDetails?: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  pincode?: string;
  notes?: string;
}

/**
 * Builds the standard cart order WhatsApp URL
 */
export function buildCartWhatsAppUrl(
  items: CartItem[],
  subtotal: number,
  deliveryCharge: number,
  customer: CustomerDetails
): string {
  const finalTotal = subtotal + deliveryCharge;
  const itemList = items
    .map((item, index) => {
      const itemTotal = item.price * item.quantity;
      const custom = item.customDetails ? ` (${item.customDetails})` : "";
      return `${index + 1}. *${item.name}* – ${item.weight}${custom} × ${item.quantity} = ₹${itemTotal}`;
    })
    .join("\n");

  const deliveryText =
    deliveryCharge === 0
      ? "FREE Delivery (Order above ₹" + store.freeDeliveryAbove + ")"
      : `₹${deliveryCharge} Delivery Charge`;

  const message = `🛒 *New Order, ${store.name}*

${itemList}

*Subtotal:* ₹${subtotal}
*Delivery:* ${deliveryText}
*Total Payable:* ₹${finalTotal}

👤 *Name:* ${customer.name || "Customer"}
📞 *Phone:* ${customer.phone || "Not provided"}
📍 *Delivery Address:* ${customer.address || "Not provided"}${
    customer.pincode ? ` (PIN: ${customer.pincode})` : ""
  }
📝 *Notes:* ${customer.notes || "None"}

_Payment: Pay via UPI / Cash on Delivery after WhatsApp confirmation._`;

  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}`;
}

/**
 * Direct WhatsApp message for a single product order
 */
export function buildSingleProductWhatsAppUrl(
  productName: string,
  weight: string,
  price: number,
  quantity: number = 1
): string {
  const total = price * quantity;
  const message = `👋 Hi ${store.name},

I would like to order:
• *${productName}*
• Weight: ${weight}
• Quantity: ${quantity}
• Total: ₹${total}

Please confirm availability and sharing delivery details. Thank you!`;

  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}`;
}

/**
 * WhatsApp message for customized gift box order
 */
export function buildCustomGiftWhatsAppUrl(params: {
  boxName: string;
  selectedFruits: string[];
  wrapName: string;
  greetingMessage: string;
  totalPrice: number;
  recipientName?: string;
  customerName?: string;
  customerPhone?: string;
  address?: string;
}): string {
  const fruitsList = params.selectedFruits.map((fruit) => `  • ${fruit}`).join("\n");

  const message = `🎁 *Custom Gift Box Order, ${store.name}*

📦 *Box Style:* ${params.boxName}
🌰 *Selected Dry Fruits:*
${fruitsList}

🎀 *Gift Packaging:* ${params.wrapName}
💌 *Greeting Message:* "${params.greetingMessage || "Best Wishes"}"
${params.recipientName ? `🎁 *Recipient:* ${params.recipientName}\n` : ""}
*Total Price:* ₹${params.totalPrice}

👤 *Sender Name:* ${params.customerName || "Customer"}
📞 *Sender Phone:* ${params.customerPhone || "Not provided"}
📍 *Shipping Address:* ${params.address || "To be provided on chat"}

_Please share payment details (UPI/Bank Transfer) to confirm this custom gift._`;

  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}`;
}

/**
 * WhatsApp message for bulk / corporate gifting enquiries
 */
export function buildBulkEnquiryWhatsAppUrl(enquiry: {
  name: string;
  company?: string;
  phone: string;
  occasion: string;
  quantity: string | number;
  budget?: string;
  deliveryDate?: string;
  notes?: string;
}): string {
  const message = `🏢 *Bulk & Corporate Gifting Enquiry, ${store.name}*

👤 *Contact Name:* ${enquiry.name}
${enquiry.company ? `🏢 *Company / Event:* ${enquiry.company}\n` : ""}📞 *Phone:* ${enquiry.phone}
🎉 *Occasion:* ${enquiry.occasion}
📦 *Estimated Quantity:* ${enquiry.quantity} boxes
💰 *Target Budget:* ${enquiry.budget ? `₹${enquiry.budget} per box` : "Flexible / Best rates"}
📅 *Required By Date:* ${enquiry.deliveryDate || "Soon"}
📝 *Special Requirements:* ${enquiry.notes || "Please share catalog and discount tiers"}

_Looking forward to your quotation and sample catalogue._`;

  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}`;
}

/**
 * General customer enquiry URL
 */
export function buildGeneralEnquiryWhatsAppUrl(customText?: string): string {
  const text =
    customText || `Hi ${store.name}, I want to know about your dry fruits and gift hampers.`;
  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(text)}`;
}
