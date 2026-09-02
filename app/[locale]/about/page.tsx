import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaButton } from "@/components/cta-button";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { ArrowIcon } from "@/components/icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("kicker"), description: t("desc") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");

  const pillars = ["p1", "p2", "p3", "p4"] as const;

  return (
    <>
      <Section first bg>
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <p className="kicker">{t("kicker")}</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight lg:text-6xl">
              {t("title1")}
              <br />
              {t("title2")}
              <br />
              <span className="text-gradient">{t("title3")}</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-signal-mist lg:text-xl">
              {t("desc")}
            </p>
            <div className="mt-8">
              <CtaButton href="/contact" variant="secondary">
                {t("linkText")} <ArrowIcon />
              </CtaButton>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <p className="kicker">{t("storyKicker")}</p>
            <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight tracking-tight lg:text-4xl">
              {t("storyTitle")}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-signal-mist">
              {t("storyBody")}
            </p>
          </Reveal>
        </div>
      </Section>

      <Section divider>
        <div className="mx-auto max-w-7xl">
          <SectionHeading kicker={t("kicker")} title={t("title1")} className="mb-16" />
          <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {pillars.map((key, i) => (
              <RevealItem key={key} interactive className="bento-card p-7 lg:p-8">
                <div className="font-mono text-4xl font-medium text-signal-orange">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-4 text-lg font-bold tracking-tight">
                  {t(`pillars.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-signal-mist">
                  {t(`pillars.${key}.desc`)}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>
    </>
  );
}
