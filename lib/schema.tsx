// ─── JSON-LD Schema Helpers ───
// Based on: RecyclingQuotes_Structured_Data_Schema_v1.md
// Every page gets base layer (Organization + WebSite) via layout
// Page-specific schemas added per page type

const SITE_URL = 'https://recyclingquotes.com';

// §2.1 Organization — site-wide, in layout, never repeated
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Recycling Quotes',
  alternateName: 'Free Recycling Quotes',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/logo.png`,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-817-946-5655',
    contactType: 'sales',
    areaServed: ['US', 'CA', 'GB', 'AU'],
    availableLanguage: 'English',
  },
  sameAs: [
    'https://www.linkedin.com/company/recyclingquotes',
    'https://www.facebook.com/recyclingquotes',
  ],
  description: 'Nationwide recycling services network providing free quotes for electronics, metal, paper, plastic, pallets, and hazardous materials recycling.',
  foundingDate: '2005',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Fort Worth',
    addressRegion: 'TX',
    addressCountry: 'US',
  },
};

// §2.2 WebSite — site-wide, in layout
export const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Recycling Quotes',
  url: SITE_URL,
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

// §2.3 BreadcrumbList — every page except home
export type BreadcrumbItem = { name: string; href: string };

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

// §3.1 WebPage — for hub pages and general pages
export function webPageSchema({
  path,
  name,
  description,
  mentions,
}: {
  path: string;
  name: string;
  description: string;
  mentions?: { name: string; description: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}${path}/#webpage`,
    name,
    description,
    url: `${SITE_URL}${path}`,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    // GEO §2.3 — speakable markup for AI citation
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.definition-block', '.faq-answer', '.process-summary', '.stats-block', '.challenge-definition', '.challenge-approach'],
    },
    // GEO §2.1 — entity mentions for AI understanding
    ...(mentions && mentions.length > 0 ? {
      mentions: mentions.map(m => ({
        '@type': 'Thing',
        name: m.name,
        description: m.description,
      })),
    } : {}),
  };
}

// §3.2 Service schema — for service pillar pages
export function serviceSchema({
  slug,
  name,
  description,
  offers,
}: {
  slug: string;
  name: string;
  description: string;
  offers?: { name: string; url: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/services/${slug}/#service`,
    name,
    description,
    url: `${SITE_URL}/services/${slug}`,
    provider: { '@id': `${SITE_URL}/#organization` },
    serviceType: 'Recycling Service',
    areaServed: { '@type': 'Country', name: 'United States' },
    ...(offers && offers.length > 0
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `${name} Services`,
            itemListElement: offers.map((o) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: o.name,
                url: `${SITE_URL}${o.url}`,
              },
            })),
          },
        }
      : {}),
  };
}

// FAQ schema — for any page with FAQ section
export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

// Helper: render JSON-LD script tag
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
