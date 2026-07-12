import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Connective Health Global Privacy Policy — how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ background: '#fdfaf5' }}>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #f4f0e8, #fdfaf5)' }}>
          <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-16 text-center sm:pb-20 sm:pt-24 lg:px-8">
            <h1 className="font-serif text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl" style={{ color: '#0f3b45' }}>
              Privacy <span style={{ color: '#1b5e6b' }}>Policy</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: '#3a3f4b' }}>
              How we collect, use, and protect your personal information.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="card">
            <p className="text-xs" style={{ color: '#8a8275' }}>Last updated: June 29, 2026</p>

            <div className="mt-6 space-y-6 text-sm leading-relaxed" style={{ color: '#3a3f4b' }}>
              <h2 className="font-serif text-xl font-medium" style={{ color: '#0f3b45' }}>1. Introduction</h2>
              <p>
                Connective Health Global (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to 
                protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard 
                your information when you visit our website at{' '}
                <a href="https://connectivehealthglobal.com" style={{ color: '#1b5e6b' }}>connectivehealthglobal.com</a> 
                (the &ldquo;Site&rdquo;).
              </p>
              <p>
                By using the Site, you agree to the collection and use of information in accordance with this policy.
              </p>

              <h2 className="font-serif text-xl font-medium" style={{ color: '#0f3b45' }}>2. Information We Collect</h2>
              <h3 className="text-base font-semibold" style={{ color: '#1a1d23' }}>Personal Information</h3>
              <p>
                We may collect personally identifiable information such as your name, email address, and phone number 
                when you voluntarily provide it — for example, when you:
              </p>
              <ul className="list-inside list-disc space-y-1">
                <li>Subscribe to our newsletter</li>
                <li>Submit a provider listing claim or inquiry</li>
                <li>Contact us via email or our contact form</li>
                <li>Comment on a listing</li>
              </ul>

              <h3 className="text-base font-semibold" style={{ color: '#1a1d23' }}>Automatically Collected Information</h3>
              <p>
                When you visit the Site, we may automatically collect certain information, including:
              </p>
              <ul className="list-inside list-disc space-y-1">
                <li>Your IP address, browser type, and operating system</li>
                <li>Pages visited, time spent on pages, and referring URLs</li>
                <li>Search queries performed on the Site</li>
              </ul>

              <h2 className="font-serif text-xl font-medium" style={{ color: '#0f3b45' }}>3. How We Use Your Information</h2>
              <p>We use the information we collect for the following purposes:</p>
              <ul className="list-inside list-disc space-y-1">
                <li>To operate and maintain the Site and directory</li>
                <li>To send you newsletters and updates (with your consent)</li>
                <li>To respond to your inquiries and requests</li>
                <li>To process provider listing claims and upgrades</li>
                <li>To improve our content, search results, and user experience</li>
                <li>To comply with legal obligations</li>
              </ul>

              <h2 className="font-serif text-xl font-medium" style={{ color: '#0f3b45' }}>4. Cookies and Tracking</h2>
              <p>
                The Site may use cookies and similar tracking technologies to enhance your experience. Cookies are small 
                data files stored on your device. You can control cookie settings through your browser preferences.
              </p>
              <p>
                We use essential cookies for site functionality and may use analytics cookies to understand how the Site 
                is used. We do not use cookies for targeted advertising at this time.
              </p>

              <h2 className="font-serif text-xl font-medium" style={{ color: '#0f3b45' }}>5. Data Sharing and Disclosure</h2>
              <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
              <ul className="list-inside list-disc space-y-1">
                <li><strong>Service Providers:</strong> With third-party vendors who help us operate the Site (e.g., Supabase for database hosting, Vercel for hosting, GoHighLevel for CRM).</li>
                <li><strong>Legal Requirements:</strong> If required by law or in response to valid legal process.</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
              </ul>

              <h2 className="font-serif text-xl font-medium" style={{ color: '#0f3b45' }}>6. Third-Party Links</h2>
              <p>
                The Site may contain links to third-party websites, including affiliate links to retailers. We are not 
                responsible for the privacy practices of these third parties. Please review their privacy policies 
                directly.
              </p>

              <h2 className="font-serif text-xl font-medium" style={{ color: '#0f3b45' }}>7. Data Security</h2>
              <p>
                We implement reasonable security measures to protect your personal information. However, no method of 
                transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
              </p>

              <h2 className="font-serif text-xl font-medium" style={{ color: '#0f3b45' }}>8. Your Rights</h2>
              <p>Depending on your jurisdiction, you may have the right to:</p>
              <ul className="list-inside list-disc space-y-1">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent for data processing</li>
                <li>Opt out of marketing communications</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at{' '}
                <a href="mailto:info@connectivehealthglobal.com" style={{ color: '#1b5e6b' }}>info@connectivehealthglobal.com</a>.
              </p>

              <h2 className="font-serif text-xl font-medium" style={{ color: '#0f3b45' }}>9. Subscriber Data</h2>
              <p>
                If you subscribe to our newsletter, we store your email address and (if provided) first name in our 
                database. You may unsubscribe at any time using the link in every email. We do not share subscriber 
                data with third parties except as necessary to deliver the newsletter.
              </p>

              <h2 className="font-serif text-xl font-medium" style={{ color: '#0f3b45' }}>10. Children&rsquo;s Privacy</h2>
              <p>
                The Site is not intended for individuals under the age of 18. We do not knowingly collect personal 
                information from children. If you believe a child has provided us with personal data, please contact us.
              </p>

              <h2 className="font-serif text-xl font-medium" style={{ color: '#0f3b45' }}>11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an 
                updated &ldquo;Last updated&rdquo; date. We encourage you to review this policy periodically.
              </p>

              <h2 className="font-serif text-xl font-medium" style={{ color: '#0f3b45' }}>12. Contact</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at:{' '}
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
