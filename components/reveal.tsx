"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

function containerVariants(stagger: number): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger },
    },
  };
}

const hoverLift = {
  whileHover: { y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const } },
  whileTap: { y: -2, scale: 0.99, transition: { duration: 0.1 } },
};

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={item}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.1,
}: {
  children: ReactNode;
  className?: string;
  /** Seconds between each child's entrance. */
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={containerVariants(stagger)}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  interactive = false,
  as = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  as?: "div" | "a";
  href?: string;
  target?: string;
  rel?: string;
}) {
  const MotionTag = as === "a" ? motion.a : motion.div;
  return (
    <MotionTag
      className={className}
      variants={item}
      {...(interactive ? hoverLift : {})}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
