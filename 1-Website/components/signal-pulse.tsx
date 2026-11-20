"use client";

import { motion } from "motion/react";

const rings = [0, 0.6, 1.2];

export function SignalPulse() {
  return (
    <div
      aria-hidden="true"
      className="relative grid aspect-square w-full max-w-[280px] place-items-center"
    >
      {rings.map((delay) => (
        <motion.span
          key={delay}
          className="absolute rounded-full border border-signal-orange/50"
          initial={{ width: 40, height: 40, opacity: 0.7 }}
          animate={{ width: 280, height: 280, opacity: 0 }}
          transition={{
            duration: 2.8,
            delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
      <motion.div
        className="relative grid h-16 w-16 place-items-center rounded-full bg-signal-orange text-signal-dark shadow-glow"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
          <circle cx="6" cy="26" r="3" fill="currentColor" />
          <path
            d="M6 18 a10 10 0 0 1 10 10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M6 10 a18 18 0 0 1 18 18"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </motion.div>
    </div>
  );
}
