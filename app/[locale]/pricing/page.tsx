import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaButton } from "@/components/cta-button";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { FaqAccordion } from "@/components/faq-accordion";
import {
  AlertIcon,
  ChartIcon,
  SlidersIcon,
  TagIcon,
  TargetIcon,
} from "@/components/icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  return { title: t("kicker"), description: t("subtitle") };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pricing");
  const testimonials = await getTranslations("testimonials");

  const pains = ["pain1", "pain2", "pain3"] as const;
  const benefits = [
    { key: "benefit1", icon: <TargetIcon /> },
    { key: "benefit2", icon: <TagIcon /> },
    { key: "benefit3", icon: <ChartIcon /> },
    { key: "benefit4", icon: <SlidersIcon /> },
  ] as const;
  const faqKeys = ["faq1", "faq2", "faq3", "faq4", "faq5"] as const;
  const faqItems = faqKeys.map((key) => ({
    q: t(`${key}Q`),
    a: t(`${key}A`),
  }));

  return (
    <>
      {/* ================= HERO ================= */}
      <Section first bg className="lg:pt-32">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="kicker justify-center">{t("kicker")}</p>
          <h1 className="mt-4 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {t("title1")} {t("title2")}{" "}
            <span className="text-gradient">{t("title3")}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-signal-mist lg:text-xl">
            {t("subtitle")}
          </p>
          <div className="mt-9 flex flex-col items-center gap-3">
            <CtaButton href="/contact" pulse>
              {t("ctaPrimary")}
            </CtaButton>
            <span className="font-mono text-xs uppercase tracking-wide text-signal-mist-dim">
              {t("ctaNote")}
            </span>
          </div>
        </Reveal>
      </Section>

      {/* ================= PAIN POINTS ================= */}
      <Section divider>
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            kicker={t("painsKicker")}
            title={t("painsTitle")}
            align="center"
            className="mb-16"
          />
          <RevealGroup className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {pains.map((key) => (
              <RevealItem key={key} className="bento-card p-7">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-red-500/10 text-red-400">
                  <AlertIcon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold tracking-tight">
                  {t(`${key}Title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-signal-mist">
                  {t(`${key}Desc`)}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ================= VALUE PROP ================= */}
      <Section divider bg>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="kicker justify-center">{t("valueKicker")}</p>
          <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight tracking-tight lg:text-5xl">
            {t("valueTitle")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-signal-mist">
            {t("valueDesc")}
          </p>
          <div className="mt-9 flex justify-center">
            <CtaButton href="/contact">{t("midCtaButton")}</CtaButton>
          </div>
        </Reveal>
      </Section>

      {/* ================= BENEFITS ================= */}
      <Section>
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            kicker={t("benefitsKicker")}
            title={t("benefitsTitle")}
            className="mb-16"
          />
          <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ key, icon }) => (
              <ServiceCard
                key={key}
                icon={icon}
                title={t(`${key}Title`)}
                desc={t(`${key}Desc`)}
              />
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ================= TESTIMONIALS ================= */}
      <Section divider>
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            kicker={t("testimonialsKicker")}
            title={t("testimonialsTitle")}
            align="center"
            className="mb-16"
          />
          {/*
            Placeholder testimonials — initials-avatar + first name/last
            initial only, no fabricated full identities or stock photos.
            Swap for verified client quotes, names, and real photos once
            available.
          */}
          <RevealGroup className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {(["t1", "t2", "t3"] as const).map((key) => (
              <TestimonialCard
                key={key}
                quote={testimonials(`${key}.quote`)}
                role={testimonials(`${key}.role`)}
                name={testimonials(`${key}.name`)}
                initials={testimonials(`${key}.initials`)}
              />
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ================= FAQ ================= */}
      <Section divider>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            kicker={t("faqKicker")}
            title={t("faqTitle")}
            align="center"
            className="mb-14"
          />
          <FaqAccordion items={faqItems} />
        </div>
      </Section>

      {/* ================= FINAL CTA ================= */}
      <Section divider>
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight lg:text-5xl">
            {t("finalCtaTitle1")}{" "}
            <span className="text-gradient">{t("finalCtaAccent")}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-signal-mist">
            {t("finalCtaDesc")}
          </p>
          <div className="mt-9 flex justify-center">
            <CtaButton href="/contact" pulse>
              {t("finalCtaButton")}
            </CtaButton>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
