"use client";

import { useLocale } from "next-intl";
import { motion } from "motion/react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LangSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      role="group"
      aria-label="Language"
      className="relative inline-flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.03] p-0.5 font-mono"
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => router.replace(pathname, { locale: l })}
          aria-current={locale === l}
          className={`relative cursor-pointer rounded-full px-2.5 py-1.5 text-[11px] font-medium tracking-wide transition-colors duration-200 ${
            locale === l
              ? "text-signal-dark"
              : "text-signal-mist hover:text-signal-paper"
          }`}
        >
          {locale === l && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 rounded-full bg-signal-orange"
              style={{ zIndex: -1 }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
