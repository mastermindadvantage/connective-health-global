import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'How Connective Health Global uses affiliate links. Only Clinical Trial and Multiple Studies rated supplements may carry affiliate referrals. Our evidence gate policy explained.',
  keywords: ['affiliate disclosure', 'affiliate links', 'evidence gate', 'commission', 'transparency', 'supplement affiliate'],
}

const keyPoints = [
  {
    icon: '⛓️',
    title: 'The Evidence Gate',
    description: 'Affiliate links appear ONLY on supplement listings rated Clinical Trial or Multiple Studies — the two highest evidence tiers. No exceptions.',
  },
  {
    icon: '📊',
    title: 'Revenue Follows Evidence',
    description: 'We never let affiliate relationships influence evidence ratings. Revenue is a consequence of high-quality evidence, not a cause of it.',
  },
  {
    icon: '🔍',
    title: 'Always Disclosed',
    description: 'Every page with affiliate links carries a clear disclosure notice. You will always know when a link is an affiliate referral.',
  },
  {
    icon: '💚',
    title: 'Revenue = Oxygen',
    description: 'Affiliate income funds the directory\'s operations — hosting, research curation, editorial work — and keeps all core features free for users.',
  },
  {
    icon: '🛡️',
    title: 'Patient Trust First',
    description: 'Our ranking and search results are never affected by affiliate relationships. Listings are ordered by evidence tier and relevance, not commission rate.',
  },
  {
    icon: '📋',
    title: 'Full Transparency',
    description: 'We maintain a public record of all affiliate partnerships. If you have questions about a specific listing, contact us.',
  },
]

export default function AffiliateDisclosurePage() {
  return (
    <div className="min-h-screen" style={{ background: '#fdfaf5' }}>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #f4f0e8, #fdfaf5)' }}>
          <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-16 text-center sm:pb-20 sm:pt-24 lg:px-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ border: '1px solid #f2d9b3', background: '#f9f6ef' }}>
              <span className="h-2 w-2 rounded-full" style={{ background: '#c77d2a' }} />
              <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#c77d2a', fontSize: '0.7rem' }}>Transparency</span>
            </div>
            <h1 className="font-serif text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl" style={{ color: '#0f3b45' }}>
              Affiliate <span style={{ color: '#1b5e6b' }}>Disclosure</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: '#3a3f4b' }}>
              We believe in radical transparency. Here&rsquo;s exactly how and when we use affiliate links — 
              and the evidence gate that governs every single one.
            </p>
          </div>
        </section>

        {/* Policy body */}
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="card">
            <h2 className="font-serif text-2xl font-medium" style={{ color: '#0f3b45' }}>Our Policy</h2>

            <div className="mt-6 space-y-6 text-sm leading-relaxed" style={{ color: '#3a3f4b' }}>
              <p>
                <strong>Connective Health Global</strong> participates in select affiliate marketing programs. 
                This means that if you click on an affiliate link and make a purchase, we may earn a small commission — 
                at no additional cost to you.
              </p>

              <div className="callout">
                <p className="callout-label">The Evidence Gate</p>
                <p>
                  <strong>Affiliate links only appear on supplement listings rated Clinical Trial or Multiple Studies.</strong>{' '}
                  We never place affiliate links on listings with lower evidence ratings — no matter how lucrative 
                  the offer. This is non-negotiable and applies across the entire directory.
                </p>
              </div>

              <p>
                Here&rsquo;s what that means in practice:
              </p>

              <ul className="list-inside list-disc space-y-2" style={{ color: '#3a3f4b' }}>
                <li><strong>Only supplements</strong> may carry affiliate links (treatments and providers do not participate in our affiliate program).</li>
                <li>Only supplement listings with an evidence rating of <strong>Clinical Trial</strong> or <strong>Multiple Studies</strong> are eligible for affiliate links.</li>
                <li>Every page that contains affiliate links displays a <strong>clear disclosure notice</strong> at the top.</li>
                <li>Affiliate relationships <strong>never influence</strong> evidence ratings, search rankings, or listing order.</li>
                <li>We do not accept payment for listings, editorial placement, or evidence tier assignment.</li>
              </ul>

              <p>
                Our affiliate partnerships currently include <strong>iHerb</strong> and <strong>Amazon</strong>. 
                We may add or change affiliate partners over time; this page will be updated accordingly.
              </p>

              <h3 className="text-base font-semibold" style={{ color: '#1a1d23' }}>How to identify affiliate links</h3>
              <p>
                Affiliate links on this site use tracking parameters in the URL. If you hover over a link, you may 
                see a URL that includes &ldquo;tag=&rdquo; or similar affiliate identifiers. We also label affiliate 
                sections with a disclaimer like &ldquo;Shop with confidence — we may earn a commission.&rdquo;
              </p>

              <h3 className="text-base font-semibold" style={{ color: '#1a1d23' }}>Your choice matters</h3>
              <p>
                If you prefer not to use affiliate links, you can always visit the retailer directly or search for 
                the product on your own. Our evidence ratings and recommendations are identical regardless of 
                whether you use an affiliate link.
              </p>

              <h3 className="text-base font-semibold" style={{ color: '#1a1d23' }}>Questions?</h3>
              <p>
                If you have any questions about our affiliate practices, please contact us at{' '}
                <a href="mailto:info@connectivehealthglobal.com" style={{ color: '#1b5e6b' }}>info@connectivehealthglobal.com</a>.
                We&rsquo;re happy to provide full details about any specific affiliate relationship.
              </p>

              <p className="text-xs italic" style={{ color: '#8a8275' }}>
                Last updated: June 29, 2026
              </p>
            </div>
          </div>
        </section>

        {/* Key principles grid */}
        <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-serif text-2xl font-medium" style={{ color: '#0f3b45' }}>
            Our Key Principles
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {keyPoints.map((point) => (
              <div key={point.title} className="card">
                <span className="text-2xl">{point.icon}</span>
                <h3 className="mt-3 text-sm font-semibold" style={{ color: '#1a1d23' }}>{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: '#3a3f4b' }}>{point.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Evidence rubric link */}
        <section className="pb-16">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <div className="rounded-lg p-8" style={{ background: '#f4f0e8' }}>
              <h2 className="font-serif text-xl font-medium" style={{ color: '#0f3b45' }}>Learn About Our Evidence Rubric</h2>
              <p className="mt-3 text-sm" style={{ color: '#3a3f4b' }}>
                Understand exactly how we assign evidence ratings — from Clinical Trial down to Listing Only.
              </p>
              <Link href="/about#rubric" className="btn-primary mt-6 inline-block">
                View Evidence Rubric
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
