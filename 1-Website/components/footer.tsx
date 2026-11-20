import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LogoMark } from "./logo-mark";
import { InstagramIcon } from "./icons";

// Add Facebook, WhatsApp, and TikTok here once those links are available.
const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/signalagency.pr/",
    icon: InstagramIcon,
  },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 px-6 py-16 text-sm lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <LogoMark size={26} />
            <span className="text-lg font-bold tracking-tight">SIGNAL</span>
          </div>
          <p className="mt-3 max-w-xs leading-relaxed text-signal-mist">
            {t("tagline")}
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-signal-mist transition-colors duration-200 hover:border-signal-orange hover:text-signal-orange"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h5 className="mb-4 font-mono text-xs uppercase tracking-wide text-signal-mist-dim">
            {t("companyHeading")}
          </h5>
          <ul className="space-y-3 text-signal-mist">
            <li>
              <Link href="/services" className="transition-colors duration-200 hover:text-signal-paper">
                {nav("services")}
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition-colors duration-200 hover:text-signal-paper">
                {nav("about")}
              </Link>
            </li>
            <li>
              <Link href="/work" className="transition-colors duration-200 hover:text-signal-paper">
                {nav("work")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="mb-4 font-mono text-xs uppercase tracking-wide text-signal-mist-dim">
            {t("contactHeading")}
          </h5>
          <ul className="space-y-3 text-signal-mist">
            <li>
              <a href="mailto:info@viralsignal.net" className="transition-colors duration-200 hover:text-signal-paper">
                info@viralsignal.net
              </a>
            </li>
            <li>
              <a href="tel:+17875582671" className="transition-colors duration-200 hover:text-signal-paper">
                (787) 558-2671
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 font-mono text-xs uppercase tracking-wide text-signal-mist-dim sm:flex-row">
        <span>
          © {year} SIGNAL — {t("rights")}
        </span>
        <div className="flex gap-5">
          <Link href="/privacy" className="transition-colors duration-200 hover:text-signal-paper">
            {t("privacy")}
          </Link>
          <Link href="/terms" className="transition-colors duration-200 hover:text-signal-paper">
            {t("terms")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
