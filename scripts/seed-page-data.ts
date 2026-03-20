/**
 * SEED PAGE_DATA — Populates the page_data JSONB column with full page content
 * Run: npx tsx scripts/seed-page-data.ts
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Import all page data
import { CHALLENGE_PAGES } from '../lib/challenge-pages';
import { SERVICE_PAGES } from '../lib/service-pages';
import { MATERIAL_PAGES } from '../lib/material-pages';
import { MATERIAL_LEAF_PAGES } from '../lib/material-leaf-pages';
import { INDUSTRY_PAGES } from '../lib/industry-pages';

async function main() {
  console.log('🌱 Seeding page_data columns...\n');

  // ─── CHALLENGES ───
  console.log('💡 Challenges...');
  for (const [slug, data] of Object.entries(CHALLENGE_PAGES)) {
    const { error } = await supabase
      .from('challenges')
      .update({ page_data: data })
      .eq('slug', slug);
    if (error) console.error(`  ❌ ${slug}: ${error.message}`);
    else console.log(`  ✅ ${slug}`);
  }

  // ─── SERVICES ───
  console.log('\n🔧 Services...');
  for (const [slug, data] of Object.entries(SERVICE_PAGES)) {
    const { error } = await supabase
      .from('services')
      .update({ page_data: data })
      .eq('slug', slug);
    if (error) console.error(`  ❌ ${slug}: ${error.message}`);
    else console.log(`  ✅ ${slug}`);
  }

  // ─── MATERIAL PARENTS ───
  console.log('\n♻️  Material parents...');
  for (const [slug, data] of Object.entries(MATERIAL_PAGES)) {
    const { error } = await supabase
      .from('materials')
      .update({ page_data: data })
      .eq('slug', slug);
    if (error) console.error(`  ❌ ${slug}: ${error.message}`);
    else console.log(`  ✅ ${slug}`);
  }

  // ─── MATERIAL LEAVES ───
  console.log('\n🍃 Material leaves...');
  for (const [slug, data] of Object.entries(MATERIAL_LEAF_PAGES)) {
    const { error } = await supabase
      .from('materials')
      .update({ page_data: data })
      .eq('slug', slug);
    if (error) console.error(`  ❌ ${slug}: ${error.message}`);
    else console.log(`  ✅ ${slug}`);
  }

  // ─── INDUSTRIES ───
  console.log('\n🏭 Industries...');
  for (const [slug, data] of Object.entries(INDUSTRY_PAGES)) {
    const { error } = await supabase
      .from('industries')
      .update({ page_data: data })
      .eq('slug', slug);
    if (error) console.error(`  ❌ ${slug}: ${error.message}`);
    else console.log(`  ✅ ${slug}`);
  }

  // ─── VERIFY ───
  console.log('\n📊 Verifying page_data...');
  for (const table of ['challenges', 'services', 'materials', 'industries']) {
    const { data } = await supabase
      .from(table)
      .select('slug, page_data')
      .not('page_data', 'eq', '{}');
    console.log(`  ${table}: ${data?.length || 0} rows with page_data`);
  }

  console.log('\n🎉 Done!');
}

main().catch(console.error);
