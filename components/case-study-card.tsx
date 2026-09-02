import type { ReactNode } from "react";
import { RevealItem } from "./reveal";

export function CaseStudyCard({
  logo,
  kicker,
  title,
  desc,
}: {
  logo: ReactNode;
  kicker: string;
  title: string;
  desc: string;
}) {
  return (
    <RevealItem
      interactive
      className="bento-card flex min-h-[280px] flex-col justify-between p-6"
    >
      <div className="mb-2 grid h-20 place-items-center">{logo}</div>
      <div>
        <span className="font-mono text-[11px] uppercase tracking-wide text-signal-mist-dim">
          {kicker}
        </span>
        <h3 className="mt-4 text-2xl font-bold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-signal-mist">{desc}</p>
      </div>
    </RevealItem>
  );
}
