import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Connective Health Global Terms of Use — the terms governing your use of our evidence-guided chronic illness directory.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: '#fdfaf5' }}>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #f4f0e8, #fdfaf5)' }}>
          <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-16 text-center sm:pb-20 sm:pt-24 lg:px-8">
            <h1 className="font-serif text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl" style={{ color: '#0f3b45' }}>
              Terms of <span style={{ color: '#1b5e6b' }}>Use</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: '#3a3f4b' }}>
              The terms governing your use of the Connective Health Global directory and website.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="card">
            <p className="text-xs" style={{ color: '#8a8275' }}>Last updated: June 29, 2026</p>

            <div className="mt-6 space-y-6 text-sm leading-relaxed" style={{ color: '#3a3f4b' }}>
              <h2 className="font-serif text-xl font-medium" style={{ color: '#0f3b45' }}>1. Acceptance of Terms</h2>
              <p>
                By accessing or using Connective Health Global (&ldquo;the Site,&rdquo; &ldquo;we,&rdquo; &ldquo;our&rdquo;), 
                you agree to be bound by these Terms of Use. If you do not agree, please do not use the Site.
              </p>
              <p>
                We may update these terms from time to time. Continued use of the Site after changes constitutes 
                acceptance of the revised terms.
              </p>

              <h2 className="font-serif text-xl font-medium" style={{ color: '#0f3b45' }}>2. Medical Disclaimer</h2>
              <div className="rounded-lg border p-4" style={{ borderColor: '#f2d9b3', background: '#f9f6ef' }}>
                <p className="font-semibold" style={{ color: '#c77d2a' }}>IMPORTANT: Not Medical Advice</p>
                <p className="mt-2">
                  Connective Health Global is an evidence-information directory and research navigation tool. It is 
                  <strong> not</strong> a substitute for professional medical advice, diagnosis, or treatment. Always 
                  seek the advice of your physician or other qualified health provider with any questions you may have 
                  regarding a medical condition or treatment.
                </p>
                <p className="mt-2">
                  Never disregard professional medical advice or delay in seeking it because of something you have 
                  read on this Site. Evidence ratings reflect the quality of available research — they do not constitute 
                  medical recommendations.
                </p>
              </div>

              <h2 className="font-serif text-xl font-medium" style={{ color: '#0f3b45' }}>3. Use of the Site</h2>
              <p>You agree to use the Site only for lawful purposes and in accordance with these terms. You agree not to:</p>
              <ul className="list-inside list-disc space-y-1">
                <li>Use the Site in any way that violates applicable laws or regulations</li>
                <li>Attempt to gain unauthorised access to any part of the Site or its systems</li>
                <li>Interfere with or disrupt the Site, servers, or networks</li>
                <li>Submit false or misleading information through forms or submissions</li>
                <li>Use automated tools to scrape, crawl, or extract data from the Site without our prior written consent</li>
              </ul>

              <h2 className="font-serif text-xl font-medium" style={{ color: '#0f3b45' }}>4. Evidence Ratings and Listings</h2>
              <p>
                Evidence ratings are assigned by our editorial team based on published, peer-reviewed research 
                accessible at the time of review. Ratings are subject to change as new evidence emerges.
              </p>
              <p>
                Listings in the directory — including clinics, providers, and support services — are provided for 
                informational purposes. Inclusion in the directory does not constitute endorsement or recommendation.
              </p>
              <p>
                We strive for accuracy but cannot guarantee that all information is complete, current, or error-free. 
                If you identify an inaccuracy, please contact us.
              </p>

              <h2 className="font-serif text-xl font-medium" style={{ color: '#0f3b45' }}>5. Affiliate Links</h2>
              <p>
                Some supplement listings may contain affiliate links, as fully described in our{' '}
                <Link href="/affiliate-disclosure" style={{ color: '#1b5e6b' }}>Affiliate Disclosure</Link>. 
                Affiliate relationships never influence evidence ratings, search rankings, or listing order. 
                Only supplement listings rated Clinical Trial or Multiple Studies may carry affiliate links.
              </p>

              <h2 className="font-serif text-xl font-medium" style={{ color: '#0f3b45' }}>6. User Contributions</h2>
              <p>
                Users may submit comments, suggestions, evidence submissions, and other content. By submitting, you 
                grant us a non-exclusive, royalty-free license to use, display, and distribute your submission on the 
                Site. You represent that your submissions do not violate any third-party rights.
              </p>
              <p>
                We reserve the right to moderate, edit, or remove user-generated content at our discretion.
              </p>

              <h2 className="font-serif text-xl font-medium" style={{ color: '#0f3b45' }}>7. Provider Listings and Claims</h2>
              <p>
                Providers may claim or submit listings through the Site. By doing so, you represent that the 
                information provided is accurate and complete. We reserve the right to verify claims and may 
                remove or suspend listings that contain false or misleading information.
              </p>
              <p>
                Paid listing tiers (Verified, Featured) are month-to-month subscriptions. You may cancel at any 
                time. Refunds are provided within the first 14 days of a paid tier. Free listings are provided 
                at no cost and may be removed with 30 days&rsquo; notice.
              </p>

              <h2 className="font-serif text-xl font-medium" style={{ color: '#0f3b45' }}>8. Intellectual Property</h2>
              <p>
                All content on the Site — including text, graphics, logos, icons, the evidence rubric, and 
                directory structure — is the property of Connective Health Global unless otherwise attributed. 
                You may not reproduce, distribute, modify, or create derivative works without our prior written 
                permission.
              </p>
              <p>
                Evidence sources linked from the Site remain the intellectual property of their respective 
                authors and publishers.
              </p>

              <h2 className="font-serif text-xl font-medium" style={{ color: '#0f3b45' }}>9. Limitation of Liability</h2>
              <p>
                Connective Health Global and its operators shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages arising from your use of the Site. The Site is 
                provided &ldquo;as is&rdquo; without warranties of any kind, either express or implied.
              </p>
              <p>
                Some jurisdictions do not allow the exclusion of certain warranties or limitations of liability, 
                so the above limitations may not apply to you.
              </p>

              <h2 className="font-serif text-xl font-medium" style={{ color: '#0f3b45' }}>10. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Connective Health Global, its operators, contributors, 
                and affiliates from any claims, damages, or expenses arising from your use of the Site or 
                violation of these terms.
              </p>

              <h2 className="font-serif text-xl font-medium" style={{ color: '#0f3b45' }}>11. Governing Law</h2>
              <p>
                These terms are governed by the laws of Australia. Any disputes arising from these terms or 
                your use of the Site shall be resolved in the courts of Australia.
              </p>

              <h2 className="font-serif text-xl font-medium" style={{ color: '#0f3b45' }}>12. Contact</h2>
              <p>
                For questions about these Terms of Use, please contact us at:{' '}
                <a href="mailto:info@connectivehealthglobal.com" style={{ color: '#1b5e6b' }}>info@connectivehealthglobal.com</a>
              </p>
              <p className="text-xs" style={{ color: '#8a8275' }}>
                Connective Health Global<br />
                <Link href="/" style={{ color: '#1b5e6b' }}>connectivehealthglobal.com</Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
