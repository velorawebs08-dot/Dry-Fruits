import React from "react";
import { Phone, MessageCircle, ShoppingBag, Sparkles, Heart } from "lucide-react";
import { store, Product } from "../data/siteData";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

interface HeaderProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  onSelectProduct?: (prod: Product) => void;
  onOpenWishlist?: () => void;
  onNavigateHome: () => void;
  onNavigateSection: (sectionId: "home" | "products" | "gifts" | "why-us" | "contact") => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenWishlist,
  onNavigateHome,
  onNavigateSection,
}) => {
  const { totalCount, openDrawer } = useCart();
  const { wishlist } = useWishlist();

  return (
    <header className="sticky top-0 z-40 bg-[#1E120A] text-[#FAF7F2] border-b border-[#3D2517] shadow-md">
      {/* Sleek, Compact Royal Main Header Bar (streamlined height, royal brown palette) */}
      <div className="max-w-7xl mx-auto px-4 py-2 sm:py-2.5">
        <div className="flex items-center justify-between gap-3 lg:gap-6">
          {/* Logo & Brand Zone - Plain logo & Shimmering Royal Mewa */}
          <div
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 cursor-pointer shrink-0 select-none group"
          >
            <img
              src={store.logo}
              alt={store.name}
              className="h-8 sm:h-9 w-auto object-contain group-hover:scale-105 transition-transform shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="font-display text-base sm:text-xl font-black tracking-wider text-royal-shimmer inline-block animate-float-subtle leading-none select-none drop-shadow-xs">
                ROYAL MEWA
              </span>
              <span className="text-[9px] sm:text-[10px] text-amber-200/80 font-medium tracking-wide mt-0.5 hidden xs:block">
                Premium Dry Fruits & Hampers
              </span>
            </div>
          </div>

          {/* Center: Clean, Refined Section Names with Rich Contrast */}
          <nav
            aria-label="Store Sections Navigation"
            className="hidden md:flex items-center justify-center gap-2 lg:gap-5 flex-1 mx-2 lg:mx-6"
          >
            <button
              type="button"
              onClick={() => onNavigateSection("home")}
              className="py-1 px-1.5 text-xs font-bold uppercase tracking-wider text-amber-200 border-b-2 border-amber-400 transition-all cursor-pointer whitespace-nowrap"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection("products")}
              className="py-1 px-1.5 text-xs font-bold uppercase tracking-wider text-[#E8DDD2] hover:text-amber-300 transition-all cursor-pointer whitespace-nowrap"
            >
              Products
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection("gifts")}
              className="flex items-center gap-1.5 py-1 px-2.5 text-xs font-bold uppercase tracking-wider text-amber-300 hover:text-amber-100 bg-amber-950/70 border border-amber-500/40 rounded-lg shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400 animate-pulse" />
              <span>Festival Boxes</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection("why-us")}
              className="py-1 px-1.5 text-xs font-bold uppercase tracking-wider text-[#E8DDD2] hover:text-amber-300 transition-all cursor-pointer whitespace-nowrap"
            >
              Why Choose Us
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection("contact")}
              className="py-1 px-1.5 text-xs font-bold uppercase tracking-wider text-[#E8DDD2] hover:text-amber-300 transition-all cursor-pointer whitespace-nowrap"
            >
              Store & Contact
            </button>
          </nav>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Call button */}
            <a
              href={`tel:${store.phone}`}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-[#FAF7F2] bg-[#2D1B10] hover:bg-[#3D2517] border border-[#4D2E1C] rounded-lg transition-colors"
              title="Call to Order"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call Us</span>
            </a>

            {/* WhatsApp button */}
            <a
              href={`https://wa.me/${store.whatsapp}?text=${encodeURIComponent(
                `Hi ${store.name}, I want to order dry fruits.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-lg shadow-xs transition-colors shrink-0"
              title="Chat & Order on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white text-[#25D366]" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            {/* Wishlist button */}
            {onOpenWishlist && (
              <button
                type="button"
                onClick={onOpenWishlist}
                className="relative p-1.5 sm:p-2 text-[#FAF7F2] hover:text-amber-300 bg-[#2D1B10] hover:bg-[#3D2517] border border-[#4D2E1C] rounded-lg transition-colors cursor-pointer"
                title="Wishlist"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4 text-amber-200" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {wishlist.length}
                  </span>
                )}
              </button>
            )}

            {/* Cart Icon Button with Item Count Badge */}
            <button
              type="button"
              onClick={openDrawer}
              className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 rounded-lg shadow-xs transition-transform active:scale-95 cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cart</span>
              {totalCount > 0 && (
                <span className="w-4 h-4 bg-[#1E120A] text-amber-300 text-[10px] font-black rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sections Navigation Row (Clean compact tabs in warm palette) */}
        <nav
          aria-label="Mobile Sections Navigation"
          className="md:hidden mt-2 pt-1.5 border-t border-[#331C0E] flex items-center justify-between gap-1 overflow-x-auto scrollbar-none pb-0.5"
        >
          <button
            type="button"
            onClick={() => onNavigateSection("home")}
            className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-300 border-b-2 border-amber-400 whitespace-nowrap cursor-pointer"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection("products")}
            className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-[#D4C4B5] hover:text-amber-300 whitespace-nowrap cursor-pointer"
          >
            Products
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection("gifts")}
            className="flex items-center gap-1 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 border border-amber-500/40 rounded-md whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>Festival Boxes</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection("why-us")}
            className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-[#D4C4B5] hover:text-amber-300 whitespace-nowrap cursor-pointer"
          >
            Why Us
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection("contact")}
            className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-[#D4C4B5] hover:text-amber-300 whitespace-nowrap cursor-pointer"
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
};
