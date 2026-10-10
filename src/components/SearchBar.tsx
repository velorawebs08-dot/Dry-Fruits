import React, { useState, useRef, useEffect } from "react";
import { Search, X, Star } from "lucide-react";
import { products, Product } from "../data/siteData";

interface SearchBarProps {
  onSelectProduct?: (product: Product) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSelectProduct, className = "" }) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Live search filtering across name, hindiName, category, description
  const filteredProducts = query.trim() === ""
    ? []
    : products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          (p.hindiName && p.hindiName.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      }).slice(0, 6);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (product: Product) => {
    setIsOpen(false);
    setQuery("");
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search almonds, cashews, dates, gift hampers..."
          className="w-full bg-[#FAF7F2] border border-[#D5C7B4] text-[#29180E] text-sm rounded-xl pl-10 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#854D0E] focus:border-transparent transition-all placeholder:text-[#8C7A6B]"
          aria-label="Search dry fruits and gift hampers"
        />
        <Search className="w-4 h-4 text-[#8C7A6B] absolute left-3.5 pointer-events-none" />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="absolute right-3 text-[#8C7A6B] hover:text-[#29180E] p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Live suggestions dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#E6DCCF] rounded-xl shadow-xl z-50 overflow-hidden divide-y divide-[#F1ECE4]">
          {filteredProducts.length > 0 ? (
            <div>
              <div className="px-3 py-1.5 bg-[#FAF7F2] text-[11px] font-semibold tracking-wider text-[#8C7A6B] uppercase">
                Products Matching "{query}"
              </div>
              {filteredProducts.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => handleSelect(prod)}
                  className="w-full px-3.5 py-2.5 flex items-center gap-3 hover:bg-[#FAF7F2] text-left transition-colors group"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-11 h-11 object-cover rounded-lg border border-[#EAE3D9] shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-semibold text-[#29180E] truncate group-hover:text-[#854D0E] transition-colors">
                        {prod.name}
                      </h4>
                      <span className="text-sm font-bold text-[#854D0E] shrink-0">
                        ₹{prod.weights[0].price}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#8C7A6B] mt-0.5">
                      <span>{prod.category}</span>
                      <span>·</span>
                      <span className="flex items-center text-amber-600 font-medium">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500 mr-0.5" />
                        {prod.rating}
                      </span>
                      <span>·</span>
                      <span>{prod.weights[0].weight}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-[#8C7A6B]">
              No products found for "{query}". Try searching for "Almonds", "Cashews", or "Diwali".
            </div>
          )}
        </div>
      )}
    </div>
  );
};
