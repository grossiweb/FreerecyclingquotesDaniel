import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CHALLENGE_PAGES } from '@/lib/challenge-pages';
import { JsonLd, faqPageSchema } from '@/lib/schema';
import FAQFullPage from '@/components/ui/FAQFullPage';

export function generateStaticParams() {
  return Object.keys(CHALLENGE_PAGES).map(slug => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = CHALLENGE_PAGES[params.slug];
  if (!page) return {};
  return {
    title: `${page.name} FAQ — ${page.faqs.length} Questions Answered`,
    description: `Frequently asked questions about ${page.name.toLowerCase()}. Expert answers on regulations, compliance, and solutions.`,
    alternates: { canonical: `https://recyclingquotes.com/challenges/${page.slug}/faqs` },
  };
}

export default function ChallengeFAQPage({ params }: { params: { slug: string } }) {
  const page = CHALLENGE_PAGES[params.slug];
  if (!page) notFound();

  return (
    <>
      <JsonLd data={faqPageSchema(page.faqs.map(f => ({ question: f.q, answer: f.a })))} />
      <FAQFullPage
        title={`${page.name} — FAQ`}
        description={`The ${page.faqs.length} most important questions about ${page.name.toLowerCase()}.`}
        backLabel={`Back to ${page.name}`}
        backHref={`/challenges/${page.slug}`}
        faqs={page.faqs}
        breadcrumbItems={[
          { name: 'Challenges', href: '/challenges' },
          { name: page.name, href: `/challenges/${page.slug}` },
        ]}
      />
    </>
  );
}
