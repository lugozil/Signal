import type { ReactNode } from "react";
import { RevealItem } from "./reveal";

export function ServiceCard({
  icon,
  index,
  title,
  desc,
  detail,
  tags,
  className = "",
}: {
  icon: ReactNode;
  index?: string;
  title: string;
  desc: string;
  detail?: string;
  tags?: string[];
  className?: string;
}) {
  return (
    <RevealItem
      interactive
      className={`group bento-card flex flex-col p-7 lg:p-8 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-signal-orange/15 text-signal-orange transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          {icon}
        </div>
        {index && (
          <span className="font-mono text-xs text-signal-mist-dim">
            {index}
          </span>
        )}
      </div>
      <h3 className="mt-4 text-xl font-bold tracking-tight lg:text-2xl">
        {title}
      </h3>
      <p className="mt-2 text-sm text-signal-mist lg:text-base">{desc}</p>
      {detail && (
        <p className="mt-3 text-sm leading-relaxed text-signal-mist-dim">
          {detail}
        </p>
      )}
      {tags && (
        <div className="mt-5 flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-wide">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-2.5 py-1 text-signal-paper"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </RevealItem>
  );
}
