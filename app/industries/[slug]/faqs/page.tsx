import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { INDUSTRY_PAGES } from '@/lib/industry-pages';
import { JsonLd, faqPageSchema } from '@/lib/schema';
import FAQFullPage from '@/components/ui/FAQFullPage';

export function generateStaticParams() {
  return Object.keys(INDUSTRY_PAGES).map(slug => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = INDUSTRY_PAGES[params.slug];
  if (!page) return {};
  return {
    title: `${page.name} Recycling FAQ — Common Questions`,
    description: `Frequently asked questions about recycling for ${page.name.toLowerCase()}. ${page.faqs.length} questions answered.`,
    alternates: { canonical: `https://recyclingquotes.com/industries/${page.slug}/faqs` },
  };
}

export default function IndustryFAQPage({ params }: { params: { slug: string } }) {
  const page = INDUSTRY_PAGES[params.slug];
  if (!page) notFound();

  return (
    <>
      <JsonLd data={faqPageSchema(page.faqs.map(f => ({ question: f.q, answer: f.a })))} />
      <FAQFullPage
        title={`${page.name} Recycling — FAQ`}
        description={`Common questions about recycling programs for ${page.name.toLowerCase()} operations.`}
        backLabel={`Back to ${page.name}`}
        backHref={`/industries/${page.slug}`}
        faqs={page.faqs}
        breadcrumbItems={[
          { name: 'Industries', href: '/industries' },
          { name: page.name, href: `/industries/${page.slug}` },
        ]}
      />
    </>
  );
}
