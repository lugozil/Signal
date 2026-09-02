import type { ReactNode } from "react";
import { RevealItem } from "./reveal";

export function LegalSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <RevealItem className="bento-card p-8">
      <p className="mb-2 font-mono text-xs font-medium uppercase tracking-wide text-signal-orange">
        {number}
      </p>
      <h2 className="mb-5 text-xl font-bold tracking-tight">{title}</h2>
      <div className="space-y-4 text-sm leading-relaxed text-signal-mist [&_a]:text-signal-orange [&_a:hover]:underline [&_strong]:text-signal-paper [&_p+p]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
        {children}
      </div>
    </RevealItem>
  );
}

export function NoticeBox({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-signal-orange/40 bg-signal-orange/[0.08] p-4 text-sm leading-relaxed">
      {children}
    </div>
  );
}
