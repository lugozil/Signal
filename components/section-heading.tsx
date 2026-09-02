import type { ReactNode } from "react";
import { Reveal } from "./reveal";

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "left",
  className = "",
}: {
  kicker: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      <p className={`kicker ${align === "center" ? "justify-center" : ""}`}>
        {kicker}
      </p>
      <h2 className="mt-4 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-lg leading-relaxed text-signal-mist">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
