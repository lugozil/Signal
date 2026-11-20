import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal, RevealGroup } from "@/components/reveal";
import { Section } from "@/components/section";
import { LegalSection, NoticeBox } from "@/components/legal-section";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return { title: t("termsTitle") };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("legal");

  return (
    <Section first bg>
      <div className="mx-auto max-w-4xl">
        <Reveal className="mb-10">
          <p className="kicker">{t("kicker")}</p>
          <h1 className="mb-4 mt-4 text-4xl font-extrabold leading-tight tracking-tight lg:text-5xl">
            {t("termsTitle")}
          </h1>
          <p className="font-mono text-xs uppercase tracking-wide text-signal-mist-dim">
            {t("lastUpdated")}
          </p>
        </Reveal>

        <RevealGroup className="space-y-6">
          <LegalSection number="SMS" title="SMS Messaging Terms & Compliance">
            <div>
              <p className="mb-1 font-semibold text-signal-paper">Program Description</p>
              <p>This messaging program sends audit confirmations, strategy session reminders, and service updates to customers who have booked an appointment or contracted services with VIRAL SIGNAL LLC through our website at viralsignal.net, or via our scheduling forms, and have explicitly opted in to receive SMS notifications. Opt-in is collected via web forms with a dedicated checkbox for SMS consent. Messages include scheduling confirmations, appointment reminders, project updates, and customer support communications.</p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-signal-paper">Cancellation Instructions</p>
              <p>You can cancel the SMS service at any time. Simply text <strong>&quot;STOP&quot;</strong> to the same number that sent you messages. Upon sending &quot;STOP,&quot; we will confirm your unsubscribe status via SMS. Following this confirmation, you will no longer receive SMS messages from us. To rejoin, sign up as you did initially, and we will resume sending SMS messages to you.</p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-signal-paper">Support Information</p>
              <p>If you experience issues with the messaging program, reply with the keyword <strong>&quot;HELP&quot;</strong> for more assistance, or reach out directly to <a href="mailto:info@viralsignal.net">info@viralsignal.net</a> or call <a href="tel:+17875582671">(787) 558-2671</a> during business hours.</p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-signal-paper">Carrier Liability</p>
              <p>Carriers are not liable for delayed or undelivered messages.</p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-signal-paper">Message &amp; Data Rates</p>
              <p>Message and data rates may apply for messages sent to you from us and to us from you. Message frequency varies based on your service usage and appointment schedule. For questions about your text plan or data plan, contact your wireless provider.</p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-signal-paper">Supported Carriers</p>
              <p>Our SMS program works with all major U.S. wireless carriers, including AT&amp;T, T-Mobile, Verizon, Sprint, and most regional carriers.</p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-signal-paper">Age Restriction</p>
              <p>You must be 18 years or older to participate in our SMS program.</p>
            </div>
            <NoticeBox>
              <p className="mb-1 font-semibold text-signal-orange">Privacy Policy</p>
              <p>For privacy-related inquiries, please refer to our <Link href="/privacy" className="font-semibold text-signal-orange hover:underline">Privacy Policy</Link> available at viralsignal.net.</p>
            </NoticeBox>
            <p>We comply with all applicable laws and regulations, including the Telephone Consumer Protection Act (TCPA) and CTIA guidelines, regarding the use of SMS communications.</p>
          </LegalSection>

          <LegalSection number="01" title="General Terms">
            <p>This website is owned and operated by VIRAL SIGNAL LLC. By using the Site, you agree to be bound by these Terms of Service and to use the Site in accordance with these Terms of Service, our Privacy Policy, and any additional terms and conditions that may apply to specific sections of the Site or to products and services available through the Site or from VIRAL SIGNAL LLC. Accessing the Site, in any manner, whether automated or otherwise, constitutes use of the Site and your agreement to be bound by these Terms of Service.</p>
            <p>We reserve the right to change these Terms of Service or to impose new conditions on the use of the Site from time to time, in which case we will post the revised Terms of Service on this website. By continuing to use the Site after we post any such changes, you accept the Terms of Service, as modified.</p>
          </LegalSection>

          <LegalSection number="02" title="Intellectual Property Rights">
            <div>
              <p className="mb-1 font-semibold text-signal-paper">Our Limited License to You</p>
              <p>This Site and all the materials available on the Site are the property of VIRAL SIGNAL LLC and/or our affiliates or licensors and are protected by copyright, trademark, and other intellectual property laws. The Site is provided solely for your personal and commercial inquiries. You may not use the Site or the materials available on the Site in a manner that constitutes an infringement of our rights or that has not been authorized by us.</p>
              <p className="mt-2">Unless explicitly authorized, you may not modify, copy, reproduce, republish, upload, post, transmit, translate, sell, create derivative works, exploit, or distribute in any manner or medium any material from the Site. However, you may download and/or print one copy of individual pages for your personal, non-commercial use, provided that you keep intact all copyright and other proprietary notices.</p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-signal-paper">Your License to Us</p>
              <p>By posting or submitting any material (including comments, blog entries, social media posts, photos, and videos) to us via the Site, internet groups, or other digital venues, you represent that you own the material or have obtained the necessary permissions. You grant us a royalty-free, perpetual, irrevocable, non-exclusive, worldwide license to use, modify, transmit, sell, exploit, create derivative works from, distribute, and publicly perform or display such material.</p>
            </div>
          </LegalSection>

          <LegalSection number="03" title="Disclaimers">
            <p>Throughout the Site, we may provide links and pointers to Internet sites maintained by third parties. Our linking to such third-party sites does not imply an endorsement or sponsorship of such sites or the information, products, or services offered on or through the sites. The information, products, and services offered on or through the Site are provided &quot;as is&quot; and without warranties of any kind, either express or implied. To the fullest extent permissible pursuant to applicable law, we disclaim all warranties, including implied warranties of merchantability and fitness for a particular purpose.</p>
            <p>You agree at all times to indemnify and hold harmless VIRAL SIGNAL LLC, its affiliates, and their respective officers, directors, agents, and employees from any claims, causes of action, damages, liabilities, costs, and expenses arising out of or related to your breach of any obligation, warranty, or representation under these Terms of Service.</p>
          </LegalSection>

          <LegalSection number="04" title="Online Commerce">
            <p>Certain sections of the Site may allow you to purchase products and services from third-party vendors. We are not responsible for the quality, accuracy, timeliness, reliability, or any other aspect of these products and services. If you make a purchase from a third party linked through the Site, the information obtained during your visit, including payment information, may be collected by both the merchant and us. Your participation in any dealings with third-party vendors is solely between you and the third party. VIRAL SIGNAL LLC shall not be responsible for any loss or damage incurred as a result of such dealings.</p>
          </LegalSection>

          <LegalSection number="05" title="Registration & Passwords">
            <p>To access certain features of the Site, you may be required to register and create an account. You agree to provide accurate, current, and complete information during the registration process. You are responsible for maintaining the confidentiality of your login credentials and for all activities conducted under your account.</p>
            <p>If you suspect unauthorized use of your account, notify us immediately at <a href="mailto:info@viralsignal.net">info@viralsignal.net</a>. We are not liable for any loss or damage arising from your failure to comply with this obligation.</p>
          </LegalSection>

          <LegalSection number="06" title="Termination">
            <p>We reserve the right to terminate or suspend your access to the Site, without notice, if we determine that you have violated these Terms of Service or engaged in conduct that we deem inappropriate or unlawful. Upon termination, you must cease all use of the Site and any content obtained from it.</p>
          </LegalSection>

          <LegalSection number="07" title="Governing Law">
            <p>These Terms of Service shall be governed by and construed in accordance with the laws of the state in which VIRAL SIGNAL LLC operates. Any dispute arising under these Terms shall be resolved exclusively through binding arbitration in that jurisdiction.</p>
          </LegalSection>

          <LegalSection number="08" title="Changes to Terms of Service">
            <p>We may update these Terms of Service from time to time. The latest version will always be available on our website with the effective date.</p>
          </LegalSection>

          <LegalSection number="09" title="Contact Us">
            <p>For any questions regarding these Terms of Service, please contact us at:</p>
            <div className="space-y-1 text-signal-paper">
              <p className="font-bold">VIRAL SIGNAL LLC</p>
              <p className="text-signal-mist"><a href="tel:+17875582671">(787) 558-2671</a></p>
              <p className="text-signal-mist"><a href="mailto:info@viralsignal.net">info@viralsignal.net</a></p>
              <p className="text-signal-mist"><a href="https://viralsignal.net">viralsignal.net</a></p>
            </div>
          </LegalSection>
        </RevealGroup>
      </div>
    </Section>
  );
}
