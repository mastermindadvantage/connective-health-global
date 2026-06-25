import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import { EvidenceBadge } from '@/components/EvidenceBadge'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ListingPage({ params }: { params: { slug: string } }) {
  const { data: listing } = await supabase
    .from('listings')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!listing) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link href="/" className="text-sm text-gray-500 hover:text-emerald-600">&larr; Back to directory</Link>

        <div className="mt-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {listing.evidence_tier_id && (
                  <EvidenceBadge tierId={listing.evidence_tier_id} size="md" />
                )}
              </div>
              <h1 className="mt-3 text-3xl font-bold text-gray-900">{listing.title}</h1>
            </div>
          </div>

          {/* Summary */}
          {listing.summary && (
            <p className="mt-4 text-lg text-gray-600">{listing.summary}</p>
          )}

          {/* Description */}
          {listing.description && (
            <div className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">About</h2>
              <p className="mt-2 leading-relaxed text-gray-700">{listing.description}</p>
            </div>
          )}

          {/* Evidence notes */}
          {listing.evidence_notes && (
            <div className="mt-8 rounded-xl bg-emerald-50 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Evidence Notes</h2>
              <p className="mt-2 text-emerald-800">{listing.evidence_notes}</p>
            </div>
          )}

          {/* Evidence sources */}
          {listing.evidence_sources && listing.evidence_sources.length > 0 && (
            <div className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Sources</h2>
              <ul className="mt-3 space-y-2">
                {listing.evidence_sources.map((source: any, i: number) => (
                  <li key={i}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" 
                       className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline">
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact info */}
          {(listing.phone || listing.email || listing.website) && (
            <div className="mt-8 border-t border-gray-100 pt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Contact</h2>
              <div className="mt-3 space-y-2">
                {listing.phone && <p className="text-sm text-gray-700">Phone: {listing.phone}</p>}
                {listing.email && <p className="text-sm text-gray-700">Email: {listing.email}</p>}
                {listing.website && (
                  <a href={listing.website} target="_blank" rel="noopener noreferrer"
                     className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline">
                    Visit website &rarr;
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Affiliate link */}
          {listing.affiliate_url && (
            <div className="mt-8 border-t border-gray-100 pt-8">
              <a href={listing.affiliate_url} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 rounded-xl bg-amber-50 px-6 py-3 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-100">
                Check price on {listing.affiliate_network || 'supplier'} &rarr;
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
