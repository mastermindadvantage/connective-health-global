import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ListingCard } from '@/components/ListingCard'
import { supabase } from '@/lib/supabase'

export const metadata = {
  title: 'Clinics & Providers',
  description: 'Find clinics, practitioners, and support services for chronic illness care. Evidence-informed provider directory.',
}

export default async function ProvidersPage() {
  const { data: providers } = await supabase
    .from('listings')
    .select('*')
    .in('content_type_id', [4, 5, 6])
    .eq('is_published', true)
    .order('listing_tier', { ascending: true })

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Clinics & Providers</h1>
          <p className="mt-3 max-w-2xl text-gray-500">
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
          <div className="rounded-xl border border-dashed border-gray-200 p-12 text-center">
            <p className="text-gray-500">Connect your Supabase database and run the seed data.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
