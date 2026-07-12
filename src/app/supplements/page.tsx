import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ListingCard } from '@/components/ListingCard'
import { supabase } from '@/lib/supabase'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Supplement Directory',
  description: 'Evidence-graded supplement information for chronic illness management. Every product rated using our published evidence rubric. Only Clinical Trial and Multiple Studies tiers carry affiliate links.',
  keywords: ['supplements', 'chronic illness supplements', 'evidence-based supplements', 'CoQ10', 'mitochondrial support', 'vitamin D', 'magnesium'],
}

export default async function SupplementsPage() {
  const { data: supplements } = await supabase
    .from('listings')
    .select('*')
    .eq('content_type_id', 3)
    .eq('is_published', true)
    .order('evidence_tier_id', { ascending: true })

  return (
    <div className="min-h-screen" style={{ background: '#fdfaf5' }}>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="font-serif text-3xl font-medium sm:text-4xl" style={{ color: '#0f3b45' }}>
            Supplement Directory
          </h1>
          <p className="mt-3 max-w-2xl" style={{ color: '#3a3f4b' }}>
            Evidence-graded supplements for chronic illness management. Only supplements rated 
            <strong> Clinical Trial</strong> or <strong> Multiple Studies</strong> carry affiliate links. 
            Every listing cites its sources.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full px-3 py-1 text-xs font-medium" style={{ background: '#d1e6e9', color: '#0f3b45' }}>Clinical Trial</span>
            <span className="rounded-full px-3 py-1 text-xs font-medium" style={{ background: '#d1e6e9', color: '#0f3b45' }}>Multiple Studies</span>
            <span className="rounded-full px-3 py-1 text-xs font-medium" style={{ background: '#f2d9b3', color: '#c77d2a' }}>Patient Reports</span>
            <span className="rounded-full px-3 py-1 text-xs font-medium" style={{ background: '#fef2f2', color: '#dc2626' }}>Emerging</span>
          </div>
        </div>

        {supplements && supplements.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {supplements.map((listing) => (
              <ListingCard key={listing.id} listing={listing} categoryName="Supplement" />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed py-16 text-center" style={{ borderColor: '#d6cebf' }}>
            <p style={{ color: '#8a8275' }}>Connect your Supabase database and run the seed data to populate this directory.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
