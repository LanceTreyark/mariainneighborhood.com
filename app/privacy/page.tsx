import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Maria in the Neighborhood",
  description:
    "Privacy Policy for Maria in the Neighborhood — how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "February 6, 2026";

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative flex min-h-[40vh] items-center overflow-hidden bg-black pt-20">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-4">
              <div className="rounded-full bg-white p-4">
                <Shield size={32} className="text-black" />
              </div>
              <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
                Privacy Policy
              </h1>
            </div>
            <p className="text-lg leading-relaxed text-gray-400">
              Your privacy matters to us. This policy explains how Maria in the
              Neighborhood collects, uses, and safeguards your information.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-12">
            {/* Introduction */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-black">
                1. Introduction
              </h2>
              <p className="leading-relaxed text-gray-700">
                Maria in the Neighborhood (&quot;we,&quot; &quot;our,&quot; or
                &quot;us&quot;) operates the website{" "}
                <span className="font-medium text-black">
                  mariainneighborhood.com
                </span>{" "}
                (the &quot;Site&quot;). This Privacy Policy describes the types
                of information we may collect from you or that you may provide
                when you visit the Site, and our practices for collecting, using,
                maintaining, protecting, and disclosing that information.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-black">
                2. Information We Collect
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                We may collect the following types of information when you
                interact with our Site:
              </p>
              <ul className="ml-6 list-disc space-y-3 text-gray-700">
                <li>
                  <span className="font-medium text-black">
                    Personal Information:
                  </span>{" "}
                  Name, email address, and phone number that you voluntarily
                  provide when submitting a contact form, subscribing to our
                  newsletter, or inquiring about real estate services.
                </li>
                <li>
                  <span className="font-medium text-black">
                    Usage Information:
                  </span>{" "}
                  Automatically collected data such as your IP address, browser
                  type, device information, pages visited, and referring URLs,
                  gathered through cookies and similar tracking technologies for
                  analytics purposes.
                </li>
                <li>
                  <span className="font-medium text-black">
                    Communication Data:
                  </span>{" "}
                  Records and content of correspondence if you contact us
                  directly via the Site or email.
                </li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-black">
                3. How We Use Your Information
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                We use the information we collect for the following purposes:
              </p>
              <ul className="ml-6 list-disc space-y-3 text-gray-700">
                <li>
                  To respond to your inquiries and provide requested services.
                </li>
                <li>
                  To send you newsletters and updates you have opted into
                  receiving.
                </li>
                <li>
                  To improve and optimize the Site&apos;s content, functionality,
                  and user experience.
                </li>
                <li>
                  To analyze site traffic patterns and usage through aggregated,
                  anonymized analytics.
                </li>
                <li>
                  To comply with applicable laws, regulations, and legal
                  processes.
                </li>
              </ul>
            </div>

            {/* We Do NOT Sell or Share */}
            <div className="rounded-xl border-l-4 border-[#dcbbb4] bg-gray-50 p-6">
              <h2 className="mb-4 text-2xl font-bold text-black">
                4. We Do Not Sell or Share Your Personal Information
              </h2>
              <p className="leading-relaxed text-gray-700">
                <strong>
                  We do not sell, trade, rent, or otherwise share your personal
                  information with third parties for marketing or commercial
                  purposes.
                </strong>{" "}
                Your information is treated as strictly confidential. We will
                never disclose your personal data to outside parties except as
                necessary to provide you with the services you have requested, to
                comply with legal obligations, or to protect the rights, safety,
                and property of Maria in the Neighborhood, our users, or the
                public.
              </p>
            </div>

            {/* Data Security */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-black">
                5. Data Security &amp; Confidentiality
              </h2>
              <p className="leading-relaxed text-gray-700">
                We implement commercially reasonable administrative, technical,
                and physical security measures designed to protect your personal
                information from unauthorized access, disclosure, alteration, and
                destruction. All information submitted through our contact forms
                and newsletter subscriptions is transmitted securely and stored
                with appropriate safeguards. While no method of electronic
                storage or transmission is 100% secure, we are committed to
                maintaining the confidentiality of your data.
              </p>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-black">
                6. Cookies &amp; Tracking Technologies
              </h2>
              <p className="leading-relaxed text-gray-700">
                Our Site may use cookies and similar technologies (such as Google
                Analytics) to collect aggregated usage data for the purpose of
                improving user experience and understanding site performance.
                These technologies do not collect personally identifiable
                information unless you have voluntarily provided it. You may
                configure your browser to refuse cookies or alert you when
                cookies are being sent; however, some portions of the Site may
                not function properly if cookies are disabled.
              </p>
            </div>

            {/* Third-Party Links */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-black">
                7. Third-Party Links
              </h2>
              <p className="leading-relaxed text-gray-700">
                The Site may contain links to third-party websites, including
                social media platforms (Instagram, YouTube, TikTok), real estate
                listing services, and other external resources. We are not
                responsible for the privacy practices or content of these
                third-party sites. We encourage you to review the privacy
                policies of any external sites you visit.
              </p>
            </div>

            {/* Children's Privacy */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-black">
                8. Children&apos;s Privacy
              </h2>
              <p className="leading-relaxed text-gray-700">
                Our Site is not directed to individuals under the age of 13. We
                do not knowingly collect personal information from children under
                13. If we become aware that we have inadvertently collected
                personal data from a child under 13, we will take prompt steps to
                delete such information from our records.
              </p>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-black">
                9. Your Rights
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                Depending on your jurisdiction, you may have certain rights
                regarding your personal information, including:
              </p>
              <ul className="ml-6 list-disc space-y-3 text-gray-700">
                <li>
                  The right to access, correct, or delete your personal data.
                </li>
                <li>
                  The right to opt out of receiving marketing communications at
                  any time.
                </li>
                <li>
                  The right to request information about the categories of
                  personal data we hold about you.
                </li>
              </ul>
              <p className="mt-4 leading-relaxed text-gray-700">
                To exercise any of these rights, please contact us using the
                information provided below.
              </p>
            </div>

            {/* Changes to This Policy */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-black">
                10. Changes to This Privacy Policy
              </h2>
              <p className="leading-relaxed text-gray-700">
                We reserve the right to update or modify this Privacy Policy at
                any time. Any changes will be posted on this page with a revised
                &quot;Last Updated&quot; date. Your continued use of the Site
                after any changes constitutes your acceptance of the updated
                policy.
              </p>
            </div>

            {/* Contact */}
            <div className="rounded-xl bg-black p-8">
              <h2 className="mb-4 text-2xl font-bold text-white">
                11. Contact Us
              </h2>
              <p className="mb-4 leading-relaxed text-gray-400">
                If you have any questions, concerns, or requests regarding this
                Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-400">
                <p>
                  <span className="font-medium text-[#dcbbb4]">Email:</span>{" "}
                  mariaintheighborhood@gmail.com
                </p>
                <p>
                  <span className="font-medium text-[#dcbbb4]">Website:</span>{" "}
                  <Link
                    href="/contact"
                    className="underline transition-colors hover:text-[#dcbbb4]"
                  >
                    mariainneighborhood.com/contact
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
