import React, { useState } from "react";
import { Star, Heart } from "lucide-react";
import { Product } from "../data/siteData";
import { useWishlist } from "../context/WishlistContext";

interface ProductCardProps {
  product: Product;
  onOpenQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenQuickView,
}) => {
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Selected weight for display (default first weight)
  const [selectedWeightIdx] = useState(0);

  const selectedWeight = product.weights[selectedWeightIdx] || product.weights[0];
  const discountPercent = Math.round(
    ((selectedWeight.mrp - selectedWeight.price) / selectedWeight.mrp) * 100
  );

  const isFavorited = isInWishlist(product.id);

  return (
    <div
      onClick={() => onOpenQuickView(product)}
      className="group relative flex flex-col bg-transparent cursor-pointer select-none"
    >
      {/* Top Media Area - Properly fitted in frame with clean padding & no cropping */}
      <div className="relative aspect-square w-full bg-white rounded-2xl overflow-hidden p-3.5 flex items-center justify-center border border-[#EADBCE]/80 group-hover:border-[#C49A5A] shadow-2xs group-hover:shadow-xs transition-all duration-300">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Bottom-left Brand Brown Discount Pill */}
        {discountPercent > 0 && (
          <div className="absolute bottom-2.5 left-2.5 bg-[#854D0E] text-[#FFF9F0] text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs tracking-wide">
            {discountPercent}% OFF
          </div>
        )}

        {/* Wishlist Heart Toggle at top-right */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-[#FAF7F2]/90 hover:bg-white text-[#8C7A6B] hover:text-rose-600 shadow-2xs backdrop-blur-xs transition-colors"
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorited ? "fill-rose-500 text-rose-500" : "text-[#7A685A]"
            }`}
          />
        </button>
      </div>

      {/* Product Content Details in Brand Brown Theme */}
      <div className="pt-3 pb-1 flex flex-col flex-1 justify-between">
        <div>
          {/* Title */}
          <h3 className="font-bold text-[15px] sm:text-base text-[#29180E] leading-snug line-clamp-1 group-hover:text-[#854D0E] transition-colors">
            {product.name}
          </h3>

          {/* Rating Stars & Count */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-[#29180E]">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <span className="text-[#8C7A6B] text-xs">
              ({product.reviewCount || 12})
            </span>
          </div>

          {/* Pricing Row: Strikethrough MRP + Brand Brown Price */}
          <div className="flex items-baseline gap-2 mt-2">
            {selectedWeight.mrp > selectedWeight.price && (
              <span className="text-xs sm:text-sm text-[#8C7A6B] line-through tabular-nums">
                Rs. {selectedWeight.mrp}.00
              </span>
            )}
            <span className="text-sm sm:text-base font-bold text-[#854D0E] tabular-nums">
              From Rs. {selectedWeight.price}.00
            </span>
          </div>
        </div>

        {/* Outline Button: Choose options in brand brown styling */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenQuickView(product);
          }}
          className="w-full mt-3 py-2 px-3 border border-[#854D0E]/60 hover:bg-[#854D0E] hover:text-[#FAF7F2] text-[#29180E] font-semibold text-xs sm:text-sm rounded-lg transition-colors text-center cursor-pointer active:scale-98"
        >
          Choose options
        </button>
      </div>
    </div>
  );
};
