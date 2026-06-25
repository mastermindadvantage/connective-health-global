-- =============================================================
-- Connective Health Global - Supabase Schema
-- Evidence-gated directory for chronic illness research,
-- treatments, providers, and supplements.
-- =============================================================

-- 1. EXTENSIONS
create extension if not exists "pgcrypto";
create extension if not exists "pg_trgm";

-- 2. EVIDENCE RUBRIC (immutable lookup)
create table public.evidence_tiers (
    id          int primary key generated always as identity,
    name        text not null unique,
    short_name  text not null,
    description text not null,
    color       text not null,  -- hex color for UI badges
    can_affiliate boolean not null default false, -- only CLINICAL_TRIAL and MULTIPLE_STUDIES can carry affiliate links
    sort_order  int not null
);

insert into public.evidence_tiers (name, short_name, description, color, can_affiliate, sort_order) values
    ('CLINICAL_TRIAL', 'Trial', 'Supported by at least one published randomised controlled trial or systematic review', '#22C55E', true, 1),
    ('MULTIPLE_STUDIES', 'Multiple Studies', 'Supported by at least two independent peer-reviewed studies with consistent results', '#16A34A', true, 2),
    ('PATIENT_REPORTS', 'Patient Reports', 'Supported by patient-reported outcomes or open-label studies only', '#F59E0B', false, 3),
    ('EMERGING', 'Emerging', 'Preliminary evidence, animal studies, or theoretical rationale only', '#EF4444', false, 4),
    ('LISTING_ONLY', 'Listing Only', 'Listed for informational purposes. No evidence rating applied.', '#9CA3AF', false, 5);

-- 3. CATEGORIES
create table public.categories (
    id          int primary key generated always as identity,
    name        text not null unique,
    slug        text not null unique,
    description text,
    icon        text,  -- emoji or icon name
    parent_id   int references public.categories(id),
    sort_order  int not null default 0
);

insert into public.categories (name, slug, description, icon, sort_order) values
    ('ME/CFS', 'mecfs', 'Myalgic Encephalomyelitis / Chronic Fatigue Syndrome', '🫁', 1),
    ('Long COVID', 'long-covid', 'Post-Acute Sequelae of SARS-CoV-2 Infection (PASC)', '🦠', 2),
    ('POTS', 'pots', 'Postural Orthostatic Tachycardia Syndrome', '💓', 3),
    ('Fibromyalgia', 'fibromyalgia', 'Chronic widespread pain and tenderness', '🤕', 4),
    ('MCAS', 'mcas', 'Mast Cell Activation Syndrome', '🔬', 5),
    ('EDS/HSD', 'eds-hsd', 'Ehlers-Danlos Syndromes / Hypermobility Spectrum Disorders', '🦴', 6),
    ('Autoimmune', 'autoimmune', 'Various autoimmune conditions (Lupus, Sjogrens, etc.)', '🛡️', 7),
    ('Lyme Disease', 'lyme', 'Chronic Lyme Disease and associated coinfections', '🦟', 8),
    ('General Chronic Illness', 'general', 'General chronic illness support and resources', '🏥', 9);

-- 4. CONTENT TYPES
create table public.content_types (
    id   int primary key generated always as identity,
    name text not null unique,
    slug text not null unique
);

insert into public.content_types (name, slug) values
    ('Research Study', 'research'),
    ('Treatment Protocol', 'treatment'),
    ('Supplement', 'supplement'),
    ('Clinic', 'clinic'),
    ('Provider', 'provider'),
    ('Support Service', 'support-service'),
    ('Clinical Trial Listing', 'clinical-trial'),
    ('Article', 'article');

-- 5. LISTINGS (core table - everything is a listing)
create table public.listings (
    id                uuid primary key default gen_random_uuid(),
    content_type_id   int not null references public.content_types(id),
    title             text not null,
    slug              text not null unique,
    description       text,
    summary           text,  -- short version for cards/search
    external_url      text,  -- original source URL
    website           text,  -- provider/organisation website
    -- Evidence
    evidence_tier_id  int references public.evidence_tiers(id),
    evidence_notes    text,  -- explanation of evidence rating
    evidence_sources  jsonb default '[]'::jsonb, -- array of {url, title, pubmed_id}
    -- Provider-specific fields
    phone             text,
    email             text,
    address_line1     text,
    address_line2     text,
    city              text,
    state             text,
    postal_code       text,
    country           text default 'Australia',
    -- Premium listing fields
    listing_tier      text default 'free' check (listing_tier in ('free', 'verified', 'featured')),
    verified_at       timestamptz,
    featured_at       timestamptz,
    -- Affiliate
    affiliate_url     text,
    affiliate_network text, -- iHerb, Amazon, direct
    -- SEO
    meta_title        text,
    meta_description  text,
    -- Media
    featured_image    text,
    images            jsonb default '[]'::jsonb,
    -- Categorisation
    categories        int[] default '{}', -- array of category ids for flexible filtering
    tags              text[] default '{}',
    -- Status
    is_published      boolean default false,
    published_at      timestamptz,
    -- Tracking
    created_at        timestamptz default now(),
    updated_at        timestamptz default now()
);

-- Indexes
create index idx_listings_content_type on public.listings(content_type_id);
create index idx_listings_evidence_tier on public.listings(evidence_tier_id);
create index idx_listings_listing_tier on public.listings(listing_tier);
create index idx_listings_published on public.listings(is_published) where is_published = true;
create index idx_listings_categories on public.listings using gin(categories);
create index idx_listings_tags on public.listings using gin(tags);
create index idx_listings_search on public.listings using gin(title gin_trgm_ops);
create index idx_listings_city on public.listings(city);

-- 6. LISTING-CATEGORY JUNCTION (explicit many-to-many)
create table public.listing_categories (
    listing_id  uuid not null references public.listings(id) on delete cascade,
    category_id int not null references public.categories(id) on delete cascade,
    primary key (listing_id, category_id)
);

-- 7. NEWSLETTER SUBSCRIBERS
create table public.subscribers (
    id            uuid primary key default gen_random_uuid(),
    email         text not null unique,
    first_name    text,
    interests     int[] default '{}',  -- category ids
    source        text default 'website',
    ghl_contact_id text, -- GoHighLevel contact ID for sync
    is_active     boolean default true,
    subscribed_at timestamptz default now(),
    unsubscribed_at timestamptz
);

-- 8. EVIDENCE AUDIT TRAIL (blockchain-ready)
create table public.evidence_audit (
    id            uuid primary key default gen_random_uuid(),
    listing_id    uuid not null references public.listings(id) on delete cascade,
    previous_tier int references public.evidence_tiers(id),
    new_tier      int not null references public.evidence_tiers(id),
    changed_by    text default 'system',
    change_reason text,
    tx_hash       text, -- blockchain tx hash (Phase 3)
    block_number  bigint,
    created_at    timestamptz default now()
);

-- 9. ROW LEVEL SECURITY
alter table public.listings enable row level security;
alter table public.subscribers enable row level security;
alter table public.evidence_audit enable row level security;

-- Public can read published listings
create policy "Published listings are public" on public.listings
    for select using (is_published = true);

-- Only service_role can write
create policy "Service role can manage listings" on public.listings
    for all using (auth.role() = 'service_role');

create policy "Service role can manage subscribers" on public.subscribers
    for all using (auth.role() = 'service_role');

-- 10. AUTO-UPDATE TIMESTAMP
create or replace function public.update_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger trg_listings_updated_at
    before update on public.listings
    for each row execute function public.update_updated_at();

-- 11. HELPER: insert evidence audit trail
create or replace function public.log_evidence_change()
returns trigger as $$
begin
    if old.evidence_tier_id is distinct from new.evidence_tier_id then
        insert into public.evidence_audit (listing_id, previous_tier, new_tier, change_reason)
        values (new.id, old.evidence_tier_id, new.evidence_tier_id, 'Evidence re-evaluated');
    end if;
    return new;
end;
$$ language plpgsql;

create trigger trg_evidence_audit
    after update of evidence_tier_id on public.listings
    for each row execute function public.log_evidence_change();

-- 12. COMMENTS (for future community features)
create table public.listing_comments (
    id          uuid primary key default gen_random_uuid(),
    listing_id  uuid not null references public.listings(id) on delete cascade,
    author_name text not null,
    author_email text,
    body        text not null,
    is_approved boolean default false,
    created_at  timestamptz default now()
);

-- 13. SYNC LOG (for GoHighLevel integration)
create table public.sync_log (
    id            uuid primary key default gen_random_uuid(),
    source        text not null, -- 'ghl', 'apify', 'manual'
    entity_type   text not null, -- 'contact', 'listing', 'subscriber'
    entity_id     text,
    action        text not null, -- 'created', 'updated', 'deleted'
    status        text default 'pending',
    error_message text,
    created_at    timestamptz default now()
);
