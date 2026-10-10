import React from "react";
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck, Instagram, Facebook, Youtube, Heart } from "lucide-react";
import { store, categories } from "../data/siteData";

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onExploreGifts: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onExploreGifts,
}) => {
  return (
    <footer id="contact" className="bg-[#1E120A] text-white/80 pt-12 pb-24 md:pb-12 border-t border-[#3D2517] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={store.logo}
                alt={store.name}
                className="h-12 w-auto object-contain shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  {store.name}
                </h3>
                <p className="text-[11px] text-amber-300 font-medium">
                  {store.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-white/70">
              Direct-from-source authentic dry fruits, raw California nuts, Afghan anjeer, and luxury festive hampers. Hygienically sealed and dispatched fresh every single day.
            </p>

            {/* FSSAI Badge */}
            <div className="inline-flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">FSSAI Certified</span>
                <span className="text-[10px] text-white/60">Lic. #{store.fssai}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={store.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-amber-600 flex items-center justify-center text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={store.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-amber-600 flex items-center justify-center text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={store.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-amber-600 flex items-center justify-center text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links & Categories */}
          <div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-4 text-amber-200">
              Pantry Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => {
                      if (cat.id === "Gifts") {
                        onExploreGifts();
                      } else {
                        onSelectCategory(cat.name);
                        const el = document.getElementById("products");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Store Hours & Direct Ordering */}
          <div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-4 text-amber-200">
              Orders & Store Hours
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-white block">Opening Hours</span>
                  <span>{store.timings}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-white block">Call to Order</span>
                  <a
                    href={`tel:${store.phone}`}
                    className="hover:text-amber-300 transition-colors font-semibold"
                  >
                    {store.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-white block">WhatsApp Helpline</span>
                  <a
                    href={`https://wa.me/${store.whatsapp}?text=${encodeURIComponent(
                      `Hi ${store.name}, I want to place an order.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-300 transition-colors font-semibold"
                  >
                    +{store.whatsapp}
                  </a>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-white/60">
                Payment: UPI (GPay/PhonePe), NetBanking, Cash on Delivery upon WhatsApp verification.
              </div>
            </div>
          </div>

          {/* Location & Google Map Embed */}
          <div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-4 text-amber-200">
              Visit Our Store
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-xs">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span className="leading-snug">{store.address}</span>
              </div>

              <div className="rounded-xl overflow-hidden border border-white/10 h-36 w-full shadow-inner">
                <iframe
                  title="Store Location"
                  src={store.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Guarantee */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} {store.name}. All rights reserved.</p>
          <p className="flex items-center gap-1 text-white/70">
            <span>Crafted with pride for dry fruit lovers across India</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
