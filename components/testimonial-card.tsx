import { QuoteIcon } from "./icons";
import { RevealItem } from "./reveal";

export function TestimonialCard({
  quote,
  role,
  name,
  initials,
}: {
  quote: string;
  role: string;
  /** When provided, renders an avatar + name row instead of just the role. */
  name?: string;
  initials?: string;
}) {
  return (
    <RevealItem
      interactive
      className="bento-card flex h-full flex-col justify-between p-7 lg:p-8"
    >
      <QuoteIcon className="h-7 w-7 text-signal-orange/70" />
      <p className="mt-5 flex-1 text-lg leading-relaxed tracking-tight text-signal-paper">
        “{quote}”
      </p>
      {name ? (
        <div className="mt-6 flex items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-signal-orange/15 font-mono text-xs font-medium text-signal-orange">
            {initials}
          </div>
          <div>
            <p className="text-sm font-semibold">{name}</p>
            <p className="font-mono text-[11px] uppercase tracking-wide text-signal-mist-dim">
              {role}
            </p>
          </div>
        </div>
      ) : (
        <p className="mt-6 font-mono text-xs uppercase tracking-wide text-signal-mist-dim">
          {role}
        </p>
      )}
    </RevealItem>
  );
}
