import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import { EvidenceBadge } from '@/components/EvidenceBadge'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { Listing } from '@/lib/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { data: listing } = await supabase
    .from('listings')
    .select('title, description, summary')
    .eq('slug', slug)
    .single()

  if (!listing) {
    return { title: 'Listing Not Found' }
  }

  return {
    title: listing.title,
    description: listing.summary || listing.description || `Evidence-graded listing for ${listing.title} on Connective Health Global.`,
  }
}

export default async function ListingPage({ params }: PageProps) {
  const { slug } = await params
  const { data: listing } = await supabase
    .from('listings')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!listing) {
    notFound()
  }

  return (
    <div className="min-h-screen" style={{ background: '#fdfaf5' }}>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link href="/" className="text-sm transition-colors" style={{ color: '#1b5e6b' }}>&larr; Back to directory</Link>

        <div className="mt-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {listing.evidence_tier_id && (
                  <EvidenceBadge tierId={listing.evidence_tier_id} size="md" />
                )}
              </div>
              <h1 className="mt-3 font-serif text-3xl font-medium sm:text-4xl" style={{ color: '#0f3b45' }}>{listing.title}</h1>
            </div>
          </div>

          {/* Summary */}
          {listing.summary && (
            <p className="mt-4 text-lg leading-relaxed" style={{ color: '#3a3f4b' }}>{listing.summary}</p>
          )}

          {/* Description */}
          {listing.description && (
            <div className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#8a8275' }}>About</h2>
              <p className="mt-2 leading-relaxed" style={{ color: '#3a3f4b' }}>{listing.description}</p>
            </div>
          )}

          {/* Evidence notes */}
          {listing.evidence_notes && (
            <div className="mt-8 rounded-lg p-6" style={{ background: '#d1e6e9' }}>
              <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#0f3b45' }}>Evidence Notes</h2>
              <p className="mt-2" style={{ color: '#1a1d23' }}>{listing.evidence_notes}</p>
            </div>
          )}

          {/* Evidence sources */}
          {listing.evidence_sources && listing.evidence_sources.length > 0 && (
            <div className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#8a8275' }}>Sources</h2>
              <ul className="mt-3 space-y-2">
                {listing.evidence_sources.map((source: any, i: number) => (
                  <li key={i}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" 
                       className="text-sm transition-colors"
                       style={{ color: '#1b5e6b' }}>
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact info */}
          {(listing.phone || listing.email || listing.website) && (
            <div className="mt-8 pt-8" style={{ borderTop: '1px solid #d6cebf' }}>
              <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#8a8275' }}>Contact</h2>
              <div className="mt-3 space-y-2">
                {listing.phone && <p className="text-sm" style={{ color: '#3a3f4b' }}>Phone: {listing.phone}</p>}
                {listing.email && <p className="text-sm" style={{ color: '#3a3f4b' }}>Email: {listing.email}</p>}
                {listing.website && (
                  <a href={listing.website} target="_blank" rel="noopener noreferrer"
                     className="text-sm font-medium transition-colors"
                     style={{ color: '#1b5e6b' }}>
                    Visit website &rarr;
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Affiliate link */}
          {listing.affiliate_url && (
            <div className="mt-8 pt-8" style={{ borderTop: '1px solid #d6cebf' }}>
              <a href={listing.affiliate_url} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-colors"
                 style={{ background: '#f2d9b3', color: '#c77d2a' }}>
                Check price on {listing.affiliate_network || 'supplier'} &rarr;
              </a>
              <p className="mt-2 text-xs" style={{ color: '#8a8275' }}>
                We may earn a commission. This does not affect our evidence rating.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
