// Supabase types for Connective Health Global

export interface Listing {
  id: string
  content_type_id: number
  title: string
  slug: string
  description: string | null
  summary: string | null
  external_url: string | null
  website: string | null
  evidence_tier_id: number | null
  evidence_notes: string | null
  evidence_sources: { url: string; title: string; pubmed_id?: string }[]
  phone: string | null
  email: string | null
  address_line1: string | null
  city: string | null
  state: string | null
  country: string | null
  listing_tier: 'free' | 'verified' | 'featured'
  affiliate_url: string | null
  affiliate_network: string | null
  categories: number[]
  tags: string[]
  featured_image: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  icon: string | null
  parent_id: number | null
  sort_order: number
}

export interface ContentType {
  id: number
  name: string
  slug: string
}

export interface Subscriber {
  id: string
  email: string
  first_name: string | null
  interests: number[]
  source: string | null
  ghl_contact_id: string | null
  is_active: boolean
  subscribed_at: string
}

export interface Comment {
  id: string
  listing_id: string
  author_name: string
  body: string
  is_approved: boolean
  created_at: string
}
