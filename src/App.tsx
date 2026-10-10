/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { Header } from "./components/Header";
import { HeroSlider } from "./components/HeroSlider";
import { RoyalFloatingMarquee } from "./components/RoyalFloatingMarquee";
import { ProductGrid } from "./components/ProductGrid";
import { GiftsSection } from "./components/GiftsSection";
import { ProductDetailPage } from "./components/ProductDetailPage";
import { CartDrawer } from "./components/CartDrawer";
import { TrustSection } from "./components/TrustSection";
import { FloatingTestimonials } from "./components/FloatingTestimonials";
import { Footer } from "./components/Footer";
import { MobileBottomBar } from "./components/MobileBottomBar";
import { WishlistModal } from "./components/WishlistModal";
import { Toast } from "./components/Toast";
import { Product, products } from "./data/siteData";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Sync with browser back/forward or hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#product/")) {
        const slug = hash.replace("#product/", "");
        const matched = products.find((p) => p.slug === slug);
        if (matched) {
          setSelectedProduct(matched);
        }
      } else if (hash === "" || hash === "#" || hash === "#home") {
        setSelectedProduct(null);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleOpenProduct = (prod: Product) => {
    setSelectedProduct(prod);
    window.location.hash = `product/${prod.slug}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToStore = () => {
    setSelectedProduct(null);
    window.location.hash = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateHome = () => {
    setSelectedProduct(null);
    setActiveCategory("All Products");
    window.location.hash = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenCategories = () => {
    setSelectedProduct(null);
    window.location.hash = "";
    setTimeout(() => {
      const el = document.getElementById("products");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const handleExploreGifts = () => {
    setSelectedProduct(null);
    setActiveCategory("Gifts");
    window.location.hash = "gifts";
    setTimeout(() => {
      const el = document.getElementById("gifts");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const handleExploreProducts = () => {
    setSelectedProduct(null);
    window.location.hash = "products";
    setTimeout(() => {
      const el = document.getElementById("products");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const handleNavigateSection = (sectionId: "home" | "products" | "gifts" | "why-us" | "contact") => {
    setSelectedProduct(null);
    if (sectionId === "home") {
      setActiveCategory("All Products");
      window.location.hash = "";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.hash = sectionId;
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#29180E] font-sans">
          {/* Toast Notification */}
          <Toast />

          {/* Section 1: Header + Search */}
          <Header
            activeCategory={activeCategory}
            onSelectCategory={(cat) => {
              setSelectedProduct(null);
              setActiveCategory(cat);
            }}
            onSelectProduct={handleOpenProduct}
            onOpenWishlist={() => setIsWishlistOpen(true)}
            onNavigateHome={handleNavigateHome}
            onNavigateSection={handleNavigateSection}
          />

          {/* Direct Interface Switching: When an item is clicked, open new ProductDetailPage interface directly! */}
          {selectedProduct ? (
            <main className="flex-1">
              <ProductDetailPage
                product={selectedProduct}
                onBack={handleBackToStore}
                onSelectProduct={handleOpenProduct}
              />
            </main>
          ) : (
            <main className="flex-1">
              {/* Section 2: Clean visual Hero Banner Slider without context/text overlays */}
              <HeroSlider
                onSlideClick={(slideIdx) => {
                  if (slideIdx === 1 || slideIdx === 3) {
                    handleExploreGifts();
                  } else {
                    handleExploreProducts();
                  }
                }}
              />

              {/* Continuous Motion Floating Ribbon for ROYAL MEWA */}
              <RoyalFloatingMarquee />

              {/* Section 3: Clean Product Listing Grid with Category Tabs */}
              <ProductGrid
                activeCategory={activeCategory}
                onSelectCategory={(cat) => setActiveCategory(cat)}
                onOpenQuickView={handleOpenProduct}
              />

              {/* Section 4: Dedicated Gifts Section (#gifts) */}
              <GiftsSection
                onOpenQuickView={handleOpenProduct}
              />

              {/* Section 6 (Part 1): Trust & Reviews */}
              <TrustSection />
            </main>
          )}

          {/* Section 6 (Part 2): Footer & Contact with Google Map */}
          <Footer
            onSelectCategory={(cat) => {
              setSelectedProduct(null);
              setActiveCategory(cat);
            }}
            onExploreGifts={handleExploreGifts}
          />

          {/* Section 5 Drawer: Cart Drawer */}
          <CartDrawer />

          {/* Wishlist Modal */}
          <WishlistModal
            isOpen={isWishlistOpen}
            onClose={() => setIsWishlistOpen(false)}
            onSelectProduct={handleOpenProduct}
          />

          {/* Floating Customer Reviews Interface */}
          <FloatingTestimonials />

          {/* Global Mobile Sticky Bottom Bar */}
          <MobileBottomBar
            onNavigateHome={handleNavigateHome}
            onOpenCategories={handleOpenCategories}
            onNavigateGifts={handleExploreGifts}
          />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
