import React from "react";
import { X, Heart, Trash2, ShoppingBag } from "lucide-react";
import { products, Product } from "../data/siteData";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart, showToast } = useCart();

  if (!isOpen) return null;

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="fixed inset-0" onClick={onClose} aria-label="Close wishlist dialog" />

      <div className="relative bg-white rounded-3xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-[#E8DFC8] z-10 p-5 sm:p-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8DFC8] mb-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            <h3 className="font-display text-lg font-bold text-[#29180E]">
              My Wishlist ({wishlist.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#8C7A6B] hover:text-[#29180E] rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="py-12 text-center">
            <Heart className="w-12 h-12 text-[#D0C0B0] mx-auto mb-3" />
            <h4 className="font-bold text-sm text-[#29180E]">Your wishlist is empty</h4>
            <p className="text-xs text-[#8C7A6B] mt-1">
              Tap the heart icon on any dry fruit or festive gift hamper to save it for later.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {wishlistProducts.map((prod) => (
              <div
                key={prod.id}
                className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#FAF7F2] border border-[#EADBCE] hover:bg-white transition-colors"
              >
                <div
                  onClick={() => {
                    onClose();
                    onSelectProduct(prod);
                  }}
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-14 h-14 object-cover rounded-xl border border-[#E0D5C7] shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-[#29180E] truncate">
                      {prod.name}
                    </h4>
                    <span className="text-[11px] font-bold text-[#854D0E]">
                      ₹{prod.weights[0].price} ({prod.weights[0].weight})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      addToCart({
                        productId: prod.id,
                        name: prod.name,
                        image: prod.image,
                        weight: prod.weights[0].weight,
                        price: prod.weights[0].price,
                        mrp: prod.weights[0].mrp,
                        quantity: 1,
                      });
                      showToast(`Added ${prod.name} to cart`);
                    }}
                    className="p-2 rounded-xl bg-[#854D0E] hover:bg-[#713f0b] text-white text-xs font-bold shadow-2xs flex items-center gap-1"
                    title="Move to cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(prod.id)}
                    className="p-2 text-[#8C7A6B] hover:text-rose-600 rounded-xl hover:bg-white"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
