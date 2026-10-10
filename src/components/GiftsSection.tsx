import React, { useMemo } from "react";
import { Sparkles } from "lucide-react";
import { products, Product } from "../data/siteData";
import { GiftCard } from "./GiftCard";

interface GiftsSectionProps {
  onOpenQuickView: (prod: Product) => void;
}

export const GiftsSection: React.FC<GiftsSectionProps> = ({
  onOpenQuickView,
}) => {
  // All festival gift boxes without any category filter tabs
  const giftProducts = useMemo(() => {
    return products.filter((p) => p.category === "Gifts");
  }, []);

  return (
    <section
      id="gifts"
      className="py-12 sm:py-16 bg-gradient-to-b from-[#FAF7F2] via-[#F6ECE0] to-[#FAF7F2] border-t-2 border-b-2 border-amber-300/60 scroll-mt-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
            <span>Royal Festive Collection</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#29180E]">
            Gifts & Handcrafted Hampers
          </h2>
          <p className="text-sm sm:text-base text-[#6E584A] mt-2 font-normal">
            Express timeless affection, congratulations, and festive warmth with artisanal dry fruit treasure chests, packaged with royal golden trims.
          </p>
        </div>

        {/* Direct Gift Delivery Banner Section */}
        <div
          className="relative w-full rounded-[24px] shadow-lg overflow-hidden flex items-center justify-center min-h-[130px] sm:min-h-[140px] md:h-[145px] px-6 py-5 sm:py-6"
          style={{
            backgroundImage: `url("https://i.postimg.cc/gky0WRCB/Elegant-Chocolate-Gold-Ribbon-Banner.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Subtle soft dark overlay to ensure high readability while preserving texture, ribbons and bows */}
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />

          {/* Centered Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-4">
            <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl text-[#FFF5E6] tracking-tight leading-tight mb-1.5 drop-shadow-md">
              Direct Gift Delivery to Your Loved Ones
            </h3>
            <p className="text-xs sm:text-sm text-[#F7EBD9] leading-relaxed max-w-2xl drop-shadow-sm font-normal">
              We print your personal handwritten greeting message and deliver directly to the recipient's doorstep with zero billing invoice inside the gift box.
            </p>
          </div>
        </div>

        {/* Curated Festival Gift Boxes - Perfectly balanced with 1 and 3 sideways and 2 in middle, preserving exact card size */}
        <div className="max-w-[960px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 w-full">
          {giftProducts.map((gift) => (
            <GiftCard
              key={gift.id}
              product={gift}
              onOpenQuickView={onOpenQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
