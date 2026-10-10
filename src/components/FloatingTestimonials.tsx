import React, { useState, useEffect } from "react";
import { Star, CheckCircle, ChevronLeft, ChevronRight, X, MessageSquare, Quote, Sparkles } from "lucide-react";
import { reviews, store } from "../data/siteData";

export const FloatingTestimonials: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);
  const [tickerIdx, setTickerIdx] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  // Auto rotate the preview pill every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIdx((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveReviewIdx((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveReviewIdx((prev) => (prev + 1) % reviews.length);
  };

  const currentTickerReview = reviews[tickerIdx];
  const activeReview = reviews[activeReviewIdx];

  return (
    <>
      {/* Persistent Floating Reviews Capsule / Bubble */}
      {!isOpen && !isMinimized && (
        <aside
          aria-label="Customer Reviews Widget"
          className="fixed bottom-20 md:bottom-6 left-3 sm:left-6 z-40 max-w-[340px] sm:max-w-sm animate-float-subtle select-none"
        >
          <div
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 p-2.5 sm:p-3 bg-white/95 hover:bg-white text-[#29180E] rounded-2xl shadow-xl hover:shadow-2xl border-2 border-amber-300/80 hover:border-amber-500 backdrop-blur-md transition-all duration-300 cursor-pointer -translate-y-0 hover:-translate-y-1"
          >
            {/* Pulsing Star Badge */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 text-white flex items-center justify-center shrink-0 shadow-md">
              <Star className="w-5 h-5 fill-white" />
            </div>

            {/* Snippet text */}
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className="text-[11px] font-extrabold text-[#29180E]">4.9 / 5</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold border border-emerald-200">
                  Verified
                </span>
              </div>
              <p className="text-xs text-[#5C4A3E] font-medium truncate">
                "{currentTickerReview.comment}"
              </p>
              <div className="text-[10px] text-[#8C7A6B] font-semibold mt-0.5">
                — {currentTickerReview.name}, {currentTickerReview.location}
              </div>
            </div>

            {/* Quick close to minimize button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(true);
              }}
              className="text-[#B5A596] hover:text-[#29180E] p-1 rounded-md transition-colors"
              title="Minimize reviews bubble"
              aria-label="Minimize"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* Minimized Icon Trigger when dismissed */}
      {!isOpen && isMinimized && (
        <button
          type="button"
          onClick={() => {
            setIsMinimized(false);
            setIsOpen(true);
          }}
          className="fixed bottom-20 md:bottom-6 left-3 sm:left-6 z-40 flex items-center gap-2 p-2.5 px-3.5 bg-white text-[#29180E] rounded-full shadow-lg border border-amber-300 hover:border-amber-500 hover:scale-105 transition-all text-xs font-bold cursor-pointer animate-float-subtle"
          title="Open Customer Reviews"
        >
          <div className="flex items-center text-amber-500">
            <Star className="w-4 h-4 fill-amber-500" />
          </div>
          <span>4.9 ★ Reviews</span>
        </button>
      )}

      {/* Floating Interactive Testimonial Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white rounded-3xl border-2 border-amber-300 shadow-2xl p-6 sm:p-8 overflow-hidden animate-scale-up"
          >
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700" />

            {/* Header */}
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-amber-900 font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                    <span>Customer Experiences</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#29180E]">
                    Real Stories, Pure Purity
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 text-[#8C7A6B] hover:text-[#29180E] hover:bg-[#FAF7F2] rounded-xl transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Overall Rating Score Bar */}
            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EADBCE] flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="font-display text-2xl font-extrabold text-[#29180E]">4.9</span>
                <div>
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#8C7A6B] font-semibold">1,200+ Verified Buyers</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  100% Purity Verified
                </span>
              </div>
            </div>

            {/* Active Review Floating Showcase Card */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-[#FAF7F2] to-amber-50/50 border border-amber-200/80 shadow-inner min-h-[170px] flex flex-col justify-between">
              <Quote className="w-10 h-10 text-amber-200 absolute top-4 right-4 pointer-events-none" />

              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(activeReview.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-[#29180E] font-medium leading-relaxed italic relative z-10">
                  "{activeReview.comment}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center justify-between gap-3 pt-4 mt-4 border-t border-amber-200/60 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-700 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                    {activeReview.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#29180E]">
                      {activeReview.name}
                    </h4>
                    <p className="text-[11px] text-[#8C7A6B]">
                      {activeReview.location} · {activeReview.date}
                    </p>
                  </div>
                </div>

                {activeReview.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Buyer</span>
                  </span>
                )}
              </div>
            </div>

            {/* Stepper Controls & Dots */}
            <div className="flex items-center justify-between gap-4 mt-6">
              <div className="flex items-center gap-1.5">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveReviewIdx(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeReviewIdx === idx ? "w-6 bg-amber-600" : "w-2 bg-[#DDD3C5] hover:bg-[#854D0E]"
                    }`}
                    aria-label={`Go to review ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2 rounded-xl bg-[#FAF7F2] border border-[#DDD3C5] hover:bg-white text-[#29180E] transition-colors cursor-pointer"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-semibold text-[#8C7A6B] tabular-nums">
                  {activeReviewIdx + 1} of {reviews.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2 rounded-xl bg-[#FAF7F2] border border-[#DDD3C5] hover:bg-white text-[#29180E] transition-colors cursor-pointer"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Footer Trust Link */}
            <div className="mt-6 pt-4 border-t border-[#E8DFC8] flex items-center justify-between text-xs text-[#8C7A6B]">
              <span>Trusted by 10,000+ happy households across India</span>
              <a
                href={`https://wa.me/${store.whatsapp}?text=${encodeURIComponent(
                  `Hi ${store.name}, I'm looking at your customer reviews and want to place an order.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#854D0E] hover:text-[#713f0b]"
              >
                Chat on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
