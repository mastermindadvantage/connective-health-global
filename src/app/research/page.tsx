import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ListingCard } from '@/components/ListingCard'
import { supabase } from '@/lib/supabase'

export const metadata = {
  title: 'Research Library',
  description: 'Curated research studies and clinical evidence for chronic illness conditions. PubMed-indexed and evidence-graded.',
}

export default async function ResearchPage() {
  const { data: research } = await supabase
    .from('listings')
    .select('*')
    .in('content_type_id', [1, 8])
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Research Library</h1>
          <p className="mt-3 max-w-2xl text-gray-500">
            Curated research studies and clinical evidence organised by condition. 
            Every entry links to its original source.
          </p>
        </div>

        {research && research.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {research.map((listing) => (
              <ListingCard key={listing.id} listing={listing} categoryName="Research" />
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
