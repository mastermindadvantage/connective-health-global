import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About & Evidence Rubric',
  description: 'Learn about Connective Health Global, our evidence-grading rubric, and how we evaluate every listing in the directory.',
  keywords: ['about', 'evidence rubric', 'methodology', 'clinical trial', 'research standards'],
}

const evidenceTiers = [
  {
    tier: 'Clinical Trial',
    id: 'CLINICAL_TRIAL',
    color: '#22C55E',
    bg: 'bg-green-50 border-green-300',
    dot: 'bg-green-500',
    badge: 'bg-green-100 text-green-800',
    description: 'Supported by at least one published randomised controlled trial (RCT) or systematic review. This is the highest evidence tier.',
    affiliate: 'Yes',
    example: 'A peer-reviewed RCT showing CoQ10 improves mitochondrial function in ME/CFS patients.',
  },
  {
    tier: 'Multiple Studies',
    id: 'MULTIPLE_STUDIES',
    color: '#16A34A',
    bg: 'bg-green-50 border-green-300',
    dot: 'bg-green-600',
    badge: 'bg-green-100 text-green-800',
    description: 'Two or more independent peer-reviewed studies with consistent results across different research groups.',
    affiliate: 'Yes',
    example: 'Multiple studies demonstrating low-dose naltrexone reduces pain and fatigue in fibromyalgia.',
  },
  {
    tier: 'Patient Reports',
    id: 'PATIENT_REPORTS',
    color: '#F59E0B',
    bg: 'bg-amber-50 border-amber-300',
    dot: 'bg-amber-500',
    badge: 'bg-amber-100 text-amber-800',
    description: 'Patient-reported outcomes, open-label studies, or retrospective chart reviews only. Promising but not yet confirmed by controlled trials.',
    affiliate: 'No',
    example: 'A large patient survey reporting benefits from a specific dietary protocol for MCAS.',
  },
  {
    tier: 'Emerging',
    id: 'EMERGING',
    color: '#EF4444',
    bg: 'bg-red-50 border-red-300',
    dot: 'bg-red-500',
    badge: 'bg-red-100 text-red-800',
    description: 'Preliminary evidence, animal studies, in-vitro research, or theoretical rationale. Human data is limited or absent.',
    affiliate: 'No',
    example: 'A mouse study suggesting a novel compound may reduce neuroinflammation in chronic fatigue models.',
  },
  {
    tier: 'Listing Only',
    id: 'LISTING_ONLY',
    color: '#9CA3AF',
    bg: 'bg-gray-50 border-gray-300',
    dot: 'bg-gray-400',
    badge: 'bg-gray-100 text-gray-700',
    description: 'Listed for informational purposes. No formal evidence rating applied. May include clinics, providers, or resources that meet our community standards.',
    affiliate: 'No',
    example: 'A clinic listing with verified contact information but no published treatment outcomes.',
  },
]

const principles = [
  {
    title: 'Research Authority',
    description: 'We prioritise peer-reviewed research and clinical evidence over anecdotes. Every listing above the "Listing Only" tier links to its original source so you can verify the evidence yourself.',
    icon: '🔬',
  },
  {
    title: 'The Evidence Gate',
    description: 'Only listings rated Clinical Trial or Multiple Studies may carry affiliate links. We never let commercial relationships influence evidence ratings. Revenue follows evidence—not the other way around.',
    icon: '⛓️',
  },
  {
    title: 'Revenue = Oxygen, Not Mission',
    description: 'Affiliate income funds the directory\'s operations and keeps it free for users. It never determines what gets listed or how it\'s rated. Our mission is evidence-guided care navigation, not profit maximisation.',
    icon: '💚',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: '#fdfaf5' }}>
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #f4f0e8, #fdfaf5)' }}>
          <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-16 text-center sm:pb-20 sm:pt-24 lg:px-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ border: '1px solid #f2d9b3', background: '#f9f6ef' }}>
              <span className="h-2 w-2 rounded-full" style={{ background: '#c77d2a' }} />
              <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#c77d2a', fontSize: '0.7rem' }}>Research First. Trust Always.</span>
            </div>
            <h1 className="font-serif text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl" style={{ color: '#0f3b45' }}>
              About <span style={{ color: '#1b5e6b' }}>Connective Health Global</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: '#3a3f4b' }}>
              We exist to make chronic illness evidence accessible, understandable, and actionable. 
              Every listing is graded by our published evidence rubric so you know exactly what the science says.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="card">
            <h2 className="font-serif text-2xl font-medium" style={{ color: '#0f3b45' }}>Our Mission</h2>
            <p className="mt-4 leading-relaxed" style={{ color: '#3a3f4b' }}>
              Millions of people with chronic illness navigate a fragmented healthcare system with conflicting information, 
              unsubstantiated claims, and predatory marketing. Connective Health Global provides a structured, 
              evidence-graded directory that cuts through the noise.
            </p>
            <p className="mt-3 leading-relaxed" style={{ color: '#3a3f4b' }}>
              We are not a substitute for medical advice. We are a research navigation tool — helping patients, 
              caregivers, and clinicians find the evidence they need to make informed decisions.
            </p>
          </div>
        </section>

        {/* Principles */}
        <section className="py-16" style={{ background: '#f4f0e8' }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-10 text-center font-serif text-2xl font-medium sm:text-3xl" style={{ color: '#0f3b45' }}>
              Our Principles
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {principles.map((principle) => (
                <div key={principle.title} className="card">
                  <span className="text-2xl">{principle.icon}</span>
                  <h3 className="mt-3 text-base font-semibold" style={{ color: '#1a1d23' }}>{principle.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: '#3a3f4b' }}>{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Evidence Rubric */}
        <section id="rubric" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-2xl font-medium sm:text-3xl" style={{ color: '#0f3b45' }}>
              Evidence Rubric
            </h2>
            <p className="mt-3" style={{ color: '#3a3f4b' }}>
              Every listing in the directory is assigned one of five evidence tiers. 
              This rubric is published and transparent — you can verify every rating yourself.
            </p>
          </div>

          <div className="space-y-4">
            {evidenceTiers.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-lg border-2 p-6 ${tier.bg}`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className={`h-3 w-3 rounded-full ${tier.dot}`} />
                      <h3 className="text-lg font-semibold" style={{ color: '#1a1d23' }}>
                        {tier.tier}
                      </h3>
                      <span className={`tag ${tier.badge}`}>{tier.id.replace(/_/g, ' ')}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: '#3a3f4b' }}>
                      {tier.description}
                    </p>
                    <p className="mt-2 text-xs italic" style={{ color: '#6b655a' }}>
                      Example: {tier.example}
                    </p>
                  </div>
                  <div className="shrink-0 rounded-lg bg-white/80 px-4 py-2 text-center sm:self-start">
                    <p className="text-xs font-medium uppercase tracking-wider" style={{ color: '#8a8275' }}>Affiliate</p>
                    <p
                      className={`text-base font-bold ${
                        tier.affiliate === 'Yes' ? 'text-green-700' : 'text-gray-400'
                      }`}
                    >
                      {tier.affiliate === 'Yes' ? '✓ Yes' : '✗ No'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-lg border p-6" style={{ borderColor: '#d6cebf', background: '#f9f6ef' }}>
            <h3 className="text-base font-semibold" style={{ color: '#1a1d23' }}>How ratings are determined</h3>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm" style={{ color: '#3a3f4b' }}>
              <li>Each listing is reviewed by our editorial team against the tier criteria above.</li>
              <li>Evidence sources must be publicly accessible — DOI, PMID, or direct URL.</li>
              <li>Ratings are reviewed annually and updated when new evidence emerges.</li>
              <li>Listings can be appealed by submitting additional peer-reviewed evidence.</li>
              <li>All rating changes are logged internally for transparency.</li>
            </ol>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-16" style={{ background: '#f4f0e8' }}>
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-medium sm:text-3xl" style={{ color: '#0f3b45' }}>Contact Us</h2>
            <p className="mt-3" style={{ color: '#3a3f4b' }}>
              Have a suggestion, evidence submission, or feedback? We&rsquo;d love to hear from you.
            </p>
            <p className="mt-6 text-sm" style={{ color: '#1b5e6b' }}>
              <a href="mailto:info@connectivehealthglobal.com" className="font-semibold hover:text-accent">
                info@connectivehealthglobal.com
              </a>
            </p>
            <p className="mt-2 text-xs" style={{ color: '#8a8275' }}>
              Response time: 2&ndash;3 business days
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
