'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ListingCard } from '@/components/ListingCard'
import { SearchInput } from '@/components/SearchInput'
import { supabase } from '@/lib/supabase'
import { useEffect, useState, use } from 'react'
import type { Listing } from '@/lib/types'

const CONTENT_TYPE_LABELS: Record<number, string> = {
  1: 'Research',
  2: 'Treatments',
  3: 'Supplements',
  4: 'Clinics',
  5: 'Providers',
  6: 'Support Services',
  7: 'Supplement Articles',
  8: 'Clinical Trials',
}

const QUICK_SUGGESTIONS = [
  'mitochondrial',
  'low dose naltrexone',
  'covid',
  'POTS',
  'fatigue',
  'methylation',
  'autoimmune',
  'pain management',
]

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const resolvedParams = use(searchParams)
  const initialQuery = resolvedParams.q || ''

  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<Listing[]>([])
  const [allListings, setAllListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState<number | null>(null)
  const [searched, setSearched] = useState(!!initialQuery)

  // Fetch all published listings once
  useEffect(() => {
    async function fetchAll() {
      const { data } = await supabase
        .from('listings')
        .select('*')
        .eq('is_published', true)
        .order('evidence_tier_id', { ascending: true })

      setAllListings(data || [])
      setLoading(false)
    }
    fetchAll()
  }, [])

  // Perform search whenever query or filter changes
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setSearched(false)
      return
    }

    const q = query.toLowerCase()
    let filtered = allListings.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        (l.summary && l.summary.toLowerCase().includes(q)) ||
        (l.description && l.description.toLowerCase().includes(q)) ||
        (l.tags && l.tags.some((t: string) => t.toLowerCase().includes(q))) ||
        (l.city && l.city.toLowerCase().includes(q)) ||
        (l.state && l.state.toLowerCase().includes(q))
    )

    if (typeFilter !== null) {
      if (typeFilter === 4) {
        // Clinics/Providers group
        filtered = filtered.filter((l) => l.content_type_id >= 4 && l.content_type_id <= 6)
      } else {
        filtered = filtered.filter((l) => l.content_type_id === typeFilter)
      }
    }

    setResults(filtered)
    setSearched(true)
  }, [query, typeFilter, allListings])

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery)
    if (newQuery.trim()) {
      // Update URL without navigation
      window.history.replaceState(null, '', `/search?q=${encodeURIComponent(newQuery.trim())}`)
    }
  }

  // Get unique content types from results
  const availableTypes = new Set(results.map((l) => l.content_type_id))

  return (
    <div className="min-h-screen" style={{ background: '#fdfaf5' }}>
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="font-serif text-3xl font-medium sm:text-4xl" style={{ color: '#0f3b45' }}>
            Search Directory
          </h1>
          <p className="mt-3 max-w-2xl" style={{ color: '#3a3f4b' }}>
            Search across all research, treatments, supplements, clinics, and providers in one place.
          </p>
        </div>

        {/* Search input */}
        <div className="mb-8 max-w-xl">
          <SearchInput
            value={query}
            onChange={handleSearch}
            placeholder="Search all listings..."
          />
        </div>

        {/* Quick suggestions (before searching) */}
        {!searched && !loading && (
          <div className="mb-10">
            <p className="mb-3 text-sm font-medium" style={{ color: '#8a8275' }}>Try searching for:</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSearch(suggestion)}
                  className="rounded-full px-4 py-1.5 text-sm transition-colors"
                  style={{
                    background: '#ffffff',
                    border: '1px solid #d6cebf',
                    color: '#3a3f4b',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.target as HTMLElement).style.borderColor = '#1b5e6b'
                    ;(e.target as HTMLElement).style.color = '#1b5e6b'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.target as HTMLElement).style.borderColor = '#d6cebf'
                    ;(e.target as HTMLElement).style.color = '#3a3f4b'
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Type filters (show when results exist) */}
        {searched && results.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setTypeFilter(null)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                typeFilter === null ? 'text-white' : 'border'
              }`}
              style={
                typeFilter === null
                  ? { background: '#1b5e6b', color: '#ffffff' }
                  : { borderColor: '#d6cebf', color: '#3a3f4b', background: '#ffffff' }
              }
            >
              All Types
            </button>
            {[1, 2, 3, 4].map((typeId) =>
              availableTypes.has(typeId) ? (
                <button
                  key={typeId}
                  onClick={() => setTypeFilter(typeId)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    typeFilter === typeId ? 'text-white' : 'border'
                  }`}
                  style={
                    typeFilter === typeId
                      ? { background: '#1b5e6b', color: '#ffffff' }
                      : { borderColor: '#d6cebf', color: '#3a3f4b', background: '#ffffff' }
                  }
                >
                  {CONTENT_TYPE_LABELS[typeId] || `Type ${typeId}`}
                </button>
              ) : null
            )}
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="py-16 text-center">
            <p style={{ color: '#8a8275' }}>Loading directory...</p>
          </div>
        ) : searched ? (
          results.length > 0 ? (
            <>
              <p className="mb-6 text-sm" style={{ color: '#8a8275' }}>
                Found {results.length} result{results.length !== 1 ? 's' : ''}
                {typeFilter !== null ? ` in ${CONTENT_TYPE_LABELS[typeFilter]}` : ''}
                {query ? ` for &ldquo;${query}&rdquo;` : ''}
              </p>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {results.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    categoryName={CONTENT_TYPE_LABELS[listing.content_type_id]}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-dashed py-16 text-center" style={{ borderColor: '#d6cebf' }}>
              <p className="text-lg" style={{ color: '#8a8275' }}>
                No results for &ldquo;{query}&rdquo;
              </p>
              <p className="mt-2 text-sm" style={{ color: '#8a8275' }}>
                Try a different search term or browse by condition category.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setQuery('')
                    setResults([])
                    setSearched(false)
                    window.history.replaceState(null, '', '/search')
                  }}
                  className="btn-secondary"
                >
                  Clear Search
                </button>
              </div>
            </div>
          )
        ) : null}
      </main>

      <Footer />
    </div>
  )
}
