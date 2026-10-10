import React, { useMemo } from "react";
import { products, Product } from "../data/siteData";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenQuickView: (prod: Product) => void;
}

const CATEGORY_TABS = [
  "All Products",
  "Nuts",
  "Dried Fruits",
  "Seeds",
  "Mixes & Snacks",
];

export const ProductGrid: React.FC<ProductGridProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenQuickView,
}) => {
  // Exclude gifts from Section 3 listing (Gift products live in separate dedicated Gifts section)
  const regularProducts = useMemo(() => {
    return products.filter((p) => p.category !== "Gifts");
  }, []);

  // Filter products by selected category (Nuts, Dried Fruits, Seeds, Mixes & Snacks, or All Products)
  const displayProducts = useMemo(() => {
    if (!activeCategory || activeCategory === "All Products" || activeCategory === "All" || activeCategory === "Gifts") {
      return regularProducts;
    }
    return regularProducts.filter((p) => p.category === activeCategory);
  }, [regularProducts, activeCategory]);

  return (
    <section id="products" className="py-10 sm:py-14 bg-[#FAF7F2] scroll-mt-24 border-t border-[#EADBCE]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Category Buttons in Brand Brown Theme */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 pb-4 border-b border-[#EADBCE]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#854D0E]">
              Fresh Pantry & Daily Nutrition
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#29180E] mt-0.5">
              {activeCategory && activeCategory !== "All Products" && activeCategory !== "Gifts"
                ? `${activeCategory} Collection`
                : "Premium Dry Fruits & Seeds"}
            </h2>
            <p className="text-xs sm:text-sm text-[#8C7A6B] mt-1">
              Showing {displayProducts.length} items · 100% natural, vacuum sealed for farm-fresh purity
            </p>
          </div>

          {/* Category Tabs in Website Brand Brown Styling */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none pb-1 self-start md:self-auto max-w-full">
            {CATEGORY_TABS.map((cat) => {
              const isSelected =
                activeCategory === cat ||
                (cat === "All Products" && (!activeCategory || activeCategory === "All" || activeCategory === "All Products"));

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#29180E] text-[#FAF7F2] shadow-xs font-bold scale-102"
                      : "bg-white hover:bg-[#F2ECE1] text-[#5C4A3E] border border-[#DDD3C5] hover:text-[#29180E]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Showcase Grid - No outer card borders, perfectly fitted frames */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {displayProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onOpenQuickView={onOpenQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
