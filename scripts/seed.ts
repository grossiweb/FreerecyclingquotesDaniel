/**
 * RECYCLINGQUOTES.COM — Supabase Seed Script
 * 
 * Reads all existing .ts data files and inserts into Supabase.
 * Run: npx tsx scripts/seed.ts
 * 
 * Prerequisites:
 *   1. npm install @supabase/supabase-js tsx --save-dev
 *   2. Create .env.local with SUPABASE_URL and SUPABASE_SERVICE_KEY
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local
config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in .env.local');
  process.exit(1);
}

// Use service_role key for seeding (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseKey);

// ═══ IMPORT YOUR EXISTING DATA ═══
import { SERVICES as SERVICES_NAV, MATERIALS as MATERIALS_NAV, INDUSTRIES as INDUSTRIES_NAV, LOCATIONS, CONTACT } from '../lib/data';
import { SERVICE_PAGES } from '../lib/service-pages';
import { MATERIAL_PAGES } from '../lib/material-pages';
import { MATERIAL_LEAF_PAGES } from '../lib/material-leaf-pages';
import { INDUSTRY_PAGES } from '../lib/industry-pages';
import { CHALLENGE_PAGES } from '../lib/challenge-pages';
import { SERVICE_LOCATION_CONFIGS, STATE_CONTEXT } from '../lib/service-locations';

// ═══ HELPERS ═══
let insertCount = 0;
let errorCount = 0;

async function seed(table: string, rows: Record<string, any>[]) {
  if (rows.length === 0) return;
  const { data, error } = await supabase.from(table).upsert(rows, { onConflict: 'slug' });
  if (error) {
    console.error(`  ❌ ${table}: ${error.message}`);
    errorCount++;
  } else {
    console.log(`  ✅ ${table}: ${rows.length} rows`);
    insertCount += rows.length;
  }
}

async function seedJunction(table: string, rows: Record<string, any>[], conflictKey?: string) {
  if (rows.length === 0) return;
  // Insert in batches to avoid timeout
  const batchSize = 50;
  let total = 0;
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const { error } = await supabase.from(table).upsert(batch, { 
      onConflict: conflictKey,
      ignoreDuplicates: true 
    });
    if (error) {
      console.error(`  ❌ ${table} (batch ${i}): ${error.message}`);
      errorCount++;
    } else {
      total += batch.length;
    }
  }
  console.log(`  ✅ ${table}: ${total} rows`);
  insertCount += total;
}

// ═══ MAIN SEED FUNCTION ═══
async function main() {
  console.log('🌱 Starting Supabase seed...\n');
  console.log(`📡 URL: ${supabaseUrl}`);
  console.log('');

  // ─── 1. LOCATIONS ───
  console.log('📍 Seeding locations...');
  const locationRows: Record<string, any>[] = [];
  for (const country of LOCATIONS) {
    for (const metro of country.metros) {
      locationRows.push({
        slug: metro.slug,
        name: metro.name,
        country_code: country.slug,
        region: (metro as any).state || null,
        state_name: (metro as any).stateName || null,
        is_active: true,
      });
    }
  }
  await seed('locations', locationRows);

  // ─── 2. SERVICES ───
  console.log('🔧 Seeding services...');
  const serviceRows = Object.values(SERVICE_PAGES).map((s, i) => ({
    slug: s.slug,
    name: s.name,
    icon: s.icon,
    hero_image: s.heroImage,
    category: 'core-recycling',
    definition: s.definition,
    overview: s.overview,
    accepted_items: s.acceptedItems || [],
    process: s.process,
    differentiators: s.differentiators,
    certifications: s.certifications,
    headlines: s.headlines,
    h1: s.h1,
    seo_title: s.titleTag,
    seo_description: s.metaDescription,
    sort_order: i,
    is_active: true,
  }));
  await seed('services', serviceRows);

  // ─── 3. MATERIALS (parents) ───
  console.log('♻️  Seeding material parents...');
  const matParentRows = Object.values(MATERIAL_PAGES).map((m, i) => ({
    slug: m.slug,
    name: m.name,
    icon: m.icon,
    hero_image: m.heroImage,
    parent_slug: null,
    category: m.slug,
    depth: 1,
    definition: m.definition,
    description: m.description || null,
    overview: m.overview,
    accepted_items: m.acceptedItems,
    sub_types: m.subTypes || [],
    process: m.process,
    why_recycle: m.whyRecycle,
    headlines: m.headlines,
    certifications: m.certifications,
    services_list: m.services,
    challenges_list: m.challenges,
    industries_list: m.industries,
    city_links: m.cityLinks,
    h1: m.h1,
    seo_title: m.titleTag,
    seo_description: m.metaDescription,
    sort_order: i,
    is_active: true,
  }));
  await seed('materials', matParentRows);

  // ─── 4. MATERIALS (leaves) ───
  console.log('🍃 Seeding material leaves...');
  const matLeafRows = Object.values(MATERIAL_LEAF_PAGES).map((m, i) => ({
    slug: m.slug,
    name: m.name,
    parent_slug: m.parentSlug,
    category: m.parentSlug,
    depth: 2,
    definition: m.definition,
    accepted_items: m.acceptedItems,
    process: m.process,
    has_data_security: m.hasDataSecurity,
    data_security: m.dataSecurity || null,
    siblings: m.siblings,
    services_list: m.services,
    seo_title: m.titleTag,
    seo_description: m.metaDescription,
    sort_order: i,
    is_active: true,
  }));
  await seed('materials', matLeafRows);

  // ─── 5. INDUSTRIES ───
  console.log('🏭 Seeding industries...');
  const industryRows = Object.values(INDUSTRY_PAGES).map((ind, i) => ({
    slug: ind.slug,
    name: ind.name,
    icon: ind.icon,
    image: ind.heroImage,
    category: ind.slug,
    depth: 1,
    definition: ind.definition,
    description: ind.definition.slice(0, 120) + '...',
    seo_title: ind.titleTag,
    seo_description: ind.metaDescription,
    sort_order: i,
    is_active: true,
  }));
  await seed('industries', industryRows);

  // ─── 6. CHALLENGES ───
  console.log('💡 Seeding challenges...');
  const challengeRows = Object.values(CHALLENGE_PAGES).map((ch, i) => ({
    slug: ch.slug,
    name: ch.name,
    icon: 'psychology',
    color: 'green',
    definition: ch.definition,
    overview: [],
    approach: ch.approach || [],
    seo_title: ch.titleTag,
    seo_description: ch.metaDescription,
    sort_order: i,
    is_active: true,
  }));
  await seed('challenges', challengeRows);

  // ─── 7. CERTIFICATIONS ───
  console.log('🏆 Seeding certifications...');
  const certRows = [
    { slug: 'r2', name: 'R2', full_name: 'Responsible Recycling Standard', description: 'Standard for responsible recycling practices, covering data destruction, environmental management, and downstream accountability.', issuing_body: 'SERI' },
    { slug: 'e-stewards', name: 'e-Stewards', full_name: 'e-Stewards Standard', description: 'The highest standard for electronics recycling, prohibiting export to developing countries and landfill disposal.', issuing_body: 'BAN' },
    { slug: 'iso-14001', name: 'ISO 14001', full_name: 'Environmental Management Systems', description: 'International standard for environmental management systems.', issuing_body: 'ISO' },
    { slug: 'iso-9001', name: 'ISO 9001', full_name: 'Quality Management Systems', description: 'International standard for quality management.', issuing_body: 'ISO' },
    { slug: 'naid-aaa', name: 'NAID AAA', full_name: 'National Association for Information Destruction', description: 'Certification for secure data destruction facilities.', issuing_body: 'i-SIGMA' },
    { slug: 'epa', name: 'EPA Compliant', full_name: 'Environmental Protection Agency Compliance', description: 'Compliance with all applicable EPA regulations.', issuing_body: 'US EPA' },
  ];
  await seed('certifications', certRows);

  // ─── 8. STATE REGULATIONS ───
  console.log('📋 Seeding state regulations...');
  const stateRows = Object.entries(STATE_CONTEXT).map(([code, ctx]) => ({
    state_code: code,
    state_name: (ctx as any).name || code,
    regulation_summary: (ctx as any).regulations || '',
    ewaste_rules: (ctx as any).ewasteRules || null,
    hazmat_rules: (ctx as any).hazmatRules || null,
  }));
  // State regs use state_code as unique, not slug
  for (const row of stateRows) {
    const { error } = await supabase.from('state_regulations').upsert(row, { onConflict: 'state_code' });
    if (error) {
      console.error(`  ❌ state_regulations (${row.state_code}): ${error.message}`);
      errorCount++;
    }
  }
  console.log(`  ✅ state_regulations: ${stateRows.length} rows`);
  insertCount += stateRows.length;

  // ─── 9. SITE CONFIG ───
  console.log('⚙️  Seeding site config...');
  const configRows = [
    { key: 'phone', value: CONTACT.phone },
    { key: 'phone_href', value: CONTACT.phoneHref },
    { key: 'email', value: CONTACT.email },
    { key: 'address', value: CONTACT.address },
    { key: 'site_url', value: 'https://recyclingquotes.com' },
    { key: 'company_name', value: 'Recycling Quotes' },
  ];
  for (const row of configRows) {
    const { error } = await supabase.from('site_config').upsert(row, { onConflict: 'key' });
    if (error && !error.message.includes('duplicate')) {
      console.error(`  ❌ site_config (${row.key}): ${error.message}`);
    }
  }
  console.log(`  ✅ site_config: ${configRows.length} rows`);

  // ═══════════════════════════════════════════════════════════
  // JUNCTION TABLES — this is where relationships get created
  // ═══════════════════════════════════════════════════════════

  // First, build slug → id maps
  console.log('\n🔗 Building ID maps...');
  const { data: allServices } = await supabase.from('services').select('id, slug');
  const { data: allMaterials } = await supabase.from('materials').select('id, slug');
  const { data: allIndustries } = await supabase.from('industries').select('id, slug');
  const { data: allLocations } = await supabase.from('locations').select('id, slug');
  const { data: allChallenges } = await supabase.from('challenges').select('id, slug');

  const svcMap = Object.fromEntries((allServices || []).map(s => [s.slug, s.id]));
  const matMap = Object.fromEntries((allMaterials || []).map(m => [m.slug, m.id]));
  const indMap = Object.fromEntries((allIndustries || []).map(i => [i.slug, i.id]));
  const locMap = Object.fromEntries((allLocations || []).map(l => [l.slug, l.id]));
  const chMap = Object.fromEntries((allChallenges || []).map(c => [c.slug, c.id]));

  console.log(`  Services: ${Object.keys(svcMap).length}, Materials: ${Object.keys(matMap).length}, Industries: ${Object.keys(indMap).length}, Locations: ${Object.keys(locMap).length}, Challenges: ${Object.keys(chMap).length}`);

  // ─── 10. SERVICE_MATERIALS ───
  console.log('\n📦 Seeding service_materials...');
  const svcMatRows: Record<string, any>[] = [];
  for (const svc of Object.values(SERVICE_PAGES)) {
    const svcId = svcMap[svc.slug];
    if (!svcId) continue;
    for (const mat of svc.materials) {
      const matId = matMap[mat.slug];
      if (!matId) continue;
      svcMatRows.push({
        service_id: svcId,
        material_id: matId,
        priority_score: 8,
        is_approved: true,
        generates_page: false,
        description: (mat as any).description || null,
      });
    }
  }
  await seedJunction('service_materials', svcMatRows);

  // ─── 11. SERVICE_INDUSTRIES ───
  console.log('🏢 Seeding service_industries...');
  const svcIndRows: Record<string, any>[] = [];
  for (const svc of Object.values(SERVICE_PAGES)) {
    const svcId = svcMap[svc.slug];
    if (!svcId) continue;
    for (const ind of svc.industries) {
      const indId = indMap[ind.slug];
      if (!indId) continue;
      svcIndRows.push({
        service_id: svcId,
        industry_id: indId,
        priority_score: 8,
        is_approved: true,
        generates_page: false,
        context: ind.context || null,
      });
    }
  }
  await seedJunction('service_industries', svcIndRows);

  // ─── 12. SERVICE_LOCATIONS ───
  console.log('📍 Seeding service_locations...');
  const svcLocRows: Record<string, any>[] = [];
  for (const config of SERVICE_LOCATION_CONFIGS) {
    const svcId = svcMap[config.serviceSlug];
    if (!svcId) continue;
    for (const locSlug of config.locations) {
      const locId = locMap[locSlug];
      if (!locId) continue;
      svcLocRows.push({
        service_id: svcId,
        location_id: locId,
        priority_score: 8,
        is_approved: true,
      });
    }
  }
  await seedJunction('service_locations', svcLocRows);

  // ─── 13. SERVICE_CHALLENGES ───
  console.log('🎯 Seeding service_challenges...');
  const svcChRows: Record<string, any>[] = [];
  for (const svc of Object.values(SERVICE_PAGES)) {
    const svcId = svcMap[svc.slug];
    if (!svcId) continue;
    for (const ch of svc.challenges) {
      const chId = chMap[ch.slug];
      if (!chId) continue;
      svcChRows.push({
        service_id: svcId,
        challenge_id: chId,
        relevance_score: 8,
        pain_context: ch.pain || null,
      });
    }
  }
  await seedJunction('service_challenges', svcChRows);

  // ─── 14. FAQs ───
  console.log('\n❓ Seeding FAQs...');
  const faqRows: Record<string, any>[] = [];

  // Service FAQs
  for (const svc of Object.values(SERVICE_PAGES)) {
    for (const [i, faq] of svc.faqs.entries()) {
      faqRows.push({ question: faq.q, answer: faq.a, page_type: 'service', page_slug: svc.slug, sort_order: i, is_active: true });
    }
  }

  // Material parent FAQs
  for (const mat of Object.values(MATERIAL_PAGES)) {
    for (const [i, faq] of mat.faqs.entries()) {
      faqRows.push({ question: faq.q, answer: faq.a, page_type: 'material', page_slug: mat.slug, sort_order: i, is_active: true });
    }
  }

  // Material leaf FAQs
  for (const leaf of Object.values(MATERIAL_LEAF_PAGES)) {
    for (const [i, faq] of leaf.faqs.entries()) {
      faqRows.push({ question: faq.q, answer: faq.a, page_type: 'material-leaf', page_slug: leaf.slug, sort_order: i, is_active: true });
    }
  }

  // Industry FAQs
  for (const ind of Object.values(INDUSTRY_PAGES)) {
    for (const [i, faq] of ind.faqs.entries()) {
      faqRows.push({ question: faq.q, answer: faq.a, page_type: 'industry', page_slug: ind.slug, sort_order: i, is_active: true });
    }
  }

  // Challenge FAQs
  for (const ch of Object.values(CHALLENGE_PAGES)) {
    for (const [i, faq] of ch.faqs.entries()) {
      faqRows.push({ question: faq.q, answer: faq.a, page_type: 'challenge', page_slug: ch.slug, sort_order: i, is_active: true });
    }
  }

  // Insert FAQs in batches (no slug conflict key)
  const batchSize = 100;
  let faqTotal = 0;
  for (let i = 0; i < faqRows.length; i += batchSize) {
    const batch = faqRows.slice(i, i + batchSize);
    const { error } = await supabase.from('faqs').insert(batch);
    if (error) {
      console.error(`  ❌ faqs batch ${i}: ${error.message}`);
      errorCount++;
    } else {
      faqTotal += batch.length;
    }
  }
  console.log(`  ✅ faqs: ${faqTotal} rows`);
  insertCount += faqTotal;

  // ═══ FINAL REPORT ═══
  console.log('\n' + '═'.repeat(50));
  console.log('🌱 SEED COMPLETE');
  console.log('═'.repeat(50));
  console.log(`✅ Total rows inserted: ${insertCount}`);
  if (errorCount > 0) {
    console.log(`❌ Errors: ${errorCount}`);
  } else {
    console.log('🎉 Zero errors!');
  }
  console.log('');

  // Verify counts
  const tables = ['services', 'materials', 'industries', 'locations', 'challenges', 'certifications', 'state_regulations', 'faqs', 'service_materials', 'service_industries', 'service_locations', 'service_challenges'];
  console.log('📊 Table counts:');
  for (const t of tables) {
    const { count } = await supabase.from(t).select('*', { count: 'exact', head: true });
    console.log(`  ${t}: ${count}`);
  }
}

main().catch(console.error);
