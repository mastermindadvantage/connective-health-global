import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ListingCard } from '@/components/ListingCard'
import { supabase } from '@/lib/supabase'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research Library',
  description: 'Curated research studies and clinical evidence for chronic illness conditions. PubMed-indexed, evidence-graded, and organised by condition category. ME/CFS, Long COVID, POTS, and more.',
  keywords: ['chronic illness research', 'ME/CFS research', 'Long COVID studies', 'POTS clinical trials', 'fibromyalgia research', 'PubMed', 'evidence-graded'],
}

export default async function ResearchPage() {
  const { data: research } = await supabase
    .from('listings')
    .select('*')
    .in('content_type_id', [1, 8])
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen" style={{ background: '#fdfaf5' }}>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="font-serif text-3xl font-medium sm:text-4xl" style={{ color: '#0f3b45' }}>
            Research Library
          </h1>
          <p className="mt-3 max-w-2xl" style={{ color: '#3a3f4b' }}>
            Curated research studies and clinical evidence organised by condition. 
            Every entry links to its original source and is rated using our published evidence rubric.
          </p>
        </div>

        {research && research.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {research.map((listing) => (
              <ListingCard key={listing.id} listing={listing} categoryName="Research" />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed py-16 text-center" style={{ borderColor: '#d6cebf' }}>
            <p style={{ color: '#8a8275' }}>Connect your Supabase database and run the seed data.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
