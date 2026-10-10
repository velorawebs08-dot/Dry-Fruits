import React, { useState } from "react";
import { X, Trash2, Plus, Minus, Phone, MessageCircle, ShoppingBag, CheckCircle2, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { useCart } from "../context/CartContext";
import { store } from "../data/siteData";
import { buildCartWhatsAppUrl, CustomerDetails } from "../lib/whatsapp";

const CUSTOMER_STORAGE_KEY = "royal_mewa_customer_v1";

export const CartDrawer: React.FC = () => {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    deliveryCharge,
    totalCount,
    showToast,
  } = useCart();

  const [customer, setCustomer] = useState<CustomerDetails>(() => {
    try {
      const saved = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      return saved
        ? JSON.parse(saved)
        : { name: "", phone: "", address: "", pincode: "", notes: "" };
    } catch {
      return { name: "", phone: "", address: "", pincode: "", notes: "" };
    }
  });

  const handleCustomerChange = (
    field: keyof CustomerDetails,
    val: string
  ) => {
    const updated = { ...customer, [field]: val };
    setCustomer(updated);
    try {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  if (!isDrawerOpen) return null;

  const totalPayable = subtotal + deliveryCharge;

  const handleSendWhatsAppOrder = () => {
    if (items.length === 0) {
      showToast("Your cart is empty. Add products before placing order!");
      return;
    }

    if (!customer.name.trim() || !customer.phone.trim()) {
      showToast("Please enter your name and phone number for delivery confirmation.");
      return;
    }

    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // non-blocking
    }

    const url = buildCartWhatsAppUrl(
      items,
      subtotal,
      deliveryCharge,
      customer
    );

    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0"
        onClick={closeDrawer}
        aria-label="Close cart drawer"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8DFC8] bg-[#FAF7F2] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#854D0E]" />
            <h3 className="font-display text-lg sm:text-xl font-bold text-[#29180E]">
              Your Cart ({totalCount} {totalCount === 1 ? "item" : "items"})
            </h3>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="p-1.5 rounded-full text-[#8C7A6B] hover:text-[#29180E] hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content: Items List + Customer Form */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#DDD3C5] flex items-center justify-center mx-auto mb-4 text-[#854D0E]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-display text-lg font-bold text-[#29180E]">
                Your shopping bag is empty
              </h4>
              <p className="text-xs text-[#8C7A6B] mt-1 max-w-xs mx-auto">
                Explore our selection of California almonds, whole cashews, and festive gift hampers.
              </p>
              <button
                type="button"
                onClick={closeDrawer}
                className="mt-5 px-5 py-2.5 bg-[#854D0E] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#713f0b]"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Itemized List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#8C7A6B]">
                  <span>Items in your bag</span>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-rose-600 hover:underline"
                  >
                    Clear Cart
                  </button>
                </div>

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 rounded-2xl border border-[#EADBCE] bg-[#FAF7F2] hover:bg-white transition-colors"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl border border-[#E0D5C7] shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-[#29180E] line-clamp-1">
                            {item.name}
                          </h4>
                          <span className="text-[11px] font-semibold text-[#854D0E]">
                            {item.weight}
                          </span>
                          {item.customDetails && (
                            <p className="text-[10px] text-[#8C7A6B] line-clamp-1 mt-0.5">
                              {item.customDetails}
                            </p>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-[#8C7A6B] hover:text-rose-600 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Stepper */}
                        <div className="inline-flex items-center border border-[#DDD3C5] rounded-lg bg-white">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-[#5C4A3E] hover:text-[#29180E]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-[#29180E] tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-[#5C4A3E] hover:text-[#29180E]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price Calculation */}
                        <div className="text-right">
                          <span className="text-xs sm:text-sm font-bold text-[#29180E] tabular-nums">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Details Form */}
              <div className="bg-[#FAF7F2] border border-[#EADBCE] rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#854D0E]">
                  Delivery Information (WhatsApp Order)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#29180E] mb-1">
                      Your Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={customer.name}
                      onChange={(e) => handleCustomerChange("name", e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="w-full bg-white border border-[#DDD3C5] rounded-xl px-3 py-2 text-xs text-[#29180E] focus:outline-none focus:ring-1 focus:ring-[#854D0E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#29180E] mb-1">
                      WhatsApp Phone Number <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="tel"
                      value={customer.phone}
                      onChange={(e) => handleCustomerChange("phone", e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full bg-white border border-[#DDD3C5] rounded-xl px-3 py-2 text-xs text-[#29180E] focus:outline-none focus:ring-1 focus:ring-[#854D0E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#29180E] mb-1">
                    Complete Delivery Address
                  </label>
                  <textarea
                    rows={2}
                    value={customer.address}
                    onChange={(e) => handleCustomerChange("address", e.target.value)}
                    placeholder="House/Flat number, Street name, Landmark, City..."
                    className="w-full bg-white border border-[#DDD3C5] rounded-xl px-3 py-2 text-xs text-[#29180E] focus:outline-none focus:ring-1 focus:ring-[#854D0E]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#29180E] mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      value={customer.pincode || ""}
                      onChange={(e) => handleCustomerChange("pincode", e.target.value)}
                      placeholder="e.g. 560001"
                      className="w-full bg-white border border-[#DDD3C5] rounded-xl px-3 py-2 text-xs text-[#29180E] focus:outline-none focus:ring-1 focus:ring-[#854D0E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#29180E] mb-1">
                      Order Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={customer.notes || ""}
                      onChange={(e) => handleCustomerChange("notes", e.target.value)}
                      placeholder="e.g. Call before delivery"
                      className="w-full bg-white border border-[#DDD3C5] rounded-xl px-3 py-2 text-xs text-[#29180E] focus:outline-none focus:ring-1 focus:ring-[#854D0E]"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Billing & WhatsApp Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#E8DFC8] bg-white space-y-3">
            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs text-[#5C4A3E]">
              <div className="flex justify-between">
                <span>Subtotal ({totalCount} items):</span>
                <span className="font-semibold text-[#29180E] tabular-nums">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge:</span>
                <span className="font-semibold tabular-nums">
                  {deliveryCharge === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#29180E] pt-2 border-t border-[#F0E6D8]">
                <span>Total Payable:</span>
                <span className="tabular-nums font-display text-xl text-[#854D0E]">
                  ₹{totalPayable}
                </span>
              </div>
            </div>

            {/* Offline Payment Note */}
            <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>No online card payment needed.</strong> Pay comfortably via UPI (Google Pay, PhonePe, Paytm) or Cash on Delivery after WhatsApp verification.
              </span>
            </div>

            {/* Order on WhatsApp Button */}
            <button
              type="button"
              onClick={handleSendWhatsAppOrder}
              className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-bold shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
              <span>Send Order on WhatsApp</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            {/* Call to Order Button */}
            <a
              href={`tel:${store.phone}`}
              className="w-full py-2.5 px-4 rounded-xl bg-[#FAF7F2] hover:bg-[#F2ECE1] border border-[#DDD3C5] text-[#29180E] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#854D0E]" />
              <span>Prefer Calling? Tap to Call: {store.phone}</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
