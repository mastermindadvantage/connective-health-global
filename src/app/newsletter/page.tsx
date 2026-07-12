'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useState } from 'react'
import Link from 'next/link'

const benefits = [
  {
    icon: '📚',
    title: 'Weekly Research Digest',
    description: 'New studies, clinical trials, and evidence updates curated from PubMed and peer-reviewed journals.',
  },
  {
    icon: '⚡',
    title: 'Evidence Change Alerts',
    description: 'Get notified when a listing\'s evidence rating changes — so you\'re always working with the latest science.',
  },
  {
    icon: '🏥',
    title: 'Provider Additions',
    description: 'New clinics, practitioners, and support services added to the directory, filtered by your interests.',
  },
  {
    icon: '🛡️',
    title: 'No Spam. Ever.',
    description: 'We never sell or share your email. You can unsubscribe at any time with one click.',
  },
]

const testimonials = [
  {
    text: 'Finally, a directory that actually grades the evidence. I can see at a glance what has real research behind it and what\'s just anecdotal.',
    author: 'Sarah M.',
    condition: 'ME/CFS',
  },
  {
    text: 'The weekly digest has helped me discover new research I would never have found on my own. Essential resource for anyone navigating chronic illness.',
    author: 'Dr. James K.',
    condition: 'Clinical Researcher',
  },
]

const evidence_strip = [
  { label: 'Listings rated', value: '324+' },
  { label: 'Research studies', value: '168' },
  { label: 'Condition categories', value: '9' },
  { label: 'Newsletter subscribers', value: 'Growing' },
]

export default function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, first_name: firstName || undefined }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
        setFirstName('')
      } else {
        const data = await res.json()
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try again.')
    }
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
              <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#c77d2a', fontSize: '0.7rem' }}>Day One — Start Today</span>
            </div>
            <h1 className="font-serif text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl" style={{ color: '#0f3b45' }}>
              Stay informed.
              <span className="block" style={{ color: '#1b5e6b' }}> Research you can trust.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: '#3a3f4b' }}>
              Get the latest chronic illness research, evidence updates, and provider listings 
              delivered to your inbox — curated and evidence-graded.
            </p>
          </div>
        </section>

        {/* Evidence strip */}
        <section className="border-y" style={{ borderColor: '#d6cebf', background: '#ffffff' }}>
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {evidence_strip.map((item) => (
                <div key={item.label} className="text-center">
                  <p className="font-serif text-2xl font-medium" style={{ color: '#1b5e6b' }}>{item.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider" style={{ color: '#8a8275' }}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subscribe form */}
        <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="card">
            <h2 className="text-lg font-semibold" style={{ color: '#1a1d23' }}>Subscribe for free</h2>
            <p className="mt-2 text-sm" style={{ color: '#3a3f4b' }}>
              Join our growing community of patients, researchers, and clinicians who rely on 
              Connective Health Global for evidence-guided chronic illness information.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="first-name" className="sr-only">First name</label>
                <input
                  id="first-name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name (optional)"
                  className="w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2"
                  style={{ borderColor: '#d6cebf', color: '#1a1d23', background: '#ffffff' }}
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2"
                  style={{ borderColor: '#d6cebf', color: '#1a1d23', background: '#ffffff' }}
                  onFocus={(e) => { e.target.style.borderColor = '#1b5e6b' }}
                  onBlur={(e) => { e.target.style.borderColor = '#d6cebf' }}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-lg px-6 py-3 text-sm font-semibold text-white transition-colors disabled:opacity-50"
                style={{ background: '#1b5e6b' }}
                onMouseEnter={(e) => { if (status !== 'loading') (e.target as HTMLElement).style.background = '#0f3b45' }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.background = '#1b5e6b' }}
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe Free'}
              </button>
            </form>

            {/* Trust signals */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs" style={{ color: '#8a8275' }}>
              <span className="flex items-center gap-1">🔒 No spam, ever</span>
              <span className="flex items-center gap-1">📧 Unsubscribe anytime</span>
              <span className="flex items-center gap-1">🏷️ Free &amp; open to all</span>
            </div>

            {status === 'success' && (
              <div className="mt-6 rounded-lg p-4 text-center" style={{ background: '#d1e6e9' }}>
                <p className="text-sm font-semibold" style={{ color: '#0f3b45' }}>You&rsquo;re subscribed! 🎉</p>
                <p className="mt-1 text-xs" style={{ color: '#3a3f4b' }}>Check your inbox for a confirmation email. Welcome to the community.</p>
              </div>
            )}
            {status === 'error' && (
              <div className="mt-6 rounded-lg p-4 text-center" style={{ background: '#fef2f2' }}>
                <p className="text-sm font-semibold" style={{ color: '#dc2626' }}>{errorMsg}</p>
              </div>
            )}
          </div>
        </section>

        {/* Benefits */}
        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-serif text-2xl font-medium" style={{ color: '#0f3b45' }}>
            What you&rsquo;ll get
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="card flex gap-4">
                <span className="text-2xl">{benefit.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold" style={{ color: '#1a1d23' }}>{benefit.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: '#3a3f4b' }}>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12" style={{ background: '#f4f0e8' }}>
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center font-serif text-2xl font-medium" style={{ color: '#0f3b45' }}>
              From our community
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.map((t, i) => (
                <div key={i} className="card">
                  <p className="text-sm italic leading-relaxed" style={{ color: '#3a3f4b' }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs" style={{ color: '#8a8275' }}>
                    <span className="font-semibold" style={{ color: '#1a1d23' }}>{t.author}</span>
                    <span>&middot;</span>
                    <span>{t.condition}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ / final CTA */}
        <section className="mx-auto max-w-2xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-xl font-medium" style={{ color: '#0f3b45' }}>Ready to stay informed?</h2>
          <p className="mt-3 text-sm" style={{ color: '#3a3f4b' }}>
            Join hundreds of patients, researchers, and clinicians who trust Connective Health Global 
            for their chronic illness evidence.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a
              href="#email"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('email')?.focus()
              }}
            >
              Subscribe Free
            </a>
            <Link href="/about#rubric" className="btn-secondary">
              Evidence Rubric
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
