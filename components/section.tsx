import type { ReactNode } from "react";

/**
 * Shared vertical rhythm for every page section. `first` gives the opening
 * section of a page extra breathing room below the fixed header; `divider`
 * adds the hairline that separates stacked sections; `bg` toggles the grid
 * background used behind hero-type openers.
 */
export function Section({
  children,
  first = false,
  divider = false,
  bg = false,
  className = "",
  as: As = "section",
}: {
  children: ReactNode;
  first?: boolean;
  divider?: boolean;
  bg?: boolean;
  className?: string;
  as?: "section" | "div";
}) {
  return (
    <As
      className={[
        "px-6 lg:px-10",
        first ? "pt-20 pb-20 lg:pt-28 lg:pb-24" : "py-20 lg:py-28",
        divider && "border-t border-white/5",
        bg && "grid-bg",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </As>
  );
}
