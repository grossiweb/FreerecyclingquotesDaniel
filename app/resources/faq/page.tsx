import type { Metadata } from 'next';
import { SERVICE_PAGES } from '@/lib/service-pages';
import { MATERIAL_PAGES } from '@/lib/material-pages';
import { INDUSTRY_PAGES } from '@/lib/industry-pages';
import { CHALLENGE_PAGES } from '@/lib/challenge-pages';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { CTABlock } from '@/components/ui';
import FAQHubClient from '@/components/ui/FAQHubClient';

export const metadata: Metadata = {
  title: 'FAQ Hub — All Recycling Questions Answered',
  description: 'Browse 700+ frequently asked questions about recycling services, materials, industries, and compliance challenges.',
  alternates: { canonical: 'https://recyclingquotes.com/resources/faq' },
};

type FAQItem = { section: string; sectionHref: string; q: string; a: string; category: string };

function collectAllFaqs(): FAQItem[] {
  const all: FAQItem[] = [];
  for (const [, page] of Object.entries(SERVICE_PAGES)) {
    for (const faq of page.faqs) all.push({ section: page.name, sectionHref: `/services/${page.slug}`, q: faq.q, a: faq.a, category: 'services' });
  }
  for (const [, page] of Object.entries(MATERIAL_PAGES)) {
    for (const faq of page.faqs) all.push({ section: page.name, sectionHref: `/materials/${page.slug}`, q: faq.q, a: faq.a, category: 'materials' });
  }
  for (const [, page] of Object.entries(INDUSTRY_PAGES)) {
    for (const faq of page.faqs) all.push({ section: page.name, sectionHref: `/industries/${page.slug}`, q: faq.q, a: faq.a, category: 'industries' });
  }
  for (const [, page] of Object.entries(CHALLENGE_PAGES)) {
    for (const faq of page.faqs) all.push({ section: page.name, sectionHref: `/challenges/${page.slug}`, q: faq.q, a: faq.a, category: 'challenges' });
  }
  return all;
}

export default function FAQHubPage() {
  const allFaqs = collectAllFaqs();
  return (
    <>
      <Breadcrumbs items={[{ name: 'Resources', href: '/resources' }, { name: 'FAQ', href: '/resources/faq' }]} />
      <FAQHubClient allFaqs={allFaqs} />
      <CTABlock title="Didn't Find Your Answer?" subtitle="Call 817-946-5655 or get a free quote. Our team answers any recycling question." />
    </>
  );
}
