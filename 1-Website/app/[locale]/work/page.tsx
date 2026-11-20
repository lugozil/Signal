import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaButton } from "@/components/cta-button";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { CaseStudyMedia } from "@/components/case-study-media";
import { caseStudyVideoPath } from "@/lib/video";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "work" });
  return { title: t("kicker"), description: t("subtitle") };
}

const CASES = [
  { key: "xoco", slug: "xoco", reverse: false },
  { key: "haciendaEllago", slug: "hacienda-el-lago", reverse: true },
  { key: "lumotica", slug: "lumotica", reverse: false },
] as const;

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("work");

  return (
    <>
      <Section first bg>
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            kicker={t("kicker")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </div>
      </Section>

      {CASES.map(({ key, slug, reverse }) => (
        <Section key={key} divider>
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal className={reverse ? "lg:order-2" : undefined}>
              <CaseStudyMedia
                videoSrc={caseStudyVideoPath(slug)}
                label={t(`cases.${key}.company`)}
              />
            </Reveal>
            <Reveal delay={0.1} className={reverse ? "lg:order-1" : undefined}>
              <p className="kicker">{t(`cases.${key}.kicker`)}</p>
              <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight tracking-tight lg:text-4xl">
                {t(`cases.${key}.title`)}
              </h2>
              <p className="mt-3 font-mono text-sm uppercase tracking-wide text-signal-orange">
                {t(`cases.${key}.company`)}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-signal-mist">
                {t(`cases.${key}.desc`)}
              </p>
            </Reveal>
          </div>
        </Section>
      ))}

      <Section divider>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="kicker justify-center">{t("ctaKicker")}</p>
          <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight lg:text-4xl">
            {t("ctaTitle")}
          </h2>
          <div className="mt-9 flex justify-center">
            <CtaButton href="/contact" pulse>
              {t("ctaButton")}
            </CtaButton>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
