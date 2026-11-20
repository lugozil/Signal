"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LangSwitch } from "./lang-switch";
import { CtaButton } from "./cta-button";

const menu: Variants = {
  hidden: { opacity: 0, y: -8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut", staggerChildren: 0.05 },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

const menuItem: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0 },
};

export function MobileNav({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");

  return (
    <div className="lg:hidden">
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        whileTap={{ scale: 0.9 }}
        className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/10 text-signal-paper"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M3 6h18M3 12h18M3 18h18" />
          )}
        </svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial="hidden"
            animate="show"
            exit="exit"
            variants={menu}
            className="absolute inset-x-0 top-16 border-b border-white/5 bg-signal-dark/98 px-6 py-6 backdrop-blur-md"
          >
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <motion.li key={link.href} variants={menuItem}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 font-mono text-sm uppercase tracking-wide text-signal-mist transition-colors hover:bg-white/5 hover:text-signal-paper"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
              <LangSwitch />
              <CtaButton href="/contact" size="sm" onClick={() => setOpen(false)}>
                {t("cta")}
              </CtaButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
