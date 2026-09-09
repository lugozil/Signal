import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaButton } from "@/components/cta-button";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { ArrowIcon, AdsIcon, CrmIcon, FilmIcon, SocialIcon, SupportIcon, WebIcon } from "@/components/icons";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const s = await getTranslations("services.items");
  const testimonials = await getTranslations("testimonials");

  const services = [
    { key: "social", icon: <SocialIcon /> },
    { key: "ads", icon: <AdsIcon /> },
    { key: "filming", icon: <FilmIcon /> },
    { key: "crm", icon: <CrmIcon /> },
    { key: "web", icon: <WebIcon /> },
    { key: "support", icon: <SupportIcon /> },
  ] as const;

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="grid-bg relative flex min-h-[92vh] items-center overflow-hidden">
        {/* dark gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-signal-dark/10 via-signal-dark/55 to-signal-dark" />
        {/* soft centered glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal-orange/[0.08] blur-[120px]"
        />
        {/* geometric accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 top-24 hidden h-64 w-64 rotate-12 rounded-[2rem] border border-white/[0.06] md:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 bottom-16 hidden h-44 w-44 -rotate-12 rounded-[1.5rem] border border-signal-orange/15 md:block"
        />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-24 text-center lg:px-10">
          <RevealGroup stagger={0.15}>
            <RevealItem>
              <p className="kicker justify-center">{t("badge")}</p>
            </RevealItem>

            <RevealItem>
              <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                {t("titleLine1")} {t("titleLine2")}{" "}
                <span className="text-gradient">{t("titleAccent")}</span>
              </h1>
            </RevealItem>

            <RevealItem>
              <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-signal-mist lg:text-xl">
                {t("subtitle")}
              </p>
            </RevealItem>

            <RevealItem className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <CtaButton href="/contact" pulse>
                {t("ctaPrimary")}
              </CtaButton>
              <CtaButton href="/services" variant="secondary">
                {t("ctaSecondary")}
              </CtaButton>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* ================= SERVICES PREVIEW ================= */}
      <Section>
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            kicker={t("servicesKicker")}
            title={
              <>
                {t("servicesTitle1")}
                <br />
                <span className="text-gradient">{t("servicesTitle2")}</span>
              </>
            }
            subtitle={t("servicesSubtitle")}
            className="mb-16"
          />

          <RevealGroup className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ key, icon }) => (
              <ServiceCard
                key={key}
                icon={icon}
                title={s(`${key}.title`)}
                desc={s(`${key}.desc`)}
              />
            ))}
          </RevealGroup>

          <Reveal className="mt-10">
            <CtaButton href="/services" variant="secondary">
              {t("servicesCtaLink")} <ArrowIcon />
            </CtaButton>
          </Reveal>
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
            Placeholder testimonials — generic role/industry attribution, no
            invented personal names or photos. Swap for verified client quotes
            once available.
          */}
          <RevealGroup className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {(["t1", "t2", "t3"] as const).map((key) => (
              <TestimonialCard
                key={key}
                quote={testimonials(`${key}.quote`)}
                role={testimonials(`${key}.role`)}
              />
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ================= FINAL CTA ================= */}
      <Section>
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight lg:text-5xl">
            {t("finalCtaTitle1")}{" "}
            <span className="text-gradient">{t("finalCtaAccent")}</span>
            {t("finalCtaTitle3")}
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
