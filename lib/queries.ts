import { supabase } from './supabase';

// ═══════════════════════════════════════════════════════════════
// CONTACT (from site_config — cached)
// ═══════════════════════════════════════════════════════════════

let contactCache: Record<string, string> | null = null;

export async function getContact(): Promise<Record<string, string>> {
  if (contactCache) return contactCache;
  const { data } = await supabase.from('site_config').select('key, value');
  contactCache = Object.fromEntries((data || []).map(d => [d.key, d.value]));
  return contactCache || {};
}

// ═══════════════════════════════════════════════════════════════
// INDUSTRY IMAGES (cached)
// ═══════════════════════════════════════════════════════════════

let industryImageCache: Record<string, string> | null = null;

export async function getIndustryImages(): Promise<Record<string, string>> {
  if (industryImageCache) return industryImageCache;
  const { data } = await supabase.from('industries').select('slug, image').eq('is_active', true);
  industryImageCache = Object.fromEntries(
    (data || []).map((i: any) => [i.slug, i.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop'])
  );
  return industryImageCache!;
}

// ═══════════════════════════════════════════════════════════════
// FAQs (shared helper)
// ═══════════════════════════════════════════════════════════════

async function getFaqs(pageType: string, pageSlug: string) {
  const { data } = await supabase
    .from('faqs')
    .select('question, answer')
    .eq('page_type', pageType)
    .eq('page_slug', pageSlug)
    .eq('is_active', true)
    .order('sort_order');
  return (data || []).map(f => ({ q: f.question, a: f.answer }));
}

// ═══════════════════════════════════════════════════════════════
// SERVICE PAGE — relational assembly
// ═══════════════════════════════════════════════════════════════

export async function getServicePage(slug: string) {
  // 1. Core entity
  const { data: service } = await supabase
    .from('services')
    .select('id, slug, name, icon, hero_image, definition, h1, seo_title, seo_description, page_data')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (!service) return null;

  // 2. Materials from junction table
  const { data: matJunctions } = await supabase
    .from('service_materials')
    .select('description, priority_score, material:materials(slug, name, description)')
    .eq('service_id', service.id)
    .eq('is_approved', true)
    .order('priority_score', { ascending: false });

  const materials = (matJunctions || []).map(j => ({
    slug: (j.material as any)?.slug,
    name: (j.material as any)?.name,
    description: j.description || (j.material as any)?.description || null,
  })).filter(m => m.slug);

  // 3. Industries from junction table
  const { data: indJunctions } = await supabase
    .from('service_industries')
    .select('context, priority_score, industry:industries(slug, name, image)')
    .eq('service_id', service.id)
    .eq('is_approved', true)
    .order('priority_score', { ascending: false });

  const industries = (indJunctions || []).map(j => ({
    slug: (j.industry as any)?.slug,
    name: (j.industry as any)?.name,
    context: j.context || '',
    image: (j.industry as any)?.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
  })).filter(i => i.slug);

  // 4. Challenges from junction table
  const { data: chJunctions } = await supabase
    .from('service_challenges')
    .select('pain_context, relevance_score, challenge:challenges(slug, name)')
    .eq('service_id', service.id)
    .order('relevance_score', { ascending: false });

  const challenges = (chJunctions || []).map(j => ({
    slug: (j.challenge as any)?.slug,
    title: (j.challenge as any)?.name,
    pain: j.pain_context || '',
  })).filter(c => c.slug);

  // 5. Top locations from junction table
  const { data: locJunctions } = await supabase
    .from('service_locations')
    .select('location:locations(slug, name)')
    .eq('service_id', service.id)
    .eq('is_approved', true)
    .order('priority_score', { ascending: false })
    .limit(10);

  const topLocations = (locJunctions || []).map(j => ({
    slug: (j.location as any)?.slug,
    name: (j.location as any)?.name,
  })).filter(l => l.slug);

  // 6. FAQs from faqs table
  const faqs = await getFaqs('service', slug);

  // 7. Merge: junction data overrides page_data arrays
  const pd = service.page_data || {};
  return {
    ...pd,
    // Core fields from entity columns (override page_data if present)
    slug: service.slug,
    name: service.name,
    icon: service.icon,
    heroImage: service.hero_image || pd.heroImage,
    definition: service.definition || pd.definition,
    h1: service.h1 || pd.h1,
    titleTag: service.seo_title || pd.titleTag,
    metaDescription: service.seo_description || pd.metaDescription,
    // Relational data from junction tables (replaces hardcoded arrays)
    materials: materials.length > 0 ? materials : pd.materials || [],
    industries: industries.length > 0 ? industries : pd.industries || [],
    challenges: challenges.length > 0 ? challenges : pd.challenges || [],
    topLocations: topLocations.length > 0 ? topLocations : pd.topLocations || [],
    faqs: faqs.length > 0 ? faqs : pd.faqs || [],
  };
}

// ═══════════════════════════════════════════════════════════════
// CHALLENGE PAGE — relational assembly
// ═══════════════════════════════════════════════════════════════

export async function getChallengePage(slug: string) {
  const { data: challenge } = await supabase
    .from('challenges')
    .select('id, slug, name, definition, h1, seo_title, seo_description, page_data')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (!challenge) return null;

  // Services that solve this challenge (reverse junction query)
  const { data: svcJunctions } = await supabase
    .from('service_challenges')
    .select('pain_context, service:services(slug, name)')
    .eq('challenge_id', challenge.id)
    .order('relevance_score', { ascending: false });

  const services = (svcJunctions || []).map(j => ({
    slug: (j.service as any)?.slug,
    name: (j.service as any)?.name,
    how: j.pain_context || '',
  })).filter(s => s.slug);

  // FAQs
  const faqs = await getFaqs('challenge', slug);

  const pd = challenge.page_data || {};
  return {
    ...pd,
    slug: challenge.slug,
    name: challenge.name,
    definition: challenge.definition || pd.definition,
    h1: challenge.h1 || pd.h1,
    titleTag: challenge.seo_title || pd.titleTag,
    metaDescription: challenge.seo_description || pd.metaDescription,
    services: services.length > 0 ? services : pd.services || [],
    faqs: faqs.length > 0 ? faqs : pd.faqs || [],
  };
}

// ═══════════════════════════════════════════════════════════════
// MATERIAL PAGE — relational assembly (parent + leaf)
// ═══════════════════════════════════════════════════════════════

export async function getMaterialPage(slug: string) {
  const { data } = await supabase
    .from('materials')
    .select('id, slug, name, depth, parent_slug, hero_image, definition, h1, seo_title, seo_description, page_data')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (!data) return null;

  // Services that handle this material (reverse junction query)
  const { data: svcJunctions } = await supabase
    .from('service_materials')
    .select('description, service:services(slug, name)')
    .eq('material_id', data.id)
    .eq('is_approved', true);

  const services = (svcJunctions || []).map(j => ({
    slug: (j.service as any)?.slug,
    name: (j.service as any)?.name,
  })).filter(s => s.slug);

  // FAQs
  const faqType = data.depth === 2 ? 'material-leaf' : 'material';
  const faqs = await getFaqs(faqType, slug);

  // Sibling materials (same parent)
  let siblings: any[] = [];
  if (data.depth === 2 && data.parent_slug) {
    const { data: sibs } = await supabase
      .from('materials')
      .select('slug, name')
      .eq('parent_slug', data.parent_slug)
      .eq('is_active', true)
      .neq('slug', slug)
      .order('sort_order');
    siblings = sibs || [];
  }

  const pd = data.page_data || {};
  return {
    ...pd,
    slug: data.slug,
    name: data.name,
    depth: data.depth,
    parentSlug: data.parent_slug,
    heroImage: data.hero_image || pd.heroImage,
    definition: data.definition || pd.definition,
    h1: data.h1 || pd.h1,
    titleTag: data.seo_title || pd.titleTag,
    metaDescription: data.seo_description || pd.metaDescription,
    services: services.length > 0 ? services : pd.services || pd.services_list || [],
    faqs: faqs.length > 0 ? faqs : pd.faqs || [],
    siblings: siblings.length > 0 ? siblings : pd.siblings || [],
  };
}

// ═══════════════════════════════════════════════════════════════
// INDUSTRY PAGE — relational assembly
// ═══════════════════════════════════════════════════════════════

export async function getIndustryPage(slug: string) {
  const { data: industry } = await supabase
    .from('industries')
    .select('id, slug, name, definition, h1, seo_title, seo_description, page_data')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (!industry) return null;

  // Services for this industry (reverse junction query)
  const { data: svcJunctions } = await supabase
    .from('service_industries')
    .select('context, service:services(slug, name)')
    .eq('industry_id', industry.id)
    .eq('is_approved', true)
    .order('priority_score', { ascending: false });

  const services = (svcJunctions || []).map(j => ({
    slug: (j.service as any)?.slug,
    name: (j.service as any)?.name,
    why: j.context || '',
  })).filter(s => s.slug);

  // FAQs
  const faqs = await getFaqs('industry', slug);

  const pd = industry.page_data || {};
  return {
    ...pd,
    slug: industry.slug,
    name: industry.name,
    definition: industry.definition || pd.definition,
    h1: industry.h1 || pd.h1,
    titleTag: industry.seo_title || pd.titleTag,
    metaDescription: industry.seo_description || pd.metaDescription,
    services: services.length > 0 ? services : pd.services || [],
    faqs: faqs.length > 0 ? faqs : pd.faqs || [],
  };
}

// ═══════════════════════════════════════════════════════════════
// SLUG LISTS (for generateStaticParams — these could also query DB)
// ═══════════════════════════════════════════════════════════════

export async function getAllChallengeSlugs(): Promise<string[]> {
  const { data } = await supabase.from('challenges').select('slug').eq('is_active', true).order('sort_order');
  return data?.map(d => d.slug) || [];
}

export async function getAllServiceSlugs(): Promise<string[]> {
  const { data } = await supabase.from('services').select('slug').eq('is_active', true).order('sort_order');
  return data?.map(d => d.slug) || [];
}

export async function getAllMaterialSlugs() {
  const { data } = await supabase.from('materials').select('slug, depth').eq('is_active', true).order('sort_order');
  return data || [];
}

export async function getAllIndustrySlugs(): Promise<string[]> {
  const { data } = await supabase.from('industries').select('slug').eq('is_active', true).order('sort_order');
  return data?.map((d: any) => d.slug) || [];
}

// ═══════════════════════════════════════════════════════════════
// SERVICE CITIES (for LocationsSection component)
// ═══════════════════════════════════════════════════════════════

export async function getServiceCities(serviceSlug: string) {
  const { data: service } = await supabase
    .from('services')
    .select('id')
    .eq('slug', serviceSlug)
    .single();

  if (!service) return [];

  const { data: locs } = await supabase
    .from('service_locations')
    .select('location:locations(slug, name, country_code, region)')
    .eq('service_id', service.id)
    .eq('is_approved', true)
    .order('priority_score', { ascending: false });

  return (locs || []).map((l: any) => ({
    slug: l.location?.slug,
    name: l.location?.name,
    country_code: l.location?.country_code,
    state: l.location?.region,
    urlPrefix: serviceSlug,
  })).filter((c: any) => c.slug);
}

// ═══════════════════════════════════════════════════════════════
// MATERIAL CITIES — gets cities from related services' S×L pages
// ═══════════════════════════════════════════════════════════════

export async function getMaterialCities(materialSlug: string) {
  // Find services that handle this material
  const { data: material } = await supabase
    .from('materials')
    .select('id')
    .eq('slug', materialSlug)
    .single();

  if (!material) return [];

  const { data: svcJunctions } = await supabase
    .from('service_materials')
    .select('service:services(id, slug)')
    .eq('material_id', material.id)
    .eq('is_approved', true)
    .limit(3); // Top 3 services for this material

  if (!svcJunctions || svcJunctions.length === 0) return [];

  // Get cities for the primary service
  const primaryService = (svcJunctions[0] as any).service;
  if (!primaryService) return [];

  const { data: locs } = await supabase
    .from('service_locations')
    .select('location:locations(slug, name, country_code, region)')
    .eq('service_id', primaryService.id)
    .eq('is_approved', true)
    .order('priority_score', { ascending: false });

  return (locs || []).map((l: any) => ({
    slug: l.location?.slug,
    name: l.location?.name,
    country_code: l.location?.country_code,
    state: l.location?.region,
    urlPrefix: primaryService.slug,
  })).filter((c: any) => c.slug);
}
