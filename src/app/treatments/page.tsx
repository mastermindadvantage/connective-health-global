'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ListingCard } from '@/components/ListingCard'
import { SearchInput } from '@/components/SearchInput'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function TreatmentsPage() {
  const [treatments, setTreatments] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Treatment Protocols | Connective Health Global'
  }, [])

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('listings')
        .select('*')
        .eq('content_type_id', 2)
        .eq('is_published', true)
        .order('evidence_tier_id', { ascending: true })
      setTreatments(data || [])
      setLoading(false)
    }
    fetchData()
  }, [])

  const filtered = searchQuery.trim()
    ? treatments.filter((l) => {
        const q = searchQuery.toLowerCase()
        return (
          l.title.toLowerCase().includes(q) ||
          (l.summary && l.summary.toLowerCase().includes(q)) ||
          (l.description && l.description.toLowerCase().includes(q))
        )
      })
    : treatments

  return (
    <div className="min-h-screen" style={{ background: '#fdfaf5' }}>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="font-serif text-3xl font-medium sm:text-4xl" style={{ color: '#0f3b45' }}>
            Treatment Protocols
          </h1>
          <p className="mt-3 max-w-2xl" style={{ color: '#3a3f4b' }}>
            Evidence-graded treatment protocols for chronic illness management. 
            Every protocol is rated using our published evidence rubric with links to original sources.
          </p>
        </div>

        <div className="mb-8">
          <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search treatment protocols..." />
        </div>

        {loading ? (
          <div className="py-16 text-center">
            <p style={{ color: '#8a8275' }}>Loading treatment protocols...</p>
          </div>
        ) : filtered.length > 0 ? (
          <>
            {searchQuery && (
              <p className="mb-6 text-sm" style={{ color: '#8a8275' }}>
                Showing {filtered.length} of {treatments.length} treatment protocols
              </p>
            )}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((listing: any) => (
                <ListingCard key={listing.id} listing={listing} categoryName="Treatment Protocol" />
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-dashed py-16 text-center" style={{ borderColor: '#d6cebf' }}>
            <p className="text-lg" style={{ color: '#8a8275' }}>
              {searchQuery ? 'No treatment protocols match your search.' : 'No treatment protocols yet.'}
            </p>
            <p className="mt-2 text-sm" style={{ color: '#8a8275' }}>
              {searchQuery ? 'Try a different search term.' : 'Check back soon as new protocols are added.'}
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
