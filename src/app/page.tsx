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
  { name: 'Autoimmune', slug: 'autoimmune', count: '31', icon: '🛡️' },
]

const principles = [
  {
    title: 'Evidence First',
    description: 'Every listing is rated using our published evidence rubric. Nothing published without a source.',
    icon: '🔬',
  },
  {
    title: 'Clinically Grounded',
    description: 'Research and clinical trials are the foundation. Treatments and providers build on that evidence.',
    icon: '📋',
  },
  {
    title: 'Trust That Compounds',
    description: 'Every evidence rating change is timestamped on a public ledger. Verifiable integrity, not claims.',
    icon: '⛓️',
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
        .eq('content_type_id', 1)
        .eq('is_published', true)
        .limit(3)
    : { data: null }

  return (
    <div className="min-h-screen" style={{ background: '#fdfaf5' }}>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #f4f0e8, #fdfaf5)' }}>
          <div className="relative mx-auto max-w-4xl px-4 pb-20 pt-16 text-center sm:pb-28 sm:pt-24 lg:px-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ border: '1px solid #f2d9b3', background: '#f9f6ef' }}>
              <span className="h-2 w-2 rounded-full" style={{ background: '#c77d2a' }} />
              <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#c77d2a', fontSize: '0.7rem' }}>Evidence-Guided. Clinically Grounded.</span>
            </div>
            <h1 className="font-serif text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl" style={{ color: '#0f3b45' }}>
              Your guide to
              <span className="block" style={{ color: '#1b5e6b' }}> chronic illness evidence and care</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: '#3a3f4b' }}>
              A structured, evidence-graded directory of clinical research, treatments, 
              supplements, clinics, and providers. Every listing rated by our published evidence rubric.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/research"
                className="btn-primary"
              >
                Browse Research
              </Link>
              <Link
                href="/supplements"
                className="btn-secondary"
              >
                Supplement Directory
              </Link>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="py-16" style={{ background: '#f4f0e8' }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-3">
              {principles.map((principle) => (
                <div key={principle.title} className="card">
                  <span className="text-2xl">{principle.icon}</span>
                  <h3 className="mt-3 text-base font-semibold" style={{ color: '#1a1d23' }}>{principle.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: '#3a3f4b' }}>{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Condition Categories */}
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-2xl font-medium sm:text-3xl" style={{ color: '#0f3b45' }}>Browse by Condition</h2>
            <p className="mt-3" style={{ color: '#3a3f4b' }}>Evidence-graded information across the most common chronic illness categories.</p>
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
                  <h3 className="text-sm font-semibold group-hover" style={{ color: '#1a1d23' }}>{cat.name}</h3>
                  <p className="text-xs" style={{ color: '#8a8275' }}>{cat.count} listings</p>
                </div>
                <span style={{ color: '#c77d2a' }}>&rarr;</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Research */}
        {recentResearch && recentResearch.length > 0 && (
          <section className="bg-gray-50/50 border-y border-gray-100">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Recent Research</h2>
                  <p className="mt-2 text-gray-500">Latest studies and clinical evidence added to the directory.</p>
                </div>
                <Link href="/research" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
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

        {/* CTA */}
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-lg px-8 py-12 text-center sm:px-16" style={{ background: '#0f3b45' }}>
            <h2 className="font-serif text-2xl font-medium text-white sm:text-3xl">Stay informed</h2>
            <p className="mx-auto mt-3 max-w-lg" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Get the latest research updates, evidence changes, and new provider listings delivered to your inbox.
            </p>
            <Link
              href="/newsletter"
              className="btn-primary mt-8 inline-flex"
              style={{ background: '#c77d2a' }}
            >
              Subscribe to the Newsletter
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
