import type { Metadata } from 'next';
import Link from 'next/link';
import { LOCATIONS, SERVICES, CONTACT } from '@/lib/data';
import { JsonLd, webPageSchema, faqPageSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PageHero from '@/components/ui/PageHero';
import { SectionHeader, CTABlock, FAQAccordion, ScrollReveal } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Recycling Locations — 52+ Cities Nationwide',
  description: 'Free recycling pickup in 52+ US cities plus Toronto, Vancouver, London, Sydney, and more. Find certified recycling services near you. Same-day quotes.',
  alternates: { canonical: 'https://recyclingquotes.com/locations' },
};

// Group US metros by region for better UX
const US_REGIONS = [
  { label: 'Northeast', metros: ['boston','buffalo','hartford','new-york-city','philadelphia','pittsburgh','providence','rochester','richmond','virginia-beach','washington-dc'] },
  { label: 'Southeast', metros: ['atlanta','birmingham','charlotte','jacksonville','louisville','memphis','miami-fort-lauderdale','nashville','new-orleans','orlando','raleigh-cary','tampa-st-petersburg'] },
  { label: 'Midwest', metros: ['chicago','cincinnati','cleveland','columbus','detroit','indianapolis','kansas-city','milwaukee','minneapolis-st-paul','st-louis'] },
  { label: 'South Central', metros: ['austin','dallas-fort-worth','houston','oklahoma-city','san-antonio'] },
  { label: 'West', metros: ['denver','las-vegas','los-angeles','phoenix','portland','riverside-san-bernardino','sacramento','salt-lake-city','san-diego','san-francisco-bay-area','san-jose','seattle-tacoma','tucson'] },
];

const usaData = LOCATIONS.find(c => c.slug === 'usa')!;
const intlCountries = LOCATIONS.filter(c => c.slug !== 'usa');

// Top services to feature in cross-link section
const FEATURED_SERVICES = SERVICES.filter(s => ['scrap-metal-recycling','electronics-recycling','dumpster-rental','junk-removal','pallet-recycling','hazardous-waste-disposal'].includes(s.slug));

const FAQS = [
  { q: 'What cities does Recycling Quotes serve?', a: 'We provide recycling services in 52+ cities across the United States, 5 cities in Canada (Toronto, Vancouver, Montreal, Calgary, Ottawa), 5 cities in the United Kingdom (London, Manchester, Birmingham, Leeds, Sheffield), and 4 cities in Australia (Sydney, Melbourne, Brisbane, Perth). Our network continues to expand — contact us if your city is not listed.' },
  { q: 'Do you offer free pickup in all locations?', a: 'Yes. Free pickup is available in all our service areas for qualifying commercial quantities. For residential or smaller quantities, pickup fees may apply depending on the material type and your location. Contact us for specific pickup terms in your city.' },
  { q: 'How do I find recycling services in my city?', a: 'Click on your city from the list on this page to see available recycling services, accepted materials, and local pickup scheduling. You can also call us at 817-946-5655 or submit a quote request with your zip code and we\'ll confirm availability.' },
  { q: 'What services are available in each city?', a: 'Service availability varies by city and is based on our certified processor network in each metro area. Core services like electronics recycling, scrap metal recycling, and dumpster rental are available in most cities. Specialized services like IT asset disposition and hazardous waste disposal may be limited to select metros. Each city page lists the specific services available.' },
  { q: 'Are your recycling partners locally certified in each city?', a: 'Yes. Our downstream processing partners in each city hold relevant certifications including R2, e-Stewards, ISO 14001, and state-specific permits. For regulated materials like hazardous waste, we only work with locally licensed and EPA-compliant facilities.' },
  { q: 'Can you handle multi-location pickups across different cities?', a: 'Absolutely. Multi-location recycling programs are one of our core strengths. We provide a single point of contact, consolidated billing, and standardized compliance documentation across all your locations — whether you have facilities in 3 cities or 30.' },
];

export default function LocationsPage() {
  const totalMetros = LOCATIONS.reduce((sum, c) => sum + c.metros.length, 0);

  return (
    <>
      <JsonLd data={webPageSchema({ path: '/locations', name: `Recycling Locations — ${totalMetros}+ Cities Nationwide`, description: 'Free recycling pickup in 52+ US cities plus Canada, UK, and Australia.' })} />
      <JsonLd data={faqPageSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <Breadcrumbs items={[{ name: 'Locations', href: '/locations' }]} />

      {/* Hero */}
      <PageHero
        tag={`${totalMetros}+ Cities Worldwide`}
        tagIcon="location_on"
        title="Recycling Services"
        titleAccent="Near You"
        description={`Recycling Quotes operates a certified recycling network spanning ${totalMetros}+ cities across the United States, Canada, United Kingdom, and Australia. Every location offers free commercial pickup, certified processing, and complete compliance documentation — including Certificates of Recycling and data destruction certificates where applicable.`}
        image="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&h=600&fit=crop"
        primaryCta={{ label: 'Get a Quote', href: '/get-a-quote', icon: 'arrow_forward' }}
        showPhone
      />

      {/* Country overview cards */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container-rq">
          <ScrollReveal>
            <SectionHeader tag="Coverage" tagIcon="public" title="Where We Operate" subtitle="Select your country to browse available cities and services." />
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {LOCATIONS.map((country, i) => (
              <ScrollReveal key={country.slug} delay={i * 60}>
                <a href={`#${country.slug}`} className="block bg-gray-50 border border-gray-100 rounded-[20px] p-6 text-center group hover:bg-white hover:border-primary-light hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
                  <div className="text-4xl mb-3">{country.flag}</div>
                  <h3 className="font-extrabold text-gray-800 mb-1" style={{ letterSpacing: '-0.015em' }}>{country.name}</h3>
                  <p className="text-[13px] text-primary font-bold">{country.metros.length} {country.metros.length === 1 ? 'city' : 'cities'}</p>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* USA metros by region */}
      <section className="py-24 bg-gray-50" id="usa">
        <div className="container-rq">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-10">
              <span className="text-4xl">🇺🇸</span>
              <div>
                <h2 className="section-title">United States</h2>
                <p className="text-gray-400 text-[15px]">{usaData.metros.length} metro areas with certified recycling services</p>
              </div>
            </div>
          </ScrollReveal>

          {US_REGIONS.map((region) => {
            const metros = region.metros.map(slug => usaData.metros.find(m => m.slug === slug)).filter(Boolean);
            return (
              <div key={region.label} className="mb-10 last:mb-0">
                <ScrollReveal>
                  <h3 className="text-[13px] font-bold uppercase tracking-[.08em] text-gray-400 mb-4 pb-2 border-b border-gray-200">{region.label}</h3>
                </ScrollReveal>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {metros.map((metro, i) => metro && (
                    <ScrollReveal key={metro.slug} delay={Math.min(i * 30, 200)}>
                      <Link href={`/locations/usa/${metro.slug}`} className="flex items-center gap-2.5 px-4 py-3.5 bg-white border border-gray-200 rounded-[12px] group hover:border-primary hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                        <span className="material-symbols-outlined text-[18px] text-gray-300 group-hover:text-primary transition-colors">location_on</span>
                        <div className="min-w-0">
                          <span className="block text-[14px] font-bold text-gray-800 group-hover:text-primary transition-colors truncate" style={{ letterSpacing: '-0.01em' }}>{metro.name}</span>
                          {metro.state && <span className="block text-[11px] text-gray-400 font-medium">{metro.state}</span>}
                        </div>
                      </Link>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* International locations */}
      {intlCountries.map((country) => (
        <section key={country.slug} className="py-16 bg-white border-t border-gray-100" id={country.slug}>
          <div className="container-rq">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl">{country.flag}</span>
                <div>
                  <h2 className="text-xl font-extrabold text-gray-800" style={{ letterSpacing: '-0.02em' }}>{country.name}</h2>
                  <p className="text-gray-400 text-[14px]">{country.metros.length} cities with recycling services</p>
                </div>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {country.metros.map((metro, i) => (
                <ScrollReveal key={metro.slug} delay={i * 50}>
                  <Link href={`/locations/${country.slug}/${metro.slug}`} className="flex items-center gap-2.5 px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-[12px] group hover:border-primary hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                    <span className="material-symbols-outlined text-[18px] text-gray-300 group-hover:text-primary transition-colors">location_on</span>
                    <span className="text-[14px] font-bold text-gray-800 group-hover:text-primary transition-colors" style={{ letterSpacing: '-0.01em' }}>{metro.name}</span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Services available across locations */}
      <section className="py-24 bg-dark-bg relative overflow-hidden">
        <div className="absolute top-[-150px] right-[-150px] w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.08) 0%, transparent 60%)' }} />
        <div className="container-rq relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-[5px] bg-white/10 text-white/80 font-bold rounded-full mb-4" style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <span className="material-symbols-outlined text-[14px]">handyman</span> Available Services
              </div>
              <h2 className="section-title !text-white">Services Available in Most Locations</h2>
              <p className="text-dark-text max-w-lg mx-auto mt-2">These core recycling services are available across our nationwide network. Availability of specialized services varies by metro.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURED_SERVICES.map((svc, i) => (
              <ScrollReveal key={svc.slug} delay={i * 60}>
                <Link href={`/services/${svc.slug}`} className="flex items-start gap-4 p-5 border border-dark-border rounded-[16px] group hover:bg-dark-card hover:border-[rgba(74,222,128,.15)] transition-all duration-300">
                  <div className="w-11 h-11 rounded-[8px] bg-[rgba(74,222,128,.1)] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[22px] text-[#4ADE80]">{svc.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white mb-1" style={{ letterSpacing: '-0.015em' }}>{svc.name}</h3>
                    <p className="text-[13px] text-gray-400 leading-relaxed">{svc.description}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="text-center mt-8">
              <Link href="/services" className="btn-outline-white">View All Services <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Multi-location CTA */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <ScrollReveal>
            <div className="bg-primary-50 border border-primary-light rounded-[28px] p-10 lg:p-14 text-center">
              <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-[32px] text-primary">corporate_fare</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-800 mb-3" style={{ letterSpacing: '-0.025em' }}>Multi-Location Recycling Programs</h2>
              <p className="text-gray-500 max-w-xl mx-auto mb-6 leading-relaxed">
                Manage recycling across all your facilities with a single point of contact. We provide consolidated billing, standardized compliance documentation, and consistent service levels across every city in our network.
              </p>
              <div className="flex gap-2.5 justify-center flex-wrap">
                <Link href="/services/business-recycling-programs" className="btn-primary">Business Recycling Programs <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
                <Link href="/get-a-quote" className="btn-outline">Get a Multi-Location Quote</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-50">
        <div className="container-rq">
          <ScrollReveal><SectionHeader tag="FAQ" tagIcon="help" title="Location & Service Area Questions" /></ScrollReveal>
          <ScrollReveal><FAQAccordion items={FAQS} /></ScrollReveal>
        </div>
      </section>

      <CTABlock title="Don't See Your City?" subtitle="Our network is expanding. Contact us to check availability in your area — we may already have a certified partner nearby." primaryLabel="Check Availability" primaryHref="/get-a-quote" />
    </>
  );
}
