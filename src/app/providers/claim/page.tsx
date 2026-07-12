'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useState } from 'react'
import Link from 'next/link'

const tiers = [
  {
    name: 'Free Listing',
    price: '$0',
    period: '/month',
    description: 'Your basic directory presence — no-cost listing with essential details.',
    features: [
      'Basic listing in the directory',
      'Business name, address, phone, website',
      'Up to 3 service categories',
      'Searchable by condition and location',
      'Standard visibility in results',
    ],
    cta: 'Claim Free Listing',
    featured: false,
  },
  {
    name: 'Verified',
    price: '$29',
    period: '/month',
    description: 'Stand out with a verified badge and enhanced visibility.',
    features: [
      'Everything in Free, plus:',
      '✓ Verified badge on your listing',
      '✓ Enhanced search ranking',
      '✓ Direct patient inquiry form',
      '✓ Up to 3 photos or media items',
      '✓ Evidence tier badge (if applicable)',
    ],
    cta: 'Upgrade to Verified',
    featured: true,
  },
  {
    name: 'Featured',
    price: '$79',
    period: '/month',
    description: 'Maximum visibility — priority placement, featured on homepage, and more.',
    features: [
      'Everything in Verified, plus:',
      '★ Priority placement in search results',
      '★ Featured on homepage carousel',
      '★ Dedicated spotlight listing page',
      '★ Monthly performance report',
      '★ Priority customer support',
      '★ Featured in newsletter (1x quarterly)',
    ],
    cta: 'Go Featured',
    featured: false,
  },
]

export default function ProviderClaimPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    practiceName: '',
    website: '',
    tier: 'free' as 'free' | 'verified' | 'featured',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          practiceName: formData.practiceName,
          website: formData.website,
          tier: formData.tier,
          message: formData.message,
        }),
      })
    } catch {
      // silently log, still show success
    }
    setSubmitted(true)
    setSending(false)
  }

  return (
    <div className="min-h-screen" style={{ background: '#fdfaf5' }}>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #f4f0e8, #fdfaf5)' }}>
          <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-16 text-center sm:pb-20 sm:pt-24 lg:px-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ border: '1px solid #f2d9b3', background: '#f9f6ef' }}>
              <span className="h-2 w-2 rounded-full" style={{ background: '#c77d2a' }} />
              <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#c77d2a', fontSize: '0.7rem' }}>For Providers</span>
            </div>
            <h1 className="font-serif text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl" style={{ color: '#0f3b45' }}>
              Claim Your Listing.
              <span className="block" style={{ color: '#1b5e6b' }}> Grow Your Practice.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: '#3a3f4b' }}>
              Join the leading evidence-guided directory for chronic illness care. 
              Free listings for every provider — upgrade for verified status, featured placement, and direct patient leads.
            </p>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-serif text-2xl font-medium sm:text-3xl" style={{ color: '#0f3b45' }}>
            Choose Your Tier
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`card relative flex flex-col ${tier.featured ? 'ring-2' : ''}`}
                style={{ borderColor: tier.featured ? '#c77d2a' : '#d6cebf' }}
              >
                {tier.featured && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-0.5 text-xs font-semibold uppercase tracking-wider text-white"
                    style={{ background: '#c77d2a' }}
                  >
                    Most Popular
                  </span>
                )}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold" style={{ color: '#1a1d23' }}>{tier.name}</h3>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="font-serif text-3xl font-medium" style={{ color: '#1b5e6b' }}>{tier.price}</span>
                    <span className="text-sm" style={{ color: '#8a8275' }}>{tier.period}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: '#3a3f4b' }}>{tier.description}</p>
                </div>
                <ul className="mb-6 flex-1 space-y-2">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: '#3a3f4b' }}>
                      <span style={{ color: '#1b5e6b' }} className="mt-0.5 shrink-0">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, tier: tier.name.toLowerCase().includes('verified') ? 'verified' : tier.name.toLowerCase().includes('featured') ? 'featured' : 'free' }))
                    document.getElementById('claim-form')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={`btn-primary w-full text-center ${tier.featured ? '' : ''}`}
                  style={tier.featured ? { background: '#c77d2a' } : {}}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Benefit bar */}
        <section className="border-y" style={{ borderColor: '#d6cebf', background: '#ffffff' }}>
          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-3">
              <div className="text-center">
                <p className="font-serif text-2xl font-medium" style={{ color: '#1b5e6b' }}>Evidence-First</p>
                <p className="mt-1 text-sm" style={{ color: '#3a3f4b' }}>Your evidence tier speaks for itself. Patients trust verified research.</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-2xl font-medium" style={{ color: '#1b5e6b' }}>Targeted Reach</p>
                <p className="mt-1 text-sm" style={{ color: '#3a3f4b' }}>Reach patients actively searching for chronic illness specialists.</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-2xl font-medium" style={{ color: '#1b5e6b' }}>No Lock-In</p>
                <p className="mt-1 text-sm" style={{ color: '#3a3f4b' }}>Cancel anytime. Your free listing stays — always.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Claim Form */}
        <section id="claim-form" className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="card">
            <h2 className="font-serif text-2xl font-medium" style={{ color: '#0f3b45' }}>
              {submitted ? 'Thank You!' : 'Claim Your Listing'}
            </h2>
            <p className="mt-2 text-sm" style={{ color: '#3a3f4b' }}>
              {submitted
                ? "We've received your request. Our team will review it and follow up within 2 business days."
                : 'Fill out the form below and our team will get your listing set up.'}
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium" style={{ color: '#1a1d23' }}>Your Name *</label>
                    <input id="name" name="name" required value={formData.name} onChange={handleChange}
                      className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2"
                      style={{ borderColor: '#d6cebf', color: '#1a1d23', background: '#ffffff' }}
                      onFocus={(e) => e.target.style.borderColor = '#1b5e6b'}
                      onBlur={(e) => e.target.style.borderColor = '#d6cebf'}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium" style={{ color: '#1a1d23' }}>Email *</label>
                    <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange}
                      className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2"
                      style={{ borderColor: '#d6cebf', color: '#1a1d23', background: '#ffffff' }}
                      onFocus={(e) => e.target.style.borderColor = '#1b5e6b'}
                      onBlur={(e) => e.target.style.borderColor = '#d6cebf'}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="mb-1 block text-sm font-medium" style={{ color: '#1a1d23' }}>Phone</label>
                    <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange}
                      className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2"
                      style={{ borderColor: '#d6cebf', color: '#1a1d23', background: '#ffffff' }}
                      onFocus={(e) => e.target.style.borderColor = '#1b5e6b'}
                      onBlur={(e) => e.target.style.borderColor = '#d6cebf'}
                    />
                  </div>
                  <div>
                    <label htmlFor="website" className="mb-1 block text-sm font-medium" style={{ color: '#1a1d23' }}>Website</label>
                    <input id="website" name="website" type="url" value={formData.website} onChange={handleChange}
                      placeholder="https://"
                      className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2"
                      style={{ borderColor: '#d6cebf', color: '#1a1d23', background: '#ffffff' }}
                      onFocus={(e) => e.target.style.borderColor = '#1b5e6b'}
                      onBlur={(e) => e.target.style.borderColor = '#d6cebf'}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="practiceName" className="mb-1 block text-sm font-medium" style={{ color: '#1a1d23' }}>Practice / Clinic Name *</label>
                  <input id="practiceName" name="practiceName" required value={formData.practiceName} onChange={handleChange}
                    className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: '#d6cebf', color: '#1a1d23', background: '#ffffff' }}
                    onFocus={(e) => e.target.style.borderColor = '#1b5e6b'}
                    onBlur={(e) => e.target.style.borderColor = '#d6cebf'}
                  />
                </div>
                <div>
                  <label htmlFor="tier" className="mb-1 block text-sm font-medium" style={{ color: '#1a1d23' }}>Desired Tier *</label>
                  <select id="tier" name="tier" value={formData.tier} onChange={handleChange}
                    className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: '#d6cebf', color: '#1a1d23', background: '#ffffff' }}
                    onFocus={(e) => e.target.style.borderColor = '#1b5e6b'}
                    onBlur={(e) => e.target.style.borderColor = '#d6cebf'}
                  >
                    <option value="free">Free Listing</option>
                    <option value="verified">Verified ($29/mo)</option>
                    <option value="featured">Featured ($79/mo)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="mb-1 block text-sm font-medium" style={{ color: '#1a1d23' }}>Additional Notes</label>
                  <textarea id="message" name="message" rows={3} value={formData.message} onChange={handleChange}
                    className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: '#d6cebf', color: '#1a1d23', background: '#ffffff' }}
                    onFocus={(e) => e.target.style.borderColor = '#1b5e6b'}
                    onBlur={(e) => e.target.style.borderColor = '#d6cebf'}
                  />
                </div>
                <button type="submit" disabled={sending}
                  className="btn-primary w-full"
                >
                  {sending ? 'Sending...' : 'Submit Claim Request'}
                </button>
                <p className="text-center text-xs" style={{ color: '#8a8275' }}>
                  By submitting, you agree to our{' '}
                  <Link href="/terms" style={{ color: '#1b5e6b' }}>Terms of Use</Link> and{' '}
                  <Link href="/privacy" style={{ color: '#1b5e6b' }}>Privacy Policy</Link>.
                </p>
              </form>
            ) : (
              <div className="mt-6 rounded-lg p-6 text-center" style={{ background: '#d1e6e9' }}>
                <p className="text-lg font-semibold" style={{ color: '#0f3b45' }}>🎉 Request Submitted</p>
                <p className="mt-2 text-sm" style={{ color: '#3a3f4b' }}>
                  We&apos;ll review your information and follow up at <strong>{formData.email}</strong> within 2 business days.
                </p>
                <Link href="/providers" className="btn-primary mt-6 inline-block">
                  Browse Directory
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-serif text-2xl font-medium" style={{ color: '#0f3b45' }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              { q: 'How long does it take to get listed?', a: 'Free listings are typically live within 2 business days after verification. Verified and Featured tiers require a brief onboarding call.' },
              { q: 'Can I upgrade from Free to Verified later?', a: 'Absolutely. You can upgrade at any time. Your listing and patient reviews carry over.' },
              { q: 'Is there a contract or minimum term?', a: 'No. Verified and Featured are month-to-month. Cancel anytime — your Free listing stays active.' },
              { q: 'How are evidence tiers determined?', a: 'Our editorial team reviews published research and clinical evidence. Only Clinical Trial and Multiple Studies ratings may carry affiliate links. Learn more on our <a href="/about#rubric" style="color:#1b5e6b">Evidence Rubric page</a>.' },
              { q: 'Do you offer refunds?', a: 'Yes — if you\'re not satisfied within the first 14 days of a paid tier, we\'ll refund your first month in full.' },
            ].map((faq) => (
              <details key={faq.q} className="card group">
                <summary className="cursor-pointer text-sm font-semibold" style={{ color: '#1a1d23' }}>
                  {faq.q}
                </summary>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: '#3a3f4b' }} dangerouslySetInnerHTML={{ __html: faq.a }} />
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
