'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useState } from 'react'
import Link from 'next/link'

const leadBenefits = [
  {
    icon: '📞',
    title: 'Qualified Patient Calls',
    description: 'Patients actively searching for chronic illness care are connected directly to your practice. No cold leads — every call is from someone who needs your expertise.',
  },
  {
    icon: '🎯',
    title: 'Targeted by Condition',
    description: 'Choose which conditions you want leads for — ME/CFS, Long COVID, POTS, fibromyalgia, MCAS, and more. You only get relevant inquiries.',
  },
  {
    icon: '📊',
    title: 'Transparent Analytics',
    description: 'See exactly how many calls you receive, their source, and how they convert. Monthly performance reports included with every plan.',
  },
  {
    icon: '💳',
    title: 'Pay-Per-Call or Subscription',
    description: 'Choose between a monthly retainer for predictable marketing spend or a pay-per-call model where you only pay for qualified connections.',
  },
  {
    icon: '🏷️',
    title: 'Evidence-Gated Quality',
    description: 'Patients come to Connective Health Global because they trust evidence-based information. Your listing\'s evidence tier is your credibility signal.',
  },
  {
    icon: '🔄',
    title: 'Seamless Intake Integration',
    description: 'Integrate with your existing practice management system. We can forward lead details directly to your scheduling team.',
  },
]

const pricingPlans = [
  {
    name: 'Pay-Per-Call',
    price: 'From $15',
    period: '/ qualified call',
    description: 'Only pay when a qualified patient reaches out. No monthly commitment.',
    features: [
      'No setup fee',
      'Real-time call notifications',
      'Call recording available',
      'Monthly analytics report',
      'Cancel anytime, no penalty',
    ],
  },
  {
    name: 'Monthly Retainer',
    price: '$199',
    period: '/month',
    description: 'Consistent lead flow with priority placement and dedicated support.',
    features: [
      'Up to 20 qualified leads/month',
      'Priority listing in search results',
      'Highlighted in condition pages',
      'Monthly strategy call',
      'Dedicated account manager',
    ],
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For multi-location practices and integrated care networks.',
    features: [
      'Unlimited leads',
      'Multi-location management',
      'Custom integration support',
      'Quarterly business reviews',
      'White-label options available',
      'Priority API access',
    ],
  },
]

export default function LeadGenPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    practiceName: '',
    plan: 'pay-per-call' as string,
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    // In production this would post to a CRM endpoint
    setTimeout(() => {
      setSubmitted(true)
      setSending(false)
    }, 800)
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
              Patient Leads.
              <span className="block" style={{ color: '#1b5e6b' }}>On Demand.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: '#3a3f4b' }}>
              Get qualified patient inquiries from people actively searching for chronic illness specialists. 
              Pay-per-call or monthly — you choose. Every lead is evidence-informed and pre-qualified by condition.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <a href="#pricing" className="btn-primary">View Plans</a>
              <a href="#inquiry-form" className="btn-secondary">Get Started</a>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="border-y" style={{ borderColor: '#d6cebf', background: '#ffffff' }}>
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {[
                { label: 'Monthly visitors', value: '5,000+' },
                { label: 'Condition categories', value: '9' },
                { label: 'Chronic illness focus', value: '100%' },
                { label: 'Avg. call quality rating', value: '4.8/5' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="font-serif text-2xl font-medium" style={{ color: '#1b5e6b' }}>{item.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider" style={{ color: '#8a8275' }}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits grid */}
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-serif text-2xl font-medium sm:text-3xl" style={{ color: '#0f3b45' }}>
            Why Our Lead Program Works
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadBenefits.map((b) => (
              <div key={b.title} className="card">
                <span className="text-2xl">{b.icon}</span>
                <h3 className="mt-3 text-sm font-semibold" style={{ color: '#1a1d23' }}>{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: '#3a3f4b' }}>{b.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16" style={{ background: '#f4f0e8' }}>
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-10 text-center font-serif text-2xl font-medium sm:text-3xl" style={{ color: '#0f3b45' }}>
              How It Works
            </h2>
            <div className="grid gap-6 md:grid-cols-4">
              {[
                { step: '1', title: 'Choose Your Plan', desc: 'Select pay-per-call or monthly retainer. No lock-in contracts.' },
                { step: '2', title: 'Set Your Conditions', desc: 'Choose the chronic illness categories you specialise in.' },
                { step: '3', title: 'Get Matched', desc: 'Patients searching our directory are matched to your profile.' },
                { step: '4', title: 'Receive Leads', desc: 'Qualified inquiries come via call, email, or your practice system.' },
              ].map((step) => (
                <div key={step.step} className="card text-center">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: '#1b5e6b' }}>
                    {step.step}
                  </span>
                  <h3 className="mt-3 text-sm font-semibold" style={{ color: '#1a1d23' }}>{step.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed" style={{ color: '#3a3f4b' }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-serif text-2xl font-medium sm:text-3xl" style={{ color: '#0f3b45' }}>
            Pricing &amp; Plans
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`card relative flex flex-col ${plan.featured ? 'ring-2' : ''}`}
                style={{ borderColor: plan.featured ? '#c77d2a' : '#d6cebf' }}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-0.5 text-xs font-semibold uppercase tracking-wider text-white"
                    style={{ background: '#c77d2a' }}>Recommended</span>
                )}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold" style={{ color: '#1a1d23' }}>{plan.name}</h3>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="font-serif text-3xl font-medium" style={{ color: '#1b5e6b' }}>{plan.price}</span>
                    <span className="text-sm" style={{ color: '#8a8275' }}>{plan.period}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: '#3a3f4b' }}>{plan.description}</p>
                </div>
                <ul className="mb-6 flex-1 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: '#3a3f4b' }}>
                      <span className="mt-0.5 shrink-0" style={{ color: '#1b5e6b' }}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="#inquiry-form" className={`btn-primary w-full text-center ${plan.featured ? '' : ''}`}
                  style={plan.featured ? { background: '#c77d2a' } : {}}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial callout */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="callout">
            <p className="callout-label">Provider Spotlight</p>
            <p className="text-sm italic leading-relaxed" style={{ color: '#1a1d23' }}>
              &ldquo;Since joining the lead program, we&rsquo;ve seen a steady stream of patients who are already educated about their condition. 
              They come in ready for treatment, not for a diagnosis shopping trip. It&rsquo;s transformed our intake quality.&rdquo;
            </p>
            <p className="mt-3 text-xs font-semibold" style={{ color: '#1b5e6b' }}>— Dr. Anna W., ME/CFS Specialist</p>
          </div>
        </section>

        {/* Inquiry form */}
        <section id="inquiry-form" className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="card">
            <h2 className="font-serif text-2xl font-medium" style={{ color: '#0f3b45' }}>
              {submitted ? 'We&rsquo;ll Be in Touch' : 'Get Started with Patient Leads'}
            </h2>
            <p className="mt-2 text-sm" style={{ color: '#3a3f4b' }}>
              {submitted
                ? 'Thank you for your interest. Our provider relations team will reach out within 1&ndash;2 business days to discuss your lead generation setup.'
                : 'Fill out the form below and we&rsquo;ll walk you through the options. No commitment required.'}
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="lg-name" className="mb-1 block text-sm font-medium" style={{ color: '#1a1d23' }}>Your Name *</label>
                    <input id="lg-name" name="name" required value={formData.name} onChange={handleChange}
                      className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2"
                      style={{ borderColor: '#d6cebf', color: '#1a1d23', background: '#ffffff' }}
                      onFocus={(e) => e.target.style.borderColor = '#1b5e6b'}
                      onBlur={(e) => e.target.style.borderColor = '#d6cebf'}
                    />
                  </div>
                  <div>
                    <label htmlFor="lg-email" className="mb-1 block text-sm font-medium" style={{ color: '#1a1d23' }}>Email *</label>
                    <input id="lg-email" name="email" type="email" required value={formData.email} onChange={handleChange}
                      className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2"
                      style={{ borderColor: '#d6cebf', color: '#1a1d23', background: '#ffffff' }}
                      onFocus={(e) => e.target.style.borderColor = '#1b5e6b'}
                      onBlur={(e) => e.target.style.borderColor = '#d6cebf'}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="lg-phone" className="mb-1 block text-sm font-medium" style={{ color: '#1a1d23' }}>Phone</label>
                    <input id="lg-phone" name="phone" type="tel" value={formData.phone} onChange={handleChange}
                      className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2"
                      style={{ borderColor: '#d6cebf', color: '#1a1d23', background: '#ffffff' }}
                      onFocus={(e) => e.target.style.borderColor = '#1b5e6b'}
                      onBlur={(e) => e.target.style.borderColor = '#d6cebf'}
                    />
                  </div>
                  <div>
                    <label htmlFor="lg-practiceName" className="mb-1 block text-sm font-medium" style={{ color: '#1a1d23' }}>Practice Name *</label>
                    <input id="lg-practiceName" name="practiceName" required value={formData.practiceName} onChange={handleChange}
                      className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2"
                      style={{ borderColor: '#d6cebf', color: '#1a1d23', background: '#ffffff' }}
                      onFocus={(e) => e.target.style.borderColor = '#1b5e6b'}
                      onBlur={(e) => e.target.style.borderColor = '#d6cebf'}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lg-plan" className="mb-1 block text-sm font-medium" style={{ color: '#1a1d23' }}>Interested In</label>
                  <select id="lg-plan" name="plan" value={formData.plan} onChange={handleChange}
                    className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: '#d6cebf', color: '#1a1d23', background: '#ffffff' }}
                    onFocus={(e) => e.target.style.borderColor = '#1b5e6b'}
                    onBlur={(e) => e.target.style.borderColor = '#d6cebf'}
                  >
                    <option value="pay-per-call">Pay-Per-Call</option>
                    <option value="monthly">Monthly Retainer ($199/mo)</option>
                    <option value="enterprise">Enterprise (Custom)</option>
                    <option value="not-sure">Not Sure Yet</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="lg-message" className="mb-1 block text-sm font-medium" style={{ color: '#1a1d23' }}>Specialities / Conditions</label>
                  <textarea id="lg-message" name="message" rows={2} value={formData.message} onChange={handleChange}
                    placeholder="e.g., ME/CFS, POTS, Long COVID, MCAS..."
                    className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: '#d6cebf', color: '#1a1d23', background: '#ffffff' }}
                    onFocus={(e) => e.target.style.borderColor = '#1b5e6b'}
                    onBlur={(e) => e.target.style.borderColor = '#d6cebf'}
                  />
                </div>
                <button type="submit" disabled={sending} className="btn-primary w-full">
                  {sending ? 'Sending...' : 'Get Started'}
                </button>
              </form>
            ) : (
              <div className="mt-6 rounded-lg p-6 text-center" style={{ background: '#d1e6e9' }}>
                <p className="text-lg font-semibold" style={{ color: '#0f3b45' }}>🎉 Inquiry Received</p>
                <p className="mt-2 text-sm" style={{ color: '#3a3f4b' }}>
                  We&apos;ll reach out to <strong>{formData.email}</strong> within 1&ndash;2 business days.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-3xl px-4 pb-16 text-center sm:px-6 lg:px-8">
          <div className="rounded-lg px-8 py-12" style={{ background: 'linear-gradient(135deg, #0f3b45, #1b5e6b)' }}>
            <h2 className="font-serif text-2xl font-medium text-white sm:text-3xl">Already a listed provider?</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
              You can add lead generation to your existing listing. Contact us to enable the pay-per-call feature on your current profile.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link href="/providers/claim" className="btn-primary" style={{ background: '#c77d2a', color: '#ffffff' }}>
                Claim or Upgrade Listing
              </Link>
              <a href="mailto:info@connectivehealthglobal.com" className="rounded px-5 py-2.5 text-sm font-semibold transition-colors"
                style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff' }}>
                Email Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
