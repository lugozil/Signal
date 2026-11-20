"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";

const MotionLink = motion.create(Link);

const underline = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1 },
};

export function NavLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <MotionLink
      href={href}
      initial="rest"
      whileHover="hover"
      className={`relative inline-block py-1 text-signal-mist transition-colors duration-200 hover:text-signal-paper ${className}`}
    >
      {children}
      <motion.span
        variants={underline}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-signal-orange"
      />
    </MotionLink>
  );
}
