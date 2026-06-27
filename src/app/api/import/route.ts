// API route for importing enrichment data into Supabase
// Hit this endpoint to trigger the import from the live Vercel site
// POST /api/import

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const evidenceMapping: Record<string, number> = {
  'clinical_trial': 1,
  'multiple_studies': 2,
  'patient_reports': 3,
  'emerging': 4,
}

export async function POST(request: Request) {
  const { data: enrichmentData, type } = await request.json()
  
  if (!type || !enrichmentData) {
    return Response.json({ error: 'Missing type or data' }, { status: 400 })
  }

  const results: any[] = []
  const errors: any[] = []

  for (const item of enrichmentData) {
    try {
      // Map enrichment data to listings table format
      // Type determines which content_type_id to use
      const contentTypes: Record<string, number> = {
        'clinical_trials': 7,
        'research_studies': 1,
        'supplements': 3,
        'clinicians': 5,
      }

      const contentTypeId = contentTypes[type]
      if (!contentTypeId) {
        return Response.json({ error: `Unknown type: ${type}` }, { status: 400 })
      }

      const listing = {
        title: item.title || item.name || item.trial_name || '',
        description: item.description || item.summary || item.purpose || '',
        slug: item.slug || (item.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        content_type_id: contentTypeId,
        evidence_tier_id: evidenceMapping[item.evidence_level?.toLowerCase()] || 4,
        external_url: item.url || item.link || item.trial_url || '',
        citation_data: item,
        meta_data: {
          source: item.source || 'enrichment_scrape',
          scraped_at: new Date().toISOString(),
        },
        is_published: true,
        listing_tier: 'free',
      }

      const { data, error } = await supabase
        .from('listings')
        .upsert(listing, { onConflict: 'slug', ignoreDuplicates: false })
        .select()

      if (error) {
        errors.push({ item: item.title, error: error.message })
      } else {
        results.push(data)
      }
    } catch (e: any) {
      errors.push({ item: item.title, error: e.message })
    }
  }

  return Response.json({
    imported: results.length,
    errors: errors.length,
    errorDetails: errors.slice(0, 10),
  })
}
