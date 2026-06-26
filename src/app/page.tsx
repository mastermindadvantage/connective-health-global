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
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Serene Hero Section - inspired by V0 template */}
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-100/40 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium text-emerald-700">Evidence-Guided. Clinically Grounded.</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Your guide to
                <span className="text-emerald-600"> chronic illness</span> evidence and care
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-500 sm:text-xl">
                A structured, evidence-graded directory of clinical research, treatments, 
                supplements, clinics, and providers. Built on trust. Verified by evidence.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/conditions"
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-emerald-600 px-8 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700 sm:w-auto"
                >
                  Explore Conditions
                </Link>
                <Link
                  href="/research"
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-8 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 sm:w-auto"
                >
                  Browse Research
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="border-y border-gray-100 bg-gray-50/50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              {principles.map((principle) => (
                <div key={principle.title} className="rounded-xl bg-white p-6 shadow-sm">
                  <span className="text-2xl">{principle.icon}</span>
                  <h3 className="mt-3 text-base font-semibold text-gray-900">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Condition Categories */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Browse by Condition</h2>
            <p className="mt-3 text-gray-500">Evidence-graded information across the most common chronic illness categories.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/conditions/${cat.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-emerald-200 hover:shadow-sm"
              >
                <span className="text-2xl">{cat.icon}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-emerald-700">{cat.name}</h3>
                  <p className="text-xs text-gray-400">{cat.count} listings</p>
                </div>
                <span className="text-gray-300 group-hover:text-emerald-500">&rarr;</span>
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
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 px-8 py-12 text-center text-white shadow-xl sm:px-16">
            <h2 className="text-2xl font-bold sm:text-3xl">Stay informed</h2>
            <p className="mx-auto mt-3 max-w-lg text-emerald-100">
              Get the latest research updates, evidence changes, and new provider listings delivered to your inbox.
            </p>
            <Link
              href="/newsletter"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 text-sm font-semibold text-emerald-700 shadow-lg transition-all hover:bg-emerald-50"
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
