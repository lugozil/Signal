"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";

const MotionLink = motion.create(Link);

type Variant = "primary" | "secondary";
type Size = "md" | "sm";

const sizes: Record<Size, string> = {
  md: "px-7 py-4 text-base",
  sm: "px-4 py-2 text-sm",
};

export function CtaButton({
  href,
  children,
  variant = "primary",
  size = "md",
  pulse = false,
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  pulse?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight cursor-pointer";
  const styles =
    variant === "primary"
      ? "bg-signal-orange text-signal-dark shadow-glow"
      : "border border-white/20 text-signal-paper";

  return (
    <MotionLink
      href={href}
      onClick={onClick}
      className={`${base} ${sizes[size]} ${styles} ${pulse ? "cta-pulse" : ""} ${className}`}
      whileHover={{
        scale: 1.035,
        ...(variant === "primary"
          ? { backgroundColor: "#ff8a3d" }
          : { borderColor: "rgba(255,255,255,0.55)" }),
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionLink>
  );
}
