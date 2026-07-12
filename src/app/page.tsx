import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ListingCard } from '@/components/ListingCard'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const categories = [
  { name: 'ME/CFS', slug: 'mecfs', count: '35', icon: '🫁' },
  { name: 'Long COVID', slug: 'long-covid', count: '28', icon: '🦠' },
  { name: 'POTS', slug: 'pots', count: '22', icon: '💓' },
  { name: 'Fibromyalgia', slug: 'fibromyalgia', count: '19', icon: '🤕' },
  { name: 'MCAS', slug: 'mcas', count: '15', icon: '🔬' },
  { name: 'EDS/HSD', slug: 'eds-hsd', count: '12', icon: '🦴' },
  { name: 'Autoimmune', slug: 'autoimmune', count: '31', icon: '🛡️' },
  { name: 'Lyme Disease', slug: 'lyme-disease', count: '8', icon: '🪲' },
  { name: 'General', slug: 'general-chronic-illness', count: '20', icon: '📋' },
]

const steps = [
  {
    title: '1. Search or Browse',
    description: 'Find what you need by condition, treatment type, or keyword. Our directory covers research, treatments, supplements, clinics, and providers.',
    icon: '🔍',
  },
  {
    title: '2. Check the Evidence',
    description: 'Every listing has an evidence tier — Clinical Trial, Multiple Studies, Patient Reports, Emerging, or Listing Only. Click any tier badge to learn what it means.',
    icon: '📊',
  },
  {
    title: '3. Read & Decide',
    description: 'Review original sources, compare options, and discuss with your healthcare provider. We link directly to the evidence so you can verify it yourself.',
    icon: '📖',
  },
  {
    title: '4. Stay Updated',
    description: 'Subscribe to the newsletter for new research, evidence changes, and provider additions. Never miss an update that matters to your health.',
    icon: '📬',
  },
]

const principles = [
  {
    title: 'Research Authority',
    description: 'We prioritise peer-reviewed research and clinical evidence. Every listing above "Listing Only" links to its original source so you can verify it yourself.',
    icon: '🔬',
  },
  {
    title: 'The Evidence Gate',
    description: 'Only Clinical Trial or Multiple Studies ratings may carry affiliate links. Revenue follows evidence — not the other way around.',

    icon: '⛓️',
  },
  {
    title: 'Revenue = Oxygen, Not Mission',
    description: 'Affiliate income funds operations and keeps the directory free. It never determines what gets listed or how it\'s rated.',
    icon: '💚',
  },
]

export default async function HomePage() {
  // Fetch featured/published listings for the homepage
  const { data: featuredListings } = supabase
    ? await supabase
        .from('listings')
        .select('*')
        .eq('is_published', true)
        .in('listing_tier', ['featured', 'verified'])
        .limit(6)
    : { data: null }

  const { data: recentResearch } = supabase
    ? await supabase
        .from('listings')
        .select('*')
        .in('content_type_id', [1, 8])
        .eq('is_published', true)
        .limit(3)
    : { data: null }

  return (
    <div className="min-h-screen" style={{ background: '#f5f1ec' }}>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #eae5da, #f5f1ec)' }}>
          <div className="relative mx-auto max-w-4xl px-4 pb-20 pt-16 text-center sm:pb-28 sm:pt-24 lg:px-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ border: '1px solid #eae5da', background: '#f5f1ec' }}>
              <span className="h-2 w-2 rounded-full" style={{ background: '#c1a482' }} />
              <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#c1a482', fontSize: '0.7rem' }}>A Global Directory to Navigate Chronic Illness</span>
            </div>
            <h1 className="font-serif text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl" style={{ color: '#343434' }}>
              A structured, evidence-graded,
              <span className="block" style={{ color: '#756b62' }}> living database</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: '#756b62' }}>
              A structured, evidence-graded, living database of clinical research, 
              treatments, clinics, providers, and supplements.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/conditions/long-covid"
                className="rounded-lg px-6 py-3 text-sm font-semibold transition-colors"
                style={{ background: '#3e5b4f', color: '#ffffff' }}
              >
                Long COVID
              </Link>
              <Link
                href="/conditions/mecfs"
                className="rounded-lg px-6 py-3 text-sm font-semibold transition-colors"
                style={{ background: '#3e5b4f', color: '#ffffff' }}
              >
                ME/CFS
              </Link>
              <Link
                href="/conditions/pots"
                className="rounded-lg px-6 py-3 text-sm font-semibold transition-colors"
                style={{ background: '#3e5b4f', color: '#ffffff' }}
              >
                POTS
              </Link>
              <Link
                href="/conditions/fibromyalgia"
                className="rounded-lg px-6 py-3 text-sm font-semibold transition-colors"
                style={{ background: '#3e5b4f', color: '#ffffff' }}
              >
                Fibromyalgia
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16" style={{ background: '#ffffff' }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="font-serif text-2xl font-medium sm:text-3xl" style={{ color: '#756b62' }}>
                How It Works
              </h2>
              <p className="mt-3" style={{ color: '#756b62' }}>
                From search to informed decision — in four steps.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-4">
              {steps.map((step) => (
                <div key={step.title} className="card text-center">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full text-xl" style={{ background: '#eae5da' }}>
                    {step.icon}
                  </span>
                  <h3 className="mt-3 text-base font-semibold" style={{ color: '#343434' }}>{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: '#756b62' }}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="py-16" style={{ background: '#eae5da' }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-10 text-center font-serif text-2xl font-medium sm:text-3xl" style={{ color: '#756b62' }}>
              Our Principles
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {principles.map((principle) => (
                <div key={principle.title} className="card">
                  <span className="text-2xl">{principle.icon}</span>
                  <h3 className="mt-3 text-base font-semibold" style={{ color: '#343434' }}>{principle.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: '#756b62' }}>{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Condition Categories */}
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-2xl font-medium sm:text-3xl" style={{ color: '#756b62' }}>Browse by Condition</h2>
            <p className="mt-3" style={{ color: '#756b62' }}>Evidence-graded information across the most common chronic illness categories.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat: any) => (
              <Link
                key={cat.slug}
                href={`/conditions/${cat.slug}`}
                className="card group flex items-center gap-4 p-5"
              >
                <span className="text-2xl">{cat.icon}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold group-hover" style={{ color: '#343434' }}>{cat.name}</h3>
                  <p className="text-xs" style={{ color: '#756b62' }}>{cat.count} listings</p>
                </div>
                <span style={{ color: '#c1a482' }}>&rarr;</span>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/conditions" className="text-sm font-medium" style={{ color: '#756b62' }}>
              View all conditions &rarr;
            </Link>
          </div>
        </section>

        {/* Recent Research */}
        {recentResearch && recentResearch.length > 0 && (
          <section className="py-16" style={{ background: '#eae5da' }}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-medium" style={{ color: '#756b62' }}>Recent Research</h2>
                  <p className="mt-2" style={{ color: '#756b62' }}>Latest studies and clinical evidence added to the directory.</p>
                </div>
                <Link href="/research" className="text-sm font-medium" style={{ color: '#756b62' }}>
                  View all &rarr;
                </Link>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {recentResearch.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-lg px-8 py-12 text-center sm:px-16" style={{ background: 'linear-gradient(135deg, #343434, #756b62)' }}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <span className="h-2 w-2 rounded-full" style={{ background: '#c1a482' }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.8)' }}>Day One — Start Today</span>
            </div>
            <h2 className="font-serif text-2xl font-medium text-white sm:text-3xl">Stay informed, for free</h2>
            <p className="mx-auto mt-3 max-w-lg" style={{ color: 'rgba(255,255,255,0.85)' }}>
              Get weekly research updates, evidence changes, and new provider listings 
              delivered to your inbox. No spam, just evidence.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/newsletter"
                className="btn-primary inline-flex"
                style={{ background: '#c1a482', color: '#343434' }}
              >
                Subscribe to the Newsletter
              </Link>
              <Link
                href="/about#rubric"
                className="rounded px-5 py-2.5 text-sm font-semibold transition-colors"
                style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff' }}
              >
                Our Evidence Rubric
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
