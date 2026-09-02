import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaButton } from "@/components/cta-button";
import { Reveal, RevealGroup } from "@/components/reveal";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { CaseStudyCard } from "@/components/case-study-card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "work" });
  return { title: t("kicker"), description: t("subtitle") };
}

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
      <Section first bg className="pb-16 lg:pb-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            kicker={t("kicker")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </div>
      </Section>

      <Section className="pt-0 lg:pt-0">
        <RevealGroup className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <CaseStudyCard
            logo={
              <Image
                src="/logos/xoco.png"
                alt="Xoco"
                width={200}
                height={64}
                style={{ maxHeight: 64, width: "auto", objectFit: "contain" }}
              />
            }
            kicker={t("cases.xoco.kicker")}
            title={t("cases.xoco.title")}
            desc={t("cases.xoco.desc")}
          />

          <CaseStudyCard
            logo={
              <svg viewBox="0 0 280 90" className="w-full max-w-[220px]" aria-label="Hacienda El Lago">
                <text x="140" y="30" textAnchor="middle" fontWeight="700" fontSize="26" fill="#1E5F8F" letterSpacing="4">
                  HACIENDA
                </text>
                <text x="92" y="72" fontStyle="italic" fontSize="28" fill="#1E5F8F">el</text>
                <text x="128" y="78" fontStyle="italic" fontSize="48" fill="#1BA39C">Lago</text>
              </svg>
            }
            kicker={t("cases.haciendaEllago.kicker")}
            title={t("cases.haciendaEllago.title")}
            desc={t("cases.haciendaEllago.desc")}
          />

          <CaseStudyCard
            logo={
              <svg viewBox="0 0 300 70" className="w-full max-w-[220px] rounded-lg bg-signal-dark" aria-label="Lumotica Innovations">
                <text x="10" y="30" fontWeight="300" fontSize="22" fill="#FFFFFF" letterSpacing="6">LUMOTICA</text>
                <text x="10" y="54" fontWeight="300" fontSize="16" fill="#FFFFFF" letterSpacing="8">INNOVATIONS</text>
                <g stroke="#9BD3E6" strokeWidth="1.2" fill="none" transform="translate(220,12)">
                  <path d="M0 30 L20 20 L40 30 L40 50 L20 60 L0 50 Z" />
                  <path d="M20 20 L20 40 L0 50 M20 40 L40 50" />
                  <circle cx="45" cy="25" r="1.8" fill="#9BD3E6" />
                  <circle cx="55" cy="35" r="1.8" fill="#9BD3E6" />
                  <circle cx="50" cy="50" r="1.8" fill="#9BD3E6" />
                  <path d="M40 30 L45 25 M40 40 L55 35 M40 50 L50 50" />
                </g>
              </svg>
            }
            kicker={t("cases.lumotica.kicker")}
            title={t("cases.lumotica.title")}
            desc={t("cases.lumotica.desc")}
          />
        </RevealGroup>
      </Section>

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
