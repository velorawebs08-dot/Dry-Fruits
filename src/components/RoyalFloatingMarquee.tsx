import React from "react";
import { Sparkles, Crown } from "lucide-react";

export const RoyalFloatingMarquee: React.FC = () => {
  const items = [
    "ROYAL MEWA",
    "100% PURE & NITROGEN SEALED",
    "ROYAL MEWA",
    "HANDPICKED ARTISANAL HARVESTS",
    "ROYAL MEWA",
    "LUXURY FESTIVE GIFT HAMPERS",
    "ROYAL MEWA",
    "COLD VACUUM PACKED FRESHNESS",
    "ROYAL MEWA",
    "EXQUISITE WEDDING & CORPORATE GIFTS",
  ];

  return (
    <div className="w-full bg-[#1A0F08] border-y border-amber-900/40 py-2.5 overflow-hidden select-none shadow-inner relative">
      <div className="flex items-center animate-marquee whitespace-nowrap gap-8 text-xs font-bold tracking-wider">
        {items.concat(items).map((text, idx) => (
          <div key={idx} className="flex items-center gap-3 shrink-0">
            {text === "ROYAL MEWA" ? (
              <span className="flex items-center gap-1.5 text-royal-shimmer font-black text-sm tracking-widest animate-float-subtle">
                <Crown className="w-4 h-4 text-amber-400 fill-amber-400/80 inline-block" />
                <span>ROYAL MEWA</span>
              </span>
            ) : (
              <span className="text-amber-100/70 font-semibold tracking-wider text-[11px] uppercase">
                {text}
              </span>
            )}
            <Sparkles className="w-3 h-3 text-amber-500/70 fill-amber-500/50" />
          </div>
        ))}
      </div>
    </div>
  );
};
