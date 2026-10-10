import React, { useState, useEffect } from "react";
import { ArrowLeft, Star, Heart, MessageCircle, ShoppingBag, Check, ShieldCheck, Sparkles, Plus, Minus, Truck, RefreshCw, Award, Share2 } from "lucide-react";
import { Product, products, store } from "../data/siteData";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { buildSingleProductWhatsAppUrl } from "../lib/whatsapp";
import { ProductCard } from "./ProductCard";
import { GiftCard } from "./GiftCard";

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onSelectProduct,
}) => {
  const { addToCart, showToast } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedWeightIdx, setSelectedWeightIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const isFestivalBox = product.category === "Gifts";

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedWeightIdx(0);
    setQuantity(1);
  }, [product.id]);

  const selectedWeight = product.weights[selectedWeightIdx] || product.weights[0];
  const discountPercent = Math.round(
    ((selectedWeight.mrp - selectedWeight.price) / selectedWeight.mrp) * 100
  );
  const isFavorited = isInWishlist(product.id);

  // Companion product for Frequently Bought Together
  const companionProduct = products.find(
    (p) => p.id !== product.id && p.category === product.category
  ) || products[0];

  // Related products: when a festival box is clicked, specifically suggest other festival boxes!
  const relatedProducts = isFestivalBox
    ? products.filter((p) => p.category === "Gifts" && p.id !== product.id)
    : products
        .filter((p) => p.id !== product.id && (p.category === product.category || p.bestSeller))
        .slice(0, 4);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      weight: selectedWeight.weight,
      price: selectedWeight.price,
      mrp: selectedWeight.mrp,
      quantity,
      customDetails: product.inclusions ? product.inclusions.slice(0, 3).join(", ") : undefined,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleWhatsAppOrder = () => {
    const url = buildSingleProductWhatsAppUrl(
      product.name,
      selectedWeight.weight,
      selectedWeight.price,
      quantity
    );
    window.open(url, "_blank");
  };

  const handleAddCombo = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      weight: selectedWeight.weight,
      price: selectedWeight.price,
      mrp: selectedWeight.mrp,
      quantity: 1,
    });
    addToCart({
      productId: companionProduct.id,
      name: companionProduct.name,
      image: companionProduct.image,
      weight: companionProduct.weights[0].weight,
      price: companionProduct.weights[0].price,
      mrp: companionProduct.weights[0].mrp,
      quantity: 1,
    });
    showToast(`Added Combo (${product.name} + ${companionProduct.name}) to cart!`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on ${store.name}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Product link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-16">
      {/* Top Navigation & Breadcrumbs Bar */}
      <div className="bg-white border-b border-[#E8DFC8] sticky top-14 sm:top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#854D0E] hover:text-[#713f0b] transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{isFestivalBox ? "Back to Festival Gift Boxes" : "Back to All Products"}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="p-2 text-[#8C7A6B] hover:text-[#29180E] rounded-xl hover:bg-[#FAF7F2] transition-colors"
              title="Share Product"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className="p-2 text-[#8C7A6B] hover:text-rose-600 rounded-xl hover:bg-[#FAF7F2] transition-colors"
              title="Wishlist"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorited ? "fill-rose-500 text-rose-500" : "text-[#5C4A3E]"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Main Product Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="bg-white rounded-3xl border border-[#E8DFC8] shadow-sm p-4 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Product Visual Showcase */}
            <div className="lg:col-span-6 space-y-5">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-[#EADFD0] p-4 flex items-center justify-center shadow-inner group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Badges */}
                {discountPercent > 0 && (
                  <div className="absolute top-4 left-4 bg-rose-600 text-white text-xs sm:text-sm font-black px-3 py-1 rounded-lg shadow-sm">
                    {discountPercent}% OFF
                  </div>
                )}

                {product.bestSeller && (
                  <div className="absolute top-4 right-4 bg-amber-500 text-[#1E120A] text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-sm">
                    Best Seller
                  </div>
                )}
              </div>

              {/* Quality Trust Badges */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs text-[#5C4A3E]">
                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EADBCE]">
                  <ShieldCheck className="w-5 h-5 mx-auto text-emerald-600 mb-1" />
                  <span className="font-bold block text-[#29180E]">100% Pure</span>
                  <span className="text-[11px] text-[#8C7A6B]">Zero Preservatives</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EADBCE]">
                  <Sparkles className="w-5 h-5 mx-auto text-amber-600 mb-1" />
                  <span className="font-bold block text-[#29180E]">Vacuum Sealed</span>
                  <span className="text-[11px] text-[#8C7A6B]">Locks Natural Crunch</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EADBCE]">
                  <Award className="w-5 h-5 mx-auto text-[#854D0E] mb-1" />
                  <span className="font-bold block text-[#29180E]">FSSAI Certified</span>
                  <span className="text-[11px] text-[#8C7A6B]">Govt. Grade-A</span>
                </div>
              </div>
            </div>

            {/* Right Column: Contiguous Purchase Specification Module */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                {/* Category & Stock Indicator */}
                <div className="flex items-center justify-between text-xs text-[#8C7A6B] mb-2">
                  <span className="font-bold uppercase tracking-wider text-[#854D0E]">
                    {product.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-semibold text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    In Stock · Dispatched in 24 Hrs
                  </span>
                </div>

                {/* Product Title */}
                <h1 className="font-display text-2xl sm:text-4xl font-bold text-[#29180E] leading-tight">
                  {product.name}
                </h1>
                {product.hindiName && (
                  <p className="text-sm sm:text-base text-[#8C7A6B] font-medium mt-1">
                    {product.hindiName}
                  </p>
                )}

                {/* Rating & Reviews Bar */}
                <div className="flex items-center gap-2 mt-3 pb-4 border-b border-[#E8DFC8]">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-amber-500 text-amber-500"
                            : "text-[#D5C7B4]"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-[#29180E]">{product.rating}</span>
                  <span className="text-xs text-[#8C7A6B]">({product.reviewCount} customer ratings)</span>
                </div>

                {/* Price Display */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#29180E] tabular-nums">
                    ₹{selectedWeight.price}
                  </span>
                  {selectedWeight.mrp > selectedWeight.price && (
                    <span className="text-base text-[#8C7A6B] line-through tabular-nums">
                      MRP ₹{selectedWeight.mrp}
                    </span>
                  )}
                  <span className="text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                    You Save ₹{selectedWeight.mrp - selectedWeight.price} ({discountPercent}%)
                  </span>
                </div>
                <p className="text-[11px] text-[#8C7A6B] mt-1">
                  Inclusive of all taxes. Free delivery on orders above ₹{store.freeDeliveryAbove}.
                </p>

                {/* Pack Size / Weight Selection */}
                <div className="mt-6">
                  <label className="block text-xs font-bold text-[#29180E] uppercase tracking-wider mb-2.5">
                    Select Pack Size:
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {product.weights.map((w, idx) => {
                      const isSelected = selectedWeightIdx === idx;
                      return (
                        <button
                          key={w.weight}
                          type="button"
                          onClick={() => setSelectedWeightIdx(idx)}
                          className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                            isSelected
                              ? "border-[#854D0E] bg-amber-50/70 text-[#29180E] font-bold shadow-xs ring-2 ring-amber-500/20"
                              : "border-[#EADBCE] bg-[#FAF7F2] text-[#5C4A3E] hover:border-[#854D0E]/60 hover:bg-white"
                          }`}
                        >
                          <div className="text-xs font-semibold">{w.weight}</div>
                          <div className="text-sm font-extrabold text-[#854D0E] mt-1">
                            ₹{w.price}
                          </div>
                          {w.mrp > w.price && (
                            <div className="text-[10px] text-[#8C7A6B] line-through">
                              ₹{w.mrp}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="mt-6 flex items-center gap-4">
                  <span className="text-xs font-bold text-[#29180E] uppercase tracking-wider">
                    Quantity:
                  </span>
                  <div className="inline-flex items-center border-2 border-[#DDD3C5] rounded-xl bg-[#FAF7F2]">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2.5 text-[#5C4A3E] hover:text-[#29180E]"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-sm font-bold text-[#29180E] tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-2.5 text-[#5C4A3E] hover:text-[#29180E]"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm font-bold text-[#854D0E] tabular-nums">
                    Total: ₹{selectedWeight.price * quantity}
                  </span>
                </div>

                {/* Primary Purchase Buttons: Order on WhatsApp & Add to Cart */}
                <div className="mt-6 pt-5 border-t border-[#E8DFC8] space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* 1-Click WhatsApp Order */}
                    <button
                      type="button"
                      onClick={handleWhatsAppOrder}
                      className="py-3.5 px-5 rounded-2xl text-xs sm:text-sm font-bold bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
                    >
                      <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                      <span>Order on WhatsApp</span>
                    </button>

                    {/* Add to Cart */}
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className={`py-3.5 px-5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        justAdded
                          ? "bg-emerald-600 text-white shadow-md"
                          : "bg-[#854D0E] hover:bg-[#713f0b] text-white shadow-md active:scale-95"
                      }`}
                    >
                      {justAdded ? (
                        <>
                          <Check className="w-5 h-5" />
                          <span>Added to Cart!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-5 h-5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Phone order alternative */}
                  <div className="text-center">
                    <a
                      href={`tel:${store.phone}`}
                      className="text-xs text-[#8C7A6B] hover:text-[#29180E] font-medium"
                    >
                      Prefer calling? Tap to order via phone: <strong className="text-[#854D0E]">{store.phone}</strong>
                    </a>
                  </div>
                </div>

                {/* Inclusions checklist (for gift products) */}
                {product.inclusions && product.inclusions.length > 0 && (
                  <div className="mt-6 p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2.5">
                      Included in This Hamper Box:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-[#29180E]">
                      {product.inclusions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Health & Nutrition Benefits */}
                {product.healthBenefits && product.healthBenefits.length > 0 && (
                  <div className="mt-6 p-4 bg-[#FAF7F2] border border-[#EADBCE] rounded-2xl">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#854D0E] mb-2.5">
                      Key Health Benefits & Wellness Profile:
                    </h4>
                    <ul className="space-y-2 text-xs text-[#29180E]">
                      {product.healthBenefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Description Text */}
                <div className="mt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C7A6B] mb-2">
                    Description & Sourcing:
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5C4A3E] leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Bought Together Combo Section */}
        {companionProduct && (
          <div className="mt-10 bg-white rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 shadow-sm">
            <h3 className="font-display text-xl font-bold text-[#29180E] mb-4">
              Frequently Bought Together
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 sm:p-6 rounded-2xl bg-[#FAF7F2] border border-[#EADBCE]">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-18 h-18 object-cover rounded-2xl border border-[#EAE0D4] shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#29180E]">{product.name}</h4>
                    <span className="text-xs font-bold text-[#854D0E]">₹{selectedWeight.price}</span>
                  </div>
                </div>

                <span className="text-2xl font-black text-[#854D0E]">+</span>

                <div className="flex items-center gap-3">
                  <img
                    src={companionProduct.image}
                    alt={companionProduct.name}
                    className="w-18 h-18 object-cover rounded-2xl border border-[#EAE0D4] shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#29180E]">{companionProduct.name}</h4>
                    <span className="text-xs font-bold text-[#854D0E]">₹{companionProduct.weights[0].price}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <div className="text-right">
                  <span className="text-xs text-[#8C7A6B] block">Combo Price:</span>
                  <span className="font-display text-2xl font-bold text-[#29180E]">
                    ₹{selectedWeight.price + companionProduct.weights[0].price}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleAddCombo}
                  className="w-full sm:w-auto px-6 py-3 bg-[#854D0E] hover:bg-[#713f0b] text-white rounded-xl text-xs font-bold shadow-xs whitespace-nowrap transition-colors cursor-pointer"
                >
                  Add Both to Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Related Products / Suggested Festival Boxes Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#854D0E]">
                  {isFestivalBox ? "Royal Festive Collection" : "You May Also Like"}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#29180E]">
                  {isFestivalBox
                    ? "Other Festive Boxes & Luxury Hampers"
                    : "Recommended Dry Fruits & Mixes"}
                </h3>
                {isFestivalBox && (
                  <p className="text-xs text-[#8C7A6B] mt-1">
                    Explore our other handcrafted festival gift boxes and celebration hampers
                  </p>
                )}
              </div>
            </div>

            <div
              className={`grid gap-4 sm:gap-6 ${
                isFestivalBox
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[960px] mx-auto"
                  : "grid-cols-2 sm:grid-cols-4"
              }`}
            >
              {relatedProducts.map((rel) =>
                isFestivalBox ? (
                  <GiftCard
                    key={rel.id}
                    product={rel}
                    onOpenQuickView={(p) => onSelectProduct(p)}
                  />
                ) : (
                  <ProductCard
                    key={rel.id}
                    product={rel}
                    onOpenQuickView={(p) => onSelectProduct(p)}
                  />
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
