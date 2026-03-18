import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SERVICE_PAGES } from '@/lib/service-pages';
import { JsonLd, faqPageSchema } from '@/lib/schema';
import FAQFullPage from '@/components/ui/FAQFullPage';

export function generateStaticParams() {
  return Object.keys(SERVICE_PAGES).map(slug => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = SERVICE_PAGES[params.slug];
  if (!page) return {};
  return {
    title: `${page.name} FAQ — Common Questions`,
    description: `Frequently asked questions about ${page.name.toLowerCase()}. ${page.faqs.length} questions answered.`,
    alternates: { canonical: `https://recyclingquotes.com/services/${page.slug}/faqs` },
  };
}

export default function ServiceFAQPage({ params }: { params: { slug: string } }) {
  const page = SERVICE_PAGES[params.slug];
  if (!page) notFound();

  return (
    <>
      <JsonLd data={faqPageSchema(page.faqs.map(f => ({ question: f.q, answer: f.a })))} />
      <FAQFullPage
        title={`${page.name} — Frequently Asked Questions`}
        description={`Everything you need to know about our ${page.name.toLowerCase()} service. Pricing, process, pickup, and compliance.`}
        backLabel={`Back to ${page.name}`}
        backHref={`/services/${page.slug}`}
        faqs={page.faqs}
        breadcrumbItems={[
          { name: 'Services', href: '/services' },
          { name: page.name, href: `/services/${page.slug}` },
        ]}
      />
    </>
  );
}
