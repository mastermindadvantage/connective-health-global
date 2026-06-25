import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ListingCard } from '@/components/ListingCard'
import { supabase } from '@/lib/supabase'

export const metadata = {
  title: 'Supplement Directory',
  description: 'Evidence-graded supplement information for chronic illness management. Every product rated using our published evidence rubric.',
}

export default async function SupplementsPage() {
  const { data: supplements } = await supabase
    .from('listings')
    .select('*')
    .eq('content_type_id', 3)
    .eq('is_published', true)
    .order('evidence_tier_id', { ascending: true })

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Supplement Directory</h1>
          <p className="mt-3 max-w-2xl text-gray-500">
            Evidence-graded supplements for chronic illness management. Only supplements rated 
            <strong> Clinical Trial</strong> or <strong> Multiple Studies</strong> carry affiliate links. 
            Every listing cites its sources.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">Clinical Trial</span>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">Multiple Studies</span>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">Patient Reports</span>
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">Emerging</span>
          </div>
        </div>

        {supplements && supplements.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {supplements.map((listing) => (
              <ListingCard key={listing.id} listing={listing} categoryName="Supplement" />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-200 p-12 text-center">
            <p className="text-gray-500">Connect your Supabase database and run the seed data to populate this directory.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
