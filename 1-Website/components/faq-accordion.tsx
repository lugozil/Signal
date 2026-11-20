"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronIcon } from "./icons";
import { RevealItem } from "./reveal";

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/5 rounded-[1.25rem] border border-white/8 bg-white/[0.02]">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <RevealItem key={item.q} className="px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left"
            >
              <span className="text-base font-semibold tracking-tight lg:text-lg">
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="shrink-0 text-signal-orange"
              >
                <ChevronIcon />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-8 text-sm leading-relaxed text-signal-mist lg:text-base">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </RevealItem>
        );
      })}
    </div>
  );
}
