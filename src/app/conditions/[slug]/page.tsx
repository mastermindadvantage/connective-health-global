'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ListingCard } from '@/components/ListingCard'
import { supabase } from '@/lib/supabase'
import { SearchInput } from '@/components/SearchInput'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Listing } from '@/lib/types'
import { use } from 'react'

const CATEGORY_SLUG_TO_ID: Record<string, number> = {
  'mecfs': 1,
  'long-covid': 2,
  'pots': 3,
  'fibromyalgia': 4,
  'mcas': 5,
  'eds-hsd': 6,
  'autoimmune': 7,
  'lyme-disease': 8,
  'general-chronic-illness': 9,
}

const CATEGORY_INFO: Record<string, { name: string; description: string }> = {
  'mecfs': { name: 'ME/CFS', description: 'Myalgic Encephalomyelitis / Chronic Fatigue Syndrome research, treatments, and specialists.' },
  'long-covid': { name: 'Long COVID', description: 'Post-COVID condition resources, clinical research, and treatment protocols.' },
  'pots': { name: 'POTS', description: 'Postural Orthostatic Tachycardia Syndrome evidence, treatments, and providers.' },
  'fibromyalgia': { name: 'Fibromyalgia', description: 'Fibromyalgia research, pain management protocols, and specialist care.' },
  'mcas': { name: 'MCAS', description: 'Mast Cell Activation Syndrome diagnosis, treatment, and management resources.' },
  'eds-hsd': { name: 'EDS/HSD', description: 'Ehlers-Danlos Syndromes and Hypermobility Spectrum Disorders care and research.' },
  'autoimmune': { name: 'Autoimmune', description: 'Autoimmune condition research, treatments, and clinical resources.' },
  'lyme-disease': { name: 'Lyme Disease', description: 'Lyme disease research, treatment protocols, and tick-borne illness resources.' },
  'general-chronic-illness': { name: 'General Chronic Illness', description: 'Cross-condition resources applicable to multiple chronic illness categories.' },
}

const CATEGORY_SEO_DESC: Record<string, string> = {
  'mecfs': 'Evidence-graded ME/CFS research, treatments, supplements, clinics, and providers. Every listing rated by our published evidence rubric.',
  'long-covid': 'Evidence-graded Long COVID research, treatment protocols, supplements, and specialist providers. Every listing rated by our evidence rubric.',
  'pots': 'Evidence-graded POTS research, treatments, supplements, and dysautonomia specialists. Every listing rated by our evidence rubric.',
  'fibromyalgia': 'Evidence-graded fibromyalgia research, pain management protocols, supplements, and specialist care. Every listing rated by our evidence rubric.',
  'mcas': 'Evidence-graded MCAS diagnosis, treatment, and management resources. Research, protocols, supplements, and providers rated by our evidence rubric.',
  'eds-hsd': 'Evidence-graded Ehlers-Danlos Syndromes and HSD resources. Research, treatments, and specialists rated by our evidence rubric.',
  'autoimmune': 'Evidence-graded autoimmune condition research, treatments, supplements, and clinical resources. Every listing rated by our evidence rubric.',
  'lyme-disease': 'Evidence-graded Lyme disease research, treatment protocols, and tick-borne illness resources. Every listing rated by our evidence rubric.',
  'general-chronic-illness': 'Cross-condition chronic illness resources, research, and evidence-graded listings applicable to multiple conditions.',
}

const CONTENT_TYPE_FILTERS = [
  { id: 0, label: 'All' },
  { id: 1, label: 'Research' },
  { id: 2, label: 'Treatments' },
  { id: 3, label: 'Supplements' },
  { id: 4, label: 'Clinics/Providers' },
]

interface PageProps {
  params: Promise<{ slug: string }>
}

export default function ConditionPage({ params }: PageProps) {
  const { slug } = use(params)
  const catInfo = CATEGORY_INFO[slug]
  const seoDesc = CATEGORY_SEO_DESC[slug]

  const [listings, setListings] = useState<Listing[]>([])
  const [filtered, setFiltered] = useState<Listing[]>([])
  const [activeFilter, setActiveFilter] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  // Set dynamic document title
  useEffect(() => {
    if (catInfo) {
      document.title = `${catInfo.name} | Connective Health Global`
    }
  }, [catInfo])

  useEffect(() => {
    const categoryId = CATEGORY_SLUG_TO_ID[slug]
    if (!categoryId) {
      setLoading(false)
      return
    }

    async function fetchListings() {
      const { data } = await supabase
        .from('listings')
        .select('*')
        .eq('is_published', true)
        .contains('categories', [categoryId])
        .order('evidence_tier_id', { ascending: true })

      setListings(data || [])
      setFiltered(data || [])
      setLoading(false)
    }

    fetchListings()
  }, [slug])

  // Apply filters
  useEffect(() => {
    let result = listings

    // Filter by content type
    if (activeFilter > 0) {
      if (activeFilter === 4) {
        // Clinics/Providers — content_type_id 4,5,6
        result = result.filter(
          (l) => l.content_type_id >= 4 && l.content_type_id <= 6
        )
      } else {
        result = result.filter((l) => l.content_type_id === activeFilter)
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          (l.summary && l.summary.toLowerCase().includes(q)) ||
          (l.description && l.description.toLowerCase().includes(q))
      )
    }

    setFiltered(result)
  }, [activeFilter, searchQuery, listings])

  if (!catInfo) {
    return (
      <div className="min-h-screen" style={{ background: '#fdfaf5' }}>
        <Header />
        <main className="mx-auto max-w-4xl px-4 py-24 text-center">
          <h1 className="font-serif text-3xl font-medium" style={{ color: '#0f3b45' }}>Condition not found</h1>
          <p className="mt-4" style={{ color: '#3a3f4b' }}>
            The condition category &ldquo;{slug}&rdquo; doesn&rsquo;t exist.
          </p>
          <Link href="/" className="btn-primary mt-8 inline-flex">
            Back to Home
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#fdfaf5' }}>
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* SEO description meta (invisible) */}
        <div style={{ display: 'none' }}>{seoDesc}</div>

        {/* Breadcrumb */}
        <nav className="mb-6 text-sm" style={{ color: '#8a8275' }}>
          <Link href="/" style={{ color: '#1b5e6b' }}>Home</Link>
          <span className="mx-2">/</span>
          <Link href="/conditions" style={{ color: '#1b5e6b' }}>Conditions</Link>
          <span className="mx-2">/</span>
          <span style={{ color: '#3a3f4b' }}>{catInfo.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <h1 className="font-serif text-3xl font-medium sm:text-4xl" style={{ color: '#0f3b45' }}>
            {catInfo.name}
          </h1>
          <p className="mt-3 max-w-2xl" style={{ color: '#3a3f4b' }}>
            {catInfo.description}
          </p>
        </div>

        {/* Search + Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {CONTENT_TYPE_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeFilter === f.id
                    ? 'text-white'
                    : 'border'
                }`}
                style={
                  activeFilter === f.id
                    ? { background: '#1b5e6b', color: '#ffffff' }
                    : { borderColor: '#d6cebf', color: '#3a3f4b', background: '#ffffff' }
                }
              >
                {f.label}
              </button>
            ))}
          </div>

          <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder={`Search ${catInfo.name} listings...`} />
        </div>

        {/* Results */}
        {loading ? (
          <div className="py-16 text-center">
            <p style={{ color: '#8a8275' }}>Loading listings...</p>
          </div>
        ) : filtered.length > 0 ? (
          <>
            <p className="mb-6 text-sm" style={{ color: '#8a8275' }}>
              Showing {filtered.length} listing{filtered.length !== 1 ? 's' : ''}
              {activeFilter > 0
                ? ` in ${CONTENT_TYPE_FILTERS.find((f) => f.id === activeFilter)?.label}`
                : ''}
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((listing) => (
                <ListingCard key={listing.id} listing={listing} categoryName={catInfo.name} />
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-dashed py-16 text-center" style={{ borderColor: '#d6cebf' }}>
            <p className="text-lg" style={{ color: '#8a8275' }}>No listings found</p>
            <p className="mt-2 text-sm" style={{ color: '#8a8275' }}>
              {searchQuery
                ? 'Try a different search term or clear the filters.'
                : 'No listings for this condition yet. Check back soon.'}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
