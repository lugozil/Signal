import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaButton } from "@/components/cta-button";
import { Reveal, RevealGroup } from "@/components/reveal";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { AdsIcon, CrmIcon, SocialIcon, SupportIcon, WebIcon } from "@/components/icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("kicker"), description: t("subtitle") };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("services");
  const s = await getTranslations("services.items");

  const services = [
    { key: "social", icon: <SocialIcon />, span: "lg:col-span-7 lg:row-span-2" },
    { key: "ads", icon: <AdsIcon />, span: "lg:col-span-5" },
    { key: "crm", icon: <CrmIcon />, span: "lg:col-span-5" },
    { key: "web", icon: <WebIcon />, span: "lg:col-span-7" },
    { key: "support", icon: <SupportIcon />, span: "md:col-span-2 lg:col-span-12" },
  ] as const;

  return (
    <>
      <Section first bg className="pb-16 lg:pb-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            kicker={t("kicker")}
            title={
              <>
                {t("title1")}
                <br />
                <span className="text-gradient">{t("title2")}</span>
              </>
            }
            subtitle={t("subtitle")}
          />
        </div>
      </Section>

      <Section className="pt-0 lg:pt-0">
        <RevealGroup className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
          {services.map(({ key, icon, span }, i) => (
            <ServiceCard
              key={key}
              className={span}
              icon={icon}
              index={`0${i + 1} / 0${services.length}`}
              title={s(`${key}.title`)}
              desc={s(`${key}.desc`)}
              detail={s(`${key}.detail`)}
              tags={[s(`${key}.tag1`), s(`${key}.tag2`), s(`${key}.tag3`)]}
            />
          ))}
        </RevealGroup>
      </Section>

      <Section divider>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="kicker justify-center">{t("ctaKicker")}</p>
          <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight lg:text-4xl">
            {t("ctaTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-signal-mist">
            {t("ctaDesc")}
          </p>
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
