import Link from 'next/link'
import { EvidenceBadge } from './EvidenceBadge'
import { LISTING_TIERS } from '@/lib/utils'
import type { Listing } from '@/lib/types'

interface ListingCardProps {
  listing: Listing
  categoryName?: string
}

export function ListingCard({ listing, categoryName }: ListingCardProps) {
  const tier = listing.listing_tier as keyof typeof LISTING_TIERS
  const tierConfig = LISTING_TIERS[tier]

  return (
    <Link
      href={`/listing/${listing.slug}`}
      className="group block rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-emerald-200 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {listing.evidence_tier_id && (
              <EvidenceBadge tierId={listing.evidence_tier_id} />
            )}
            {listing.listing_tier !== 'free' && (
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${tierConfig.badge}`}>
                {tierConfig.name}
              </span>
            )}
            {categoryName && (
              <span className="text-[10px] text-gray-400">{categoryName}</span>
            )}
          </div>
          <h3 className="mt-2 text-base font-semibold text-gray-900 group-hover:text-emerald-700">
            {listing.title}
          </h3>
          {listing.summary && (
            <p className="mt-1 text-sm leading-relaxed text-gray-500 line-clamp-2">
              {listing.summary}
            </p>
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
        {listing.city && listing.state && (
          <span>{listing.city}, {listing.state}</span>
        )}
        {listing.affiliate_network && (
          <span className="text-amber-600">Affiliate</span>
        )}
        {listing.website && (
          <span className="group-hover:text-emerald-600">Visit site &rarr;</span>
        )}
      </div>
    </Link>
  )
}
