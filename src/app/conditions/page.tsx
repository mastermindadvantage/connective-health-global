import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Browse by Condition',
  description: 'Explore evidence-graded research, treatments, supplements, and providers organised by chronic illness condition category.',
  keywords: ['conditions', 'ME/CFS', 'Long COVID', 'POTS', 'fibromyalgia', 'MCAS', 'EDS', 'autoimmune', 'chronic illness'],
}

const categories = [
  { name: 'ME/CFS', slug: 'mecfs', count: '35', icon: '🫁', desc: 'Myalgic Encephalomyelitis / Chronic Fatigue Syndrome — research, treatments, and specialists for this complex neuroimmune condition.' },
  { name: 'Long COVID', slug: 'long-covid', count: '28', icon: '🦠', desc: 'Post-COVID condition resources, clinical research, treatment protocols, and specialist providers.' },
  { name: 'POTS', slug: 'pots', count: '22', icon: '💓', desc: 'Postural Orthostatic Tachycardia Syndrome — evidence-based management, treatments, and dysautonomia specialists.' },
  { name: 'Fibromyalgia', slug: 'fibromyalgia', count: '19', icon: '🤕', desc: 'Fibromyalgia research, pain management protocols, and specialist care for this central sensitisation syndrome.' },
  { name: 'MCAS', slug: 'mcas', count: '15', icon: '🔬', desc: 'Mast Cell Activation Syndrome — diagnosis, treatment protocols, and management resources.' },
  { name: 'EDS/HSD', slug: 'eds-hsd', count: '12', icon: '🦴', desc: 'Ehlers-Danlos Syndromes and Hypermobility Spectrum Disorders — connective tissue disorder care and research.' },
  { name: 'Autoimmune', slug: 'autoimmune', count: '31', icon: '🛡️', desc: 'Autoimmune condition research, treatments, and clinical resources across multiple diagnoses.' },
  { name: 'Lyme Disease', slug: 'lyme-disease', count: '8', icon: '🪲', desc: 'Lyme disease research, treatment protocols, and tick-borne illness resources and specialists.' },
  { name: 'General', slug: 'general-chronic-illness', count: '20', icon: '📋', desc: 'Cross-condition resources applicable to multiple chronic illness categories, including general wellness and foundational research.' },
]

export default function ConditionsPage() {
  return (
    <div className="min-h-screen" style={{ background: '#fdfaf5' }}>
      <Header />

      <main>
        {/* Header */}
        <section className="relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #f4f0e8, #fdfaf5)' }}>
          <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-16 text-center sm:pb-20 sm:pt-24 lg:px-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ border: '1px solid #f2d9b3', background: '#f9f6ef' }}>
              <span className="h-2 w-2 rounded-full" style={{ background: '#c77d2a' }} />
              <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#c77d2a', fontSize: '0.7rem' }}>Browse by condition</span>
            </div>
            <h1 className="font-serif text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl" style={{ color: '#0f3b45' }}>
              Conditions &amp; <span style={{ color: '#1b5e6b' }}>Categories</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: '#3a3f4b' }}>
              Find evidence-graded information organised by condition. Each category includes research studies, 
              treatment protocols, supplements, clinics, and providers — all rated by our published evidence rubric.
            </p>
          </div>
        </section>

        {/* Condition Cards */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/conditions/${cat.slug}`}
                className="card group relative flex flex-col"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-3xl" style={{ background: '#f4f0e8' }}>
                    {cat.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold group-hover" style={{ color: '#1a1d23' }}>{cat.name}</h3>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider" style={{ color: '#8a8275' }}>
                      {cat.count} listings
                    </p>
                  </div>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed" style={{ color: '#3a3f4b' }}>
                  {cat.desc}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium" style={{ color: '#1b5e6b' }}>
                  Browse directory
                  <span style={{ color: '#c77d2a' }}>&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Info box */}
        <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-lg p-8" style={{ background: '#0f3b45', color: '#ffffff' }}>
            <h2 className="font-serif text-xl font-medium text-white sm:text-2xl">Don&rsquo;t see your condition?</h2>
            <p className="mt-3 leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
              We&rsquo;re adding new condition categories regularly. If you&rsquo;d like to suggest a category or 
              submit research for a condition not yet listed, please contact us.
            </p>
            <div className="mt-6 flex gap-4">
              <Link
                href="/about#contact"
                className="rounded px-5 py-2.5 text-sm font-semibold transition-colors"
                style={{ background: '#c77d2a', color: '#ffffff' }}
              >
                Suggest a Category
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
