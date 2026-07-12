import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ListingCard } from '@/components/ListingCard'
import { supabase } from '@/lib/supabase'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Clinics & Providers',
  description: 'Find evidence-informed clinics, practitioners, and support services specialising in chronic illness care. ME/CFS, Long COVID, POTS, fibromyalgia, MCAS, and more.',
  keywords: ['chronic illness clinics', 'ME/CFS doctors', 'Long COVID clinics', 'POTS specialists', 'fibromyalgia doctors', 'MCAS providers', 'dysautonomia clinic'],
}

export default async function ProvidersPage() {
  const { data: providers } = await supabase
    .from('listings')
    .select('*')
    .in('content_type_id', [4, 5, 6])
    .eq('is_published', true)
    .order('listing_tier', { ascending: true })

  return (
    <div className="min-h-screen" style={{ background: '#fdfaf5' }}>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="font-serif text-3xl font-medium sm:text-4xl" style={{ color: '#0f3b45' }}>
            Clinics & Providers
          </h1>
          <p className="mt-3 max-w-2xl" style={{ color: '#3a3f4b' }}>
            Find healthcare providers, clinics, and support services specialising in chronic illness care. 
            Free listings with upgrade options for verified and featured status.
          </p>
        </div>

        {providers && providers.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {providers.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
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
