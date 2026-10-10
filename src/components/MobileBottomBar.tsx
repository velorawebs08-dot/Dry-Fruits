import React from "react";
import { Home, Grid, Sparkles, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { store } from "../data/siteData";

interface MobileBottomBarProps {
  onNavigateHome: () => void;
  onOpenCategories: () => void;
  onNavigateGifts: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onNavigateHome,
  onOpenCategories,
  onNavigateGifts,
}) => {
  const { totalCount, openDrawer } = useCart();

  return (
    <nav aria-label="Mobile Navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8DFC8] px-2 py-1.5 shadow-lg">
      <div className="grid grid-cols-5 items-center justify-items-center text-center">
        {/* Home */}
        <button
          type="button"
          onClick={onNavigateHome}
          className="flex flex-col items-center justify-center p-1 text-[#5C4A3E] hover:text-[#854D0E] transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Home</span>
        </button>

        {/* Categories */}
        <button
          type="button"
          onClick={onOpenCategories}
          className="flex flex-col items-center justify-center p-1 text-[#5C4A3E] hover:text-[#854D0E] transition-colors"
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Categories</span>
        </button>

        {/* Gifts (Highlighted) */}
        <button
          type="button"
          onClick={onNavigateGifts}
          className="flex flex-col items-center justify-center p-1 text-amber-700 hover:text-amber-800 transition-colors relative"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-amber-600 fill-amber-500" />
            <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          </div>
          <span className="text-[10px] font-bold mt-0.5 text-amber-800">Gifts</span>
        </button>

        {/* Cart */}
        <button
          type="button"
          onClick={openDrawer}
          className="flex flex-col items-center justify-center p-1 text-[#5C4A3E] hover:text-[#854D0E] transition-colors relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 min-w-4 h-4 px-1 bg-[#854D0E] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold mt-0.5">Cart</span>
        </button>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${store.whatsapp}?text=${encodeURIComponent(
            `Hi ${store.name}, I want to order dry fruits.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-1 text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
          <span className="text-[10px] font-semibold mt-0.5">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
};
