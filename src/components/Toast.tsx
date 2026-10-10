import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export const Toast: React.FC = () => {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-[#1E120A] text-white text-xs sm:text-sm font-semibold rounded-2xl shadow-xl border border-amber-500/40 flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      <span>{toast}</span>
    </div>
  );
};
