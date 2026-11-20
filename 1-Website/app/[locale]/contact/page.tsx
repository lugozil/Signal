import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaButton } from "@/components/cta-button";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Section } from "@/components/section";
import { ChatIcon, MailIcon, PhoneIcon } from "@/components/icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("kicker"), description: t("desc") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");

  return (
    <Section first bg className="lg:pt-32">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="kicker justify-center">{t("kicker")}</p>
          <h1 className="mt-4 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight lg:text-6xl">
            {t("title1")} <span className="text-gradient">{t("titleAccent")}</span>
            {t("title3")}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-signal-mist">
            {t("desc")}
          </p>
          <div className="mt-10 flex justify-center">
            <CtaButton href="mailto:info@viralsignal.net" pulse>
              {t("ctaButton")}
            </CtaButton>
          </div>
        </Reveal>

        <RevealGroup className="mx-auto mt-20 grid max-w-2xl gap-5 sm:grid-cols-3">
          <RevealItem
            as="a"
            href="mailto:info@viralsignal.net"
            interactive
            className="bento-card flex cursor-pointer flex-col items-center gap-3 p-6 text-center"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-signal-orange/15 text-signal-orange">
              <MailIcon className="h-5 w-5" />
            </span>
            <span className="font-mono text-xs uppercase tracking-wide text-signal-mist-dim">
              {t("emailLabel")}
            </span>
            <span className="text-sm font-semibold">info@viralsignal.net</span>
          </RevealItem>

          <RevealItem
            as="a"
            href="tel:+17875582671"
            interactive
            className="bento-card flex cursor-pointer flex-col items-center gap-3 p-6 text-center"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-signal-orange/15 text-signal-orange">
              <PhoneIcon className="h-5 w-5" />
            </span>
            <span className="font-mono text-xs uppercase tracking-wide text-signal-mist-dim">
              {t("phoneLabel")}
            </span>
            <span className="text-sm font-semibold">(787) 558-2671</span>
          </RevealItem>

          <RevealItem interactive className="bento-card flex flex-col items-center gap-3 p-6 text-center">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-signal-orange/15 text-signal-orange">
              <ChatIcon className="h-5 w-5" />
            </span>
            <span className="font-mono text-xs uppercase tracking-wide text-signal-mist-dim">
              {t("chatTitle")}
            </span>
            <span className="text-sm leading-relaxed text-signal-mist">
              {t("chatDesc")}
            </span>
          </RevealItem>
        </RevealGroup>
      </div>
    </Section>
  );
}
