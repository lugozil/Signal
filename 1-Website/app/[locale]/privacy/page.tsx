import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal, RevealGroup } from "@/components/reveal";
import { Section } from "@/components/section";
import { LegalSection, NoticeBox } from "@/components/legal-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return { title: t("privacyTitle") };
}

export default async function PrivacyPage({
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
            {t("privacyTitle")}
          </h1>
          <p className="font-mono text-xs uppercase tracking-wide text-signal-mist-dim">
            {t("lastUpdated")}
          </p>
        </Reveal>

        <Reveal className="mb-6">
          <NoticeBox>
            <p className="mb-1 font-mono text-xs font-medium uppercase tracking-wide text-signal-orange">
              Important Notice — Text Messaging Data
            </p>
            <p>
              VIRAL SIGNAL LLC <strong className="text-signal-paper">DOES NOT</strong> share
              customer opt-in information, including phone numbers and consent records, with
              any affiliates or third parties for marketing, promotional, or any other
              purposes unrelated to providing our direct services. All text messaging
              originator opt-in data is kept strictly confidential.
            </p>
          </NoticeBox>
        </Reveal>

        <RevealGroup className="space-y-6">
          <LegalSection number="01" title="Information We Collect">
            <div>
              <p className="mb-1 font-semibold text-signal-paper">Personal Information</p>
              <ul>
                <li>Name, email address, phone number, physical address.</li>
                <li>Payment information when you contract our marketing services or request a technical audit.</li>
                <li>Opt-in records and timestamps for all communication channels (SMS, email, WhatsApp, etc.).</li>
              </ul>
            </div>
            <div>
              <p className="mb-1 font-semibold text-signal-paper">Non-Personal Information</p>
              <ul>
                <li>IP address, browser type, device information.</li>
                <li>Website usage patterns and analytics.</li>
                <li>Cookies and similar technologies.</li>
              </ul>
            </div>
            <div>
              <p className="mb-1 font-semibold text-signal-paper">Customer Communication</p>
              <ul>
                <li>Records of inquiries and service requests.</li>
                <li>Marketing audit details, CRM automation preferences, and web development specifications.</li>
                <li>Service history and feedback.</li>
              </ul>
            </div>
          </LegalSection>

          <LegalSection number="02" title="How We Use Your Information">
            <ul>
              <li>Providing and improving our marketing, advertising, CRM, and web development services.</li>
              <li>Processing transactions and service payments.</li>
              <li>Communicating with you about your inquiries, strategy meetings, and campaign details.</li>
              <li>Enhancing website functionality and user experience.</li>
              <li>Ensuring security and fraud prevention.</li>
              <li>Maintaining records of your communication preferences and consent.</li>
            </ul>
          </LegalSection>

          <LegalSection number="03" title="SMS Messaging & Compliance">
            <div>
              <p className="mb-1 font-semibold text-signal-paper">Text Message Program Terms &amp; Conditions</p>
              <p>By opting into our SMS messaging services, you agree to receive text messages related to our services, including meeting reminders, technical support updates, and important campaign or CRM notifications.</p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-signal-paper">Opt-In &amp; Consent</p>
              <p>You will only receive messages if you have explicitly opted in. We maintain timestamped records of all opt-in actions. We comply with the Telephone Consumer Protection Act (TCPA) and all applicable laws.</p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-signal-paper">Opt-Out Instructions</p>
              <p>You can cancel SMS notifications at any time by replying <strong>&quot;STOP&quot;</strong>. You will receive a final confirmation message, and no further messages will be sent unless you re-opt in. All opt-out requests are processed immediately.</p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-signal-paper">Message Frequency &amp; Content</p>
              <p>Message frequency varies based on your interactions with our business. Messages will be directly related to the marketing or technology services you have requested. We do not send promotional content without specific consent.</p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-signal-paper">Help &amp; Support</p>
              <p>Reply <strong>&quot;HELP&quot;</strong> for assistance or contact us at <a href="mailto:info@viralsignal.net">info@viralsignal.net</a>. Customer support is available during regular business hours.</p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-signal-paper">Carrier Information</p>
              <p>Standard message and data rates may apply. Carriers are not liable for delayed or undelivered messages. Supported carriers include AT&amp;T, Verizon, T-Mobile, Sprint, and most regional carriers.</p>
            </div>
            <NoticeBox>
              <p className="mb-1 font-semibold text-signal-orange">SMS Data Protection Statement</p>
              <p>No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. Information sharing to subcontractors in support services, such as customer service, is permitted. All other use case categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties. We implement strict data protection measures to safeguard your SMS opt-in information and consent records.</p>
            </NoticeBox>
          </LegalSection>

          <LegalSection number="04" title="Information Sharing & Disclosure">
            <p>We do not sell, rent, or trade personal information. We may share information with:</p>
            <div>
              <p className="mb-1 font-semibold text-signal-paper">Service Providers</p>
              <ul>
                <li>Third-party vendors who assist in our operations (e.g., payment processing, project management, CRM software, analytics platforms).</li>
                <li>SMS aggregators and providers solely for the purpose of delivering messages you&apos;ve consented to receive.</li>
                <li>All service providers are contractually obligated to maintain confidentiality and security.</li>
              </ul>
            </div>
            <div>
              <p className="mb-1 font-semibold text-signal-paper">Legal Compliance</p>
              <ul>
                <li>If required by law, legal process, or to protect our rights.</li>
                <li>In response to valid law enforcement requests or court orders.</li>
              </ul>
            </div>
            <div>
              <p className="mb-1 font-semibold text-signal-paper">Business Transfers</p>
              <ul>
                <li>In case of mergers, acquisitions, or sale of assets.</li>
                <li>In such cases, your data remains protected under the terms of this policy.</li>
              </ul>
            </div>
            <p className="border-t border-white/10 pt-4 text-xs">
              All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties, excluding aggregators and providers of the Text Message services.
            </p>
          </LegalSection>

          <LegalSection number="05" title="Data Security">
            <p>We implement and maintain reasonable security measures to protect your personal information:</p>
            <ul>
              <li>Encryption of sensitive data in transit and at rest.</li>
              <li>Secure access controls and authentication mechanisms.</li>
              <li>Regular security assessments and updates.</li>
              <li>Employee training on data protection.</li>
              <li>Breach notification protocols in accordance with applicable laws.</li>
              <li>Secure backup systems and disaster recovery procedures.</li>
            </ul>
            <p>Despite these measures, no method of transmission over the Internet or electronic storage is 100% secure. We strive to use commercially acceptable means to protect your personal information but cannot guarantee absolute security.</p>
          </LegalSection>

          <LegalSection number="06" title="Cookies & Tracking Technologies">
            <p>We use cookies and similar technologies to:</p>
            <ul>
              <li>Analyze site traffic and user behavior.</li>
              <li>Remember your preferences.</li>
              <li>Improve website functionality and user experience.</li>
              <li>Measure the effectiveness of our campaigns and services.</li>
            </ul>
            <p>You may control cookies through your browser settings. Disabling cookies may limit your ability to use certain features of our website.</p>
          </LegalSection>

          <LegalSection number="07" title="Your Rights & Choices">
            <p>You have the right to:</p>
            <ul>
              <li>Access, update, or delete your personal information.</li>
              <li>Opt-out of marketing emails by clicking &quot;unsubscribe&quot; in our emails.</li>
              <li>Opt-out of SMS messages by replying <strong>&quot;STOP&quot;</strong>.</li>
              <li>Request information on how we process your data.</li>
              <li>Withdraw consent at any time for future communications.</li>
              <li>Lodge a complaint with a supervisory authority if you believe your rights have been violated.</li>
            </ul>
          </LegalSection>

          <LegalSection number="08" title="Third-Party Links">
            <p>Our website may contain links to third-party websites. We are not responsible for their privacy practices and encourage you to review their policies. This privacy policy applies only to information collected by VIRAL SIGNAL LLC.</p>
          </LegalSection>

          <LegalSection number="09" title="Changes to This Privacy Policy">
            <p>We may update this policy periodically. The latest version will always be available on our website at <a href="https://viralsignal.net">viralsignal.net</a> with the effective date. For significant changes, we will notify you by email or through a notice on our website.</p>
          </LegalSection>

          <LegalSection number="10" title="Contact Us">
            <p>If you have questions about this Privacy Policy or how your information is handled, contact us at:</p>
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
