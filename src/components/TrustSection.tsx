import React, { useState } from "react";
import { ShieldCheck, Sparkles, Award, Truck, Gift, Star, CheckCircle, Quote, Pause, Play, Heart } from "lucide-react";
import { trustPillars, reviews, store } from "../data/siteData";

export const TrustSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-[#854D0E]" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-[#854D0E]" />;
      case "Award":
        return <Award className="w-6 h-6 text-[#854D0E]" />;
      case "Truck":
        return <Truck className="w-6 h-6 text-[#854D0E]" />;
      case "Gift":
        return <Gift className="w-6 h-6 text-[#854D0E]" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-[#854D0E]" />;
    }
  };

  // Duplicate list to achieve continuous seamless loop
  const row1 = reviews.slice(0, 3);
  const row2 = reviews.slice(3, 6);

  return (
    <section id="why-us" className="py-12 sm:py-16 bg-white border-t border-[#E8DFC8] scroll-mt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Why Choose Us: 5 Pillars */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#854D0E]">
              Our Promise of Purity
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#29180E] mt-1">
              Why Discerning Families Choose{" "}
              <span className="text-royal-shimmer inline-block animate-float-subtle font-black">
                ROYAL MEWA
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#8C7A6B] mt-2">
              From Kashmir to Konkan, we source exclusively from heritage orchards where quality has been celebrated for generations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {trustPillars.map((pillar) => (
              <div
                key={pillar.id}
                className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EADBCE] hover:border-[#854D0E]/60 hover:shadow-sm transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#E0D5C7] flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform shadow-2xs">
                  {getIcon(pillar.icon)}
                </div>
                <h3 className="font-bold text-sm text-[#29180E] mb-1.5">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#6B5A4E] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* All Testimonials in Motion Floating Section */}
        <div className="rounded-3xl bg-gradient-to-br from-[#FAF7F2] via-[#F6EFE5] to-[#F1E6D4] border border-[#EADBCE] p-6 sm:p-10 shadow-sm relative overflow-hidden">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className="text-xs font-black text-[#29180E] bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-300/80">
                  4.9 / 5 Rating (1,200+ Reviews)
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#29180E]">
                What Families Say About{" "}
                <span className="text-royal-shimmer inline-block animate-float-subtle font-black">
                  ROYAL MEWA
                </span>
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-[#8C7A6B] hidden sm:inline">
                Hover to pause motion
              </span>
              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#DDD3C5] hover:bg-[#FAF7F2] text-xs font-bold text-[#29180E] shadow-2xs transition-colors cursor-pointer"
              >
                {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" /> : <Pause className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />}
                <span>{isPaused ? "Resume Motion" : "Pause Motion"}</span>
              </button>
            </div>
          </div>

          {/* Track 1: Gliding Left in Motion Floating */}
          <div className="relative mb-5 overflow-hidden">
            <div
              className="flex gap-5 py-2 animate-marquee"
              style={{ animationPlayState: isPaused ? "paused" : "running" }}
            >
              {row1.concat(row1).concat(row1).map((rev, idx) => (
                <div
                  key={`track1-${rev.id}-${idx}`}
                  className="w-[300px] sm:w-[380px] shrink-0 p-5 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-xs border-2 border-amber-200/80 hover:border-amber-400 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between animate-float-subtle select-none"
                  style={{ animationDelay: `${(idx % 3) * 0.8}s` }}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <Quote className="w-5 h-5 text-amber-200" />
                    </div>
                    <p className="text-xs sm:text-sm text-[#29180E] font-medium leading-relaxed italic line-clamp-3">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-3 mt-4 border-t border-[#F2ECE1]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-white font-bold flex items-center justify-center text-xs shadow-2xs">
                        {rev.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-[#29180E] leading-tight">
                          {rev.name}
                        </h4>
                        <span className="text-[10px] text-[#8C7A6B]">
                          {rev.location}
                        </span>
                      </div>
                    </div>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Track 2: Gliding Right in Reverse Motion Floating */}
          <div className="relative overflow-hidden">
            <div
              className="flex gap-5 py-2 animate-marquee-reverse"
              style={{ animationPlayState: isPaused ? "paused" : "running" }}
            >
              {row2.concat(row2).concat(row2).map((rev, idx) => (
                <div
                  key={`track2-${rev.id}-${idx}`}
                  className="w-[300px] sm:w-[380px] shrink-0 p-5 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-xs border-2 border-amber-200/80 hover:border-amber-400 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between animate-float select-none"
                  style={{ animationDelay: `${(idx % 3) * 0.9}s` }}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <Quote className="w-5 h-5 text-amber-200" />
                    </div>
                    <p className="text-xs sm:text-sm text-[#29180E] font-medium leading-relaxed italic line-clamp-3">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-3 mt-4 border-t border-[#F2ECE1]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-700 to-amber-500 text-white font-bold flex items-center justify-center text-xs shadow-2xs">
                        {rev.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-[#29180E] leading-tight">
                          {rev.name}
                        </h4>
                        <span className="text-[10px] text-[#8C7A6B]">
                          {rev.location}
                        </span>
                      </div>
                    </div>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
