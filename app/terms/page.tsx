import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Scale } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Maria in the Neighborhood",
  description:
    "Terms of Service for Maria in the Neighborhood — the terms and conditions governing your use of our website.",
};

export default function TermsOfServicePage() {
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
                <Scale size={32} className="text-black" />
              </div>
              <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
                Terms of Service
              </h1>
            </div>
            <p className="text-lg leading-relaxed text-gray-400">
              Please read these terms carefully before using our website. By
              accessing or using the Site, you agree to be bound by these Terms.
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
            {/* Acceptance of Terms */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-black">
                1. Acceptance of Terms
              </h2>
              <p className="leading-relaxed text-gray-700">
                By accessing and using the website{" "}
                <span className="font-medium text-black">
                  mariainneighborhood.com
                </span>{" "}
                (the &quot;Site&quot;), operated by Maria in the Neighborhood
                (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you
                acknowledge that you have read, understood, and agree to be bound
                by these Terms of Service (&quot;Terms&quot;). If you do not
                agree with any part of these Terms, you must discontinue use of
                the Site immediately.
              </p>
            </div>

            {/* Description of Services */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-black">
                2. Description of Services
              </h2>
              <p className="leading-relaxed text-gray-700">
                Maria in the Neighborhood provides informational content related
                to the La Jolla, California community, including but not limited
                to neighborhood highlights, local business features, real estate
                information, video content, and community stories. The Site also
                offers a contact form, newsletter subscription, and links to
                third-party real estate listings and social media platforms. All
                content on the Site is provided for general informational and
                entertainment purposes only.
              </p>
            </div>

            {/* Use of the Site */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-black">
                3. Use of the Site
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                You agree to use the Site only for lawful purposes and in a
                manner that does not infringe upon the rights of, or restrict or
                inhibit the use and enjoyment of the Site by, any third party.
                Prohibited conduct includes, but is not limited to:
              </p>
              <ul className="ml-6 list-disc space-y-3 text-gray-700">
                <li>
                  Using the Site in any way that violates applicable federal,
                  state, local, or international law or regulation.
                </li>
                <li>
                  Attempting to gain unauthorized access to any portion of the
                  Site, its servers, or any connected systems or networks.
                </li>
                <li>
                  Transmitting any material that is defamatory, obscene,
                  fraudulent, or otherwise objectionable.
                </li>
                <li>
                  Using automated tools, bots, or scrapers to access, monitor, or
                  copy content from the Site without our express written consent.
                </li>
                <li>
                  Interfering with or disrupting the integrity or performance of
                  the Site or its underlying infrastructure.
                </li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-black">
                4. Intellectual Property Rights
              </h2>
              <p className="leading-relaxed text-gray-700">
                All content on the Site — including but not limited to text,
                graphics, photographs, videos, logos, icons, audio clips, and
                software — is the property of Maria in the Neighborhood or its
                content suppliers and is protected by United States and
                international copyright, trademark, and other intellectual
                property laws. You may not reproduce, distribute, modify, create
                derivative works of, publicly display, or otherwise exploit any
                content from the Site without our prior written permission.
              </p>
            </div>

            {/* Confidentiality */}
            <div className="rounded-xl border-l-4 border-[#dcbbb4] bg-gray-50 p-6">
              <h2 className="mb-4 text-2xl font-bold text-black">
                5. Confidentiality of Communications
              </h2>
              <p className="leading-relaxed text-gray-700">
                <strong>
                  Any personal information, inquiries, or communications you
                  submit through the Site are treated as strictly confidential.
                </strong>{" "}
                We do not sell, share, or distribute your personal data to third
                parties for commercial or marketing purposes. All information
                provided through our contact forms, newsletter sign-ups, and
                direct communications is handled with the utmost care and
                discretion in accordance with our{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-[#dcbbb4] underline transition-colors hover:text-black"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            {/* Real Estate Disclaimer */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-black">
                6. Real Estate Information Disclaimer
              </h2>
              <p className="leading-relaxed text-gray-700">
                The real estate listings, property information, market data, and
                related content displayed on the Site are provided for
                informational purposes only and should not be construed as
                professional real estate advice. While we strive to present
                accurate and up-to-date information, we make no representations
                or warranties regarding the accuracy, completeness, or
                reliability of any real estate data. You should independently
                verify all property information and consult with a licensed real
                estate professional before making any real estate decisions.
              </p>
            </div>

            {/* Third-Party Links */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-black">
                7. Third-Party Links &amp; Content
              </h2>
              <p className="leading-relaxed text-gray-700">
                The Site may contain links to third-party websites, platforms,
                and services, including but not limited to social media profiles
                (Instagram, YouTube, TikTok), real estate listing platforms
                (Zillow), and other external resources. These links are provided
                for your convenience only. We do not endorse, control, or assume
                responsibility for the content, privacy policies, or practices of
                any third-party sites. Access to and use of any linked
                third-party sites is at your own risk and subject to the terms
                and conditions of those sites.
              </p>
            </div>

            {/* Disclaimer of Warranties */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-black">
                8. Disclaimer of Warranties
              </h2>
              <p className="leading-relaxed text-gray-700">
                THE SITE AND ALL CONTENT, MATERIALS, AND SERVICES PROVIDED ON OR
                THROUGH THE SITE ARE PROVIDED ON AN &quot;AS IS&quot; AND
                &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND,
                EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY
                APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED,
                INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                NON-INFRINGEMENT, AND ACCURACY. WE DO NOT WARRANT THAT THE SITE
                WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES OR
                OTHER HARMFUL COMPONENTS.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-black">
                9. Limitation of Liability
              </h2>
              <p className="leading-relaxed text-gray-700">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL MARIA
                IN THE NEIGHBORHOOD, ITS OWNERS, OPERATORS, AFFILIATES, OR
                CONTENT CONTRIBUTORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF
                PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR IN CONNECTION
                WITH YOUR ACCESS TO OR USE OF (OR INABILITY TO ACCESS OR USE) THE
                SITE, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING
                NEGLIGENCE), STATUTE, OR ANY OTHER LEGAL THEORY, EVEN IF WE HAVE
                BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
            </div>

            {/* Indemnification */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-black">
                10. Indemnification
              </h2>
              <p className="leading-relaxed text-gray-700">
                You agree to indemnify, defend, and hold harmless Maria in the
                Neighborhood and its owners, operators, affiliates, and content
                contributors from and against any and all claims, liabilities,
                damages, losses, costs, and expenses (including reasonable
                attorneys&apos; fees) arising out of or in connection with your
                use of the Site, your violation of these Terms, or your violation
                of any rights of another party.
              </p>
            </div>

            {/* Governing Law */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-black">
                11. Governing Law &amp; Jurisdiction
              </h2>
              <p className="leading-relaxed text-gray-700">
                These Terms shall be governed by and construed in accordance with
                the laws of the State of California, without regard to its
                conflict of law principles. Any disputes arising under or in
                connection with these Terms shall be subject to the exclusive
                jurisdiction of the state and federal courts located in San
                Diego County, California.
              </p>
            </div>

            {/* Modifications */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-black">
                12. Modifications to Terms
              </h2>
              <p className="leading-relaxed text-gray-700">
                We reserve the right to revise, amend, or update these Terms at
                any time at our sole discretion. Any changes will be effective
                immediately upon posting on the Site with a revised &quot;Last
                Updated&quot; date. Your continued use of the Site following the
                posting of revised Terms constitutes your acceptance of such
                changes. We encourage you to review these Terms periodically.
              </p>
            </div>

            {/* Severability */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-black">
                13. Severability
              </h2>
              <p className="leading-relaxed text-gray-700">
                If any provision of these Terms is found to be invalid, illegal,
                or unenforceable by a court of competent jurisdiction, such
                invalidity shall not affect the validity of the remaining
                provisions, which shall continue in full force and effect.
              </p>
            </div>

            {/* Contact */}
            <div className="rounded-xl bg-black p-8">
              <h2 className="mb-4 text-2xl font-bold text-white">
                14. Contact Information
              </h2>
              <p className="mb-4 leading-relaxed text-gray-400">
                If you have any questions or concerns regarding these Terms of
                Service, please contact us:
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
