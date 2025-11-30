// app/components/Accordion.tsx
"use client";

import { useState, type ReactNode } from "react";

type AccordionProps = {
  title: string;
  children: ReactNode;
};

export default function Accordion({ title, children }: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-300 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm">
      {/* 見出しボタン */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 flex justify-between items-center text-left font-semibold text-slate-800"
      >
        <span>{title}</span>
        <span className="text-slate-500 text-xs">{open ? "▲" : "▼"}</span>
      </button>

      {/* にょきっと出てくる中身 */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-[500px] opacity-100 py-2" : "max-h-0 opacity-40 py-0"
        }`}
      >
        <div className="px-4 pb-3 text-slate-700 text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
