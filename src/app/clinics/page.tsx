import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ListingCard } from '@/components/ListingCard'
import { supabase } from '@/lib/supabase'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Clinics',
  description: 'Find chronic illness clinics specialising in ME/CFS, Long COVID, POTS, fibromyalgia, MCAS, EDS, and more. Evidence-informed clinic listings.',
  keywords: ['chronic illness clinics', 'ME/CFS clinic', 'Long COVID clinic', 'POTS clinic', 'fibromyalgia clinic', 'MCAS clinic', 'dysautonomia clinic', 'chronic fatigue clinic'],
}

export default async function ClinicsPage() {
  const { data: clinics } = await supabase
    .from('listings')
    .select('*')
    .eq('content_type_id', 4)
    .eq('is_published', true)
    .order('listing_tier', { ascending: true })

  return (
    <div className="min-h-screen" style={{ background: '#fdfaf5' }}>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ border: '1px solid #f2d9b3', background: '#f9f6ef' }}>
            <span className="h-2 w-2 rounded-full" style={{ background: '#c77d2a' }} />
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#c77d2a', fontSize: '0.7rem' }}>Directory</span>
          </div>
          <h1 className="font-serif text-3xl font-medium sm:text-4xl" style={{ color: '#0f3b45' }}>
            Chronic Illness Clinics
          </h1>
          <p className="mt-3 max-w-2xl" style={{ color: '#3a3f4b' }}>
            Dedicated clinics specialising in the diagnosis, treatment, and management of chronic complex conditions. 
            All listings are verified and evidence-informed.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/providers" className="btn-secondary text-sm">
              View All Providers
            </Link>
            <Link href="/providers/claim" className="btn-primary text-sm">
              Claim Your Clinic
            </Link>
          </div>
        </div>

        {/* Filters / Info bar */}
        <div className="mb-8 rounded-lg p-4" style={{ background: '#f4f0e8' }}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm" style={{ color: '#3a3f4b' }}>
              <span className="flex items-center gap-1">
                <span className="font-semibold" style={{ color: '#1b5e6b' }}>{clinics ? clinics.length : 0}</span> clinics listed
              </span>
              <span className="hidden sm:inline" style={{ color: '#d6cebf' }}>|</span>
              <span className="flex items-center gap-1 hidden sm:inline-flex">
                🏆 <span className="font-semibold" style={{ color: '#1b5e6b' }}>Evidence-rated</span> listings
              </span>
            </div>
            <Link href="/search?type=clinic" className="text-sm font-medium" style={{ color: '#1b5e6b' }}>
              Search clinics &rarr;
            </Link>
          </div>
        </div>

        {clinics && clinics.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {clinics.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed py-16 text-center" style={{ borderColor: '#d6cebf' }}>
            <p className="text-lg" style={{ color: '#8a8275' }}>No clinics listed yet.</p>
            <p className="mt-2 text-sm" style={{ color: '#8a8275' }}>
              Be the first!{' '}
              <Link href="/providers/claim" style={{ color: '#1b5e6b' }}>Claim your clinic listing</Link>.
            </p>
          </div>
        )}

        {/* Info section */}
        <section className="mt-16">
          <div className="rounded-lg p-8" style={{ background: 'linear-gradient(135deg, #f4f0e8, #fdfaf5)' }}>
            <h2 className="font-serif text-2xl font-medium" style={{ color: '#0f3b45' }}>
              What Makes a Clinic Listing?
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: '🏥', title: 'Verified Information', desc: 'Every clinic listing is reviewed for accuracy. Contact details, specialities, and service areas are verified before publication.' },
                { icon: '📊', title: 'Evidence Context', desc: 'Where available, clinics may reference published treatment outcomes, research affiliations, or evidence-based protocols they follow.' },
                { icon: '🔍', title: 'Condition Specialisation', desc: 'Clinics are tagged by the conditions they treat — ME/CFS, Long COVID, POTS, fibromyalgia, MCAS, EDS/HSD, and more.' },
                { icon: '⭐', title: 'Tiered Visibility', desc: 'Free, Verified, and Featured tiers let clinics choose their level of visibility. Free listings are always included.' },
                { icon: '📞', title: 'Direct Contact', desc: 'Patients can find phone numbers, websites, and locations for every clinic. Premium tiers enable direct inquiry forms.' },
                { icon: '🔄', title: 'Always Updated', desc: 'Listings are reviewed periodically. Outdated or unreachable clinics are removed to keep the directory reliable.' },
              ].map((item) => (
                <div key={item.title} className="card">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="mt-2 text-sm font-semibold" style={{ color: '#1a1d23' }}>{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed" style={{ color: '#3a3f4b' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <div className="rounded-lg px-8 py-12" style={{ background: 'linear-gradient(135deg, #0f3b45, #1b5e6b)' }}>
            <h2 className="font-serif text-2xl font-medium text-white sm:text-3xl">Are you a clinic?</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
              Get listed on the leading evidence-guided chronic illness directory. Free listing available for every clinic.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link href="/providers/claim" className="btn-primary" style={{ background: '#c77d2a' }}>
                Claim Your Listing
              </Link>
              <Link href="/providers/lead-gen" className="rounded px-5 py-2.5 text-sm font-semibold transition-colors"
                style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff' }}>
                Learn About Patient Leads
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
