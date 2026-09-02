import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaButton } from "@/components/cta-button";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { ArrowIcon, AdsIcon, CrmIcon, SocialIcon, SupportIcon, WebIcon } from "@/components/icons";

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
    { key: "crm", icon: <CrmIcon /> },
    { key: "web", icon: <WebIcon /> },
    { key: "support", icon: <SupportIcon /> },
  ] as const;

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="grid-bg relative flex min-h-[92vh] items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-signal-dark/10 via-signal-dark/60 to-signal-dark" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full bg-signal-orange/10 blur-3xl"
        />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-12 lg:px-10">
          <RevealGroup className="lg:col-span-7">
            <RevealItem>
              <span className="inline-flex items-center gap-2 rounded-full border border-signal-orange/40 px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-signal-orange">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal-orange" />
                {t("badge")}
              </span>
            </RevealItem>

            <RevealItem>
              <h1 className="mt-6 text-balance text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-[5.25rem]">
                {t("titleLine1")}{" "}
                <span className="text-gradient">{t("titleAccent")}</span>{" "}
                {t("titleLine3")}
              </h1>
            </RevealItem>

            <RevealItem>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-signal-mist lg:text-xl">
                {t("subtitle")}
              </p>
            </RevealItem>

            <RevealItem className="mt-10 flex flex-col gap-4 sm:flex-row">
              <CtaButton href="/contact" pulse>
                {t("ctaPrimary")}
              </CtaButton>
              <CtaButton href="/services" variant="secondary">
                {t("ctaSecondary")}
              </CtaButton>
            </RevealItem>

            <RevealItem className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {[
                [t("kpi1Value"), t("kpi1Label")],
                [t("kpi2Value"), t("kpi2Label")],
                [t("kpi3Value"), t("kpi3Label")],
              ].map(([value, label]) => (
                <div key={label}>
                  <div className="font-mono text-2xl font-medium tracking-tight text-signal-orange lg:text-3xl">
                    {value}
                  </div>
                  <div className="mt-1.5 text-xs leading-snug text-signal-mist-dim">
                    {label}
                  </div>
                </div>
              ))}
            </RevealItem>
          </RevealGroup>

          <Reveal delay={0.15} className="hidden lg:col-span-5 lg:block">
            <div className="bento-card p-6">
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wide text-signal-mist-dim">
                  Signal · Live
                </span>
                <span className="flex items-center gap-2 text-xs text-signal-orange">
                  <span className="h-2 w-2 animate-ping rounded-full bg-signal-orange" />
                </span>
              </div>
              <div className="flex h-36 items-end gap-1">
                {[30, 55, 72, 40, 95, 65, 38, 80, 48, 70, 35, 90].map(
                  (h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-signal-orange"
                      style={{ height: `${h}%`, opacity: 0.4 + (h / 100) * 0.6 }}
                    />
                  ),
                )}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4 font-mono text-xs">
                <div className="rounded-lg border border-white/10 p-3">
                  <div className="text-signal-mist-dim">Reach</div>
                  <div className="text-lg font-medium">1.2M</div>
                </div>
                <div className="rounded-lg border border-white/10 p-3">
                  <div className="text-signal-mist-dim">Leads</div>
                  <div className="text-lg font-medium">+348</div>
                </div>
              </div>
            </div>
          </Reveal>
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
