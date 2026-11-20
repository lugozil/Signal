import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LogoMark } from "./logo-mark";
import { LangSwitch } from "./lang-switch";
import { MobileNav } from "./mobile-nav";
import { NavLink } from "./nav-link";
import { CtaButton } from "./cta-button";

export function Header() {
  const t = useTranslations("nav");

  const links = [
    { href: "/services", label: t("services") },
    { href: "/about", label: t("about") },
    { href: "/work", label: t("work") },
    { href: "/pricing", label: t("pricing") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-signal-dark/75 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="group flex items-center gap-2">
          <span className="transition-transform duration-200 group-hover:scale-110">
            <LogoMark />
          </span>
          <span className="text-xl font-bold tracking-tight">SIGNAL</span>
        </Link>

        <ul className="hidden items-center gap-6 font-mono text-xs uppercase tracking-wide lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href}>{link.label}</NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LangSwitch />
          </div>
          <div className="hidden sm:block">
            <CtaButton href="/contact" size="sm">
              {t("cta")}
            </CtaButton>
          </div>
          <MobileNav links={links} />
        </div>
      </nav>
    </header>
  );
}
