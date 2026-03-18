import type { MetadataRoute } from 'next';
import { SERVICE_PAGES } from '@/lib/service-pages';
import { MATERIAL_PAGES } from '@/lib/material-pages';
import { MATERIAL_LEAF_PAGES } from '@/lib/material-leaf-pages';
import { INDUSTRY_PAGES } from '@/lib/industry-pages';
import { CHALLENGE_PAGES } from '@/lib/challenge-pages';
import { SERVICE_LOCATION_CONFIGS } from '@/lib/service-locations';
import { LOCATIONS } from '@/lib/data';

const BASE = 'https://recyclingquotes.com';
const NOW = new Date().toISOString();

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  // ─── CORE PAGES ───
  urls.push(
    { url: BASE, lastModified: NOW, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/services`, lastModified: NOW, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/materials`, lastModified: NOW, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/industries`, lastModified: NOW, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/challenges`, lastModified: NOW, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/locations`, lastModified: NOW, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/get-a-quote`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/contact`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/how-it-works`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/resources`, lastModified: NOW, changeFrequency: 'weekly', priority: 0.7 },
  );

  // ─── ABOUT PAGES ───
  for (const slug of ['about', 'about/our-story', 'about/why-choose-us', 'about/esg', 'about/our-impact', 'about/certifications']) {
    urls.push({ url: `${BASE}/${slug}`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.6 });
  }

  // ─── RESOURCE PAGES ───
  for (const slug of ['resources/blog', 'resources/guides', 'resources/faq', 'resources/videos', 'resources/news', 'resources/statistics']) {
    urls.push({ url: `${BASE}/${slug}`, lastModified: NOW, changeFrequency: 'weekly', priority: 0.6 });
  }

  // ─── LEGAL ───
  urls.push(
    { url: `${BASE}/privacy`, lastModified: NOW, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: NOW, changeFrequency: 'yearly', priority: 0.3 },
  );

  // ─── SERVICE PAGES (17) + FAQ pages ───
  for (const slug of Object.keys(SERVICE_PAGES)) {
    urls.push({ url: `${BASE}/services/${slug}`, lastModified: NOW, changeFrequency: 'weekly', priority: 0.8 });
    urls.push({ url: `${BASE}/services/${slug}/faqs`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.5 });
  }

  // ─── MATERIAL PAGES (10 parent) + FAQ pages ───
  for (const slug of Object.keys(MATERIAL_PAGES)) {
    urls.push({ url: `${BASE}/materials/${slug}`, lastModified: NOW, changeFrequency: 'weekly', priority: 0.8 });
    urls.push({ url: `${BASE}/materials/${slug}/faqs`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.5 });
  }

  // ─── MATERIAL LEAF PAGES (16) ───
  for (const slug of Object.keys(MATERIAL_LEAF_PAGES)) {
    urls.push({ url: `${BASE}/materials/${slug}`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 });
  }

  // ─── INDUSTRY PAGES (13) + FAQ pages ───
  for (const slug of Object.keys(INDUSTRY_PAGES)) {
    urls.push({ url: `${BASE}/industries/${slug}`, lastModified: NOW, changeFrequency: 'weekly', priority: 0.8 });
    urls.push({ url: `${BASE}/industries/${slug}/faqs`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.5 });
  }

  // ─── CHALLENGE PAGES (8) + FAQ pages ───
  for (const slug of Object.keys(CHALLENGE_PAGES)) {
    urls.push({ url: `${BASE}/challenges/${slug}`, lastModified: NOW, changeFrequency: 'weekly', priority: 0.8 });
    urls.push({ url: `${BASE}/challenges/${slug}/faqs`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.5 });
  }

  // ─── SERVICE × LOCATION (160) ───
  for (const config of SERVICE_LOCATION_CONFIGS) {
    for (const loc of config.locations) {
      urls.push({ url: `${BASE}/${config.serviceSlug}/${loc}`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 });
    }
  }

  // ─── CITY PAGES (97) ───
  for (const country of LOCATIONS) {
    for (const metro of country.metros) {
      urls.push({ url: `${BASE}/locations/${country.slug}/${metro.slug}`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.6 });
    }
  }

  return urls;
}
