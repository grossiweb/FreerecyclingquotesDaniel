import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServicePage, getContact } from '@/lib/queries';
import { CONTACT, LOCATIONS, INDUSTRIES } from '@/lib/data'; // Keep for generateStaticParams + generateMetadata
import { SERVICE_PAGES } from '@/lib/service-pages'; // Keep for generateStaticParams + generateMetadata
import { SERVICE_LOCATION_CONFIGS, STATE_CONTEXT } from '@/lib/service-locations'; // Keep for generateStaticParams + generateMetadata
import { JsonLd, faqPageSchema, webPageSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { CTABlock, FAQAccordion, ScrollReveal } from '@/components/ui';

// Find city data across all countries
function findCity(slug: string) {
  for (const country of LOCATIONS) {
    const metro = country.metros.find(m => m.slug === slug);
    if (metro) return { ...metro, country: country.slug, countryName: country.name };
  }
  return null;
}

export function generateStaticParams() {
  const params: { serviceSlug: string; locationSlug: string }[] = [];
  for (const config of SERVICE_LOCATION_CONFIGS) {
    for (const loc of config.locations) {
      params.push({ serviceSlug: config.serviceSlug, locationSlug: loc });
    }
  }
  return params;
}

export function generateMetadata({ params }: { params: { serviceSlug: string; locationSlug: string } }): Metadata {
  const config = SERVICE_LOCATION_CONFIGS.find(c => c.serviceSlug === params.serviceSlug);
  const city = findCity(params.locationSlug);
  if (!config || !city) return {};
  const title = `${config.serviceName} in ${city.name}${city.state ? `, ${city.state}` : ''} — Free Quotes`;
  const desc = `${config.serviceName} in ${city.name} with free commercial pickup, certified processing, and compliance documentation. Same-day quotes. Call ${CONTACT.phone}.`;
  return {
    title, description: desc,
    alternates: { canonical: `https://recyclingquotes.com/${config.serviceSlug}/${city.slug}` },
  };
}

export default async function ServiceLocationPage({ params }: { params: { serviceSlug: string; locationSlug: string } }) {
  const config = SERVICE_LOCATION_CONFIGS.find(c => c.serviceSlug === params.serviceSlug);
  const city = findCity(params.locationSlug);
  const service = SERVICE_PAGES[params.serviceSlug];

  if (!config || !city || !service) notFound();

  // ⚡ CONTACT FROM SUPABASE
  const contactData = await getContact();
  const CONTACT_DB = {
    phone: contactData?.phone || '817-946-5655',
    phoneHref: contactData?.phone_href || 'tel:8179465655',
  };

  const stateCtx = city.state ? STATE_CONTEXT[city.state] : null;
  const cityLabel = `${city.name}${city.state ? `, ${city.state}` : ''}`;

  // Generate locally-framed FAQs (GEO §3.6: unique, not duplicated from parent)
  const localFaqs = [
    { q: `Is ${config.serviceName.toLowerCase()} pickup free in ${city.name}?`, a: `Yes. We offer free ${config.serviceName.toLowerCase()} pickup for qualifying commercial volumes in the ${city.name} metro area. For smaller quantities, contact us at ${CONTACT_DB.phone} for specific terms and minimum requirements in your area.` },
    { q: `How quickly can I get ${config.serviceName.toLowerCase()} service in ${city.name}?`, a: `Most ${config.serviceName.toLowerCase()} pickups in ${city.name} are scheduled within 3-5 business days of quote approval. Same-week and next-day service is often available for urgent needs. Call ${CONTACT_DB.phone} for expedited scheduling.` },
    { q: `What documentation do I receive for ${config.serviceName.toLowerCase()} in ${city.name}?`, a: `Every pickup includes weight documentation and a Certificate of Recycling. For data-bearing equipment, you also receive a Certificate of Destruction. All documentation meets federal and ${stateCtx?.state || 'state'} regulatory requirements.` },
    { q: `What areas around ${city.name} do you serve?`, a: `Our ${city.name} service area covers the entire metro region and surrounding suburbs. If you're within the ${city.name} metropolitan statistical area, we can serve you. Contact us with your zip code for confirmation.` },
    { q: `Do you serve businesses of all sizes in ${city.name}?`, a: `Yes. From small offices to large industrial facilities, we customize our ${config.serviceName.toLowerCase()} service to match your volume and schedule. Multi-location businesses in the ${city.name} area get consolidated billing and reporting.` },
  ];

  // Relevant industries for this service in this city
  const relevantIndustries = service.industries.slice(0, 3);

  return (
    <>
      <JsonLd data={webPageSchema({ path: `/${config.serviceSlug}/${city.slug}`, name: `${config.serviceName} in ${cityLabel}`, description: `${config.serviceName} with free pickup and certified processing in ${cityLabel}.` })} />
      <JsonLd data={faqPageSchema(localFaqs.map((f: any) => ({ question: f.q, answer: f.a })))} />
      <Breadcrumbs items={[
        { name: service.name, href: `/services/${config.serviceSlug}` },
        { name: city.name, href: `/${config.serviceSlug}/${city.slug}` },
      ]} />

      {/* ═══ HERO — green tinted, no image (lighter than service pages) ═══ */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary-50 via-[#FAFCFB] to-white">
        <div className="container-rq">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="section-tag mb-5"><span className="material-symbols-outlined text-[14px]">location_on</span> {cityLabel}</div>
              <h1 className="font-extrabold text-gray-800 leading-[1.08] mb-5" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', letterSpacing: '-0.035em' }}>
                {config.serviceName} in <span className="text-primary">{city.name}</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              {/* GEO §3.6: Opening sentence that directly answers the search query */}
              <p className="definition-block text-gray-500 text-[16px] leading-relaxed mb-8">
                {config.serviceName} in {city.name} is available through Recycling Quotes&apos; certified network, with free commercial pickup and same-day quotes.
                {stateCtx && ` Our ${city.name} operations comply with ${stateCtx.state} regulations and provide full documentation for your compliance records.`}
                {` ${stateCtx?.localIndustries || `The ${city.name} metro area's commercial and industrial sectors generate significant demand for professional recycling services.`}`}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <div className="flex gap-2.5 flex-wrap">
                <Link href="/get-a-quote" className="btn-primary">Get a Free Quote <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
                <a href={CONTACT_DB.phoneHref} className="btn-outline"><span className="material-symbols-outlined text-[16px]">phone</span> {CONTACT_DB.phone}</a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ OVERVIEW + LOCAL CONTEXT ═══ */}
      <section className="py-20 bg-white">
        <div className="container-rq">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12">
            <div>
              <ScrollReveal>
                <h2 className="section-title mb-6">{config.serviceName} Services in {city.name}</h2>
                <p className="text-gray-500 text-[15px] leading-relaxed mb-4">
                  Recycling Quotes provides <Link href={`/services/${config.serviceSlug}`} className="text-primary font-semibold hover:underline">{config.serviceName.toLowerCase()} services</Link> to businesses throughout the {city.name} metropolitan area. Our local network includes certified processing facilities, licensed haulers, and logistics partners dedicated to the {city.name} market.
                </p>
                {stateCtx && (
                  <p className="text-gray-500 text-[15px] leading-relaxed mb-4">
                    <strong className="text-gray-700">{stateCtx.state} Regulatory Context:</strong> {stateCtx.regulations}
                  </p>
                )}
                <p className="text-gray-500 text-[15px] leading-relaxed">
                  Whether you need a one-time pickup or a recurring program, our {city.name} team coordinates everything — scheduling, container delivery, transportation, processing, and documentation. View <Link href={`/locations/${city.country}/${city.slug}`} className="text-primary font-semibold hover:underline">all recycling services available in {city.name}</Link>.
                </p>
              </ScrollReveal>
            </div>
            {/* Quick info sidebar */}
            <ScrollReveal delay={80}>
              <div className="bg-gray-50 border border-gray-100 rounded-[20px] p-6 lg:sticky lg:top-[120px]">
                <h3 className="font-extrabold text-gray-800 mb-4" style={{ letterSpacing: '-0.015em' }}>Service Details</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Service', value: config.serviceName },
                    { label: 'Location', value: cityLabel },
                    { label: 'Pickup', value: 'Free for commercial volumes' },
                    { label: 'Quotes', value: 'Within 24 hours, often same-day' },
                    { label: 'Documentation', value: 'Certificate of Recycling included' },
                  ].map((item: any) => (
                    <div key={item.label} className="flex justify-between items-start gap-3">
                      <span className="text-[12px] text-gray-400 font-medium uppercase tracking-wider shrink-0">{item.label}</span>
                      <span className="text-[13px] text-gray-700 font-medium text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-gray-200">
                  <Link href="/get-a-quote" className="btn-primary w-full justify-center text-[13px]">Get a Quote for {city.name} <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ MATERIALS HANDLED + INDUSTRIES ═══ */}
      <section className="py-20 bg-dark-bg relative overflow-hidden">
        <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.08) 0%, transparent 60%)' }} />
        <div className="container-rq relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Materials */}
            <ScrollReveal>
              <div>
                <h2 className="text-xl font-extrabold text-white mb-6" style={{ letterSpacing: '-0.02em' }}>Materials We Handle in {city.name}</h2>
                <div className="space-y-2.5">
                  {config.materials.map((mat: any) => (
                    <Link key={mat.slug} href={`/materials/${mat.slug}`} className="block px-5 py-3.5 bg-dark-card border border-dark-border rounded-[12px] group hover:border-[rgba(74,222,128,.2)] transition-all duration-200">
                      <span className="text-[14px] font-bold text-white group-hover:text-[#4ADE80] transition-colors">{mat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            {/* Industries in this city */}
            <ScrollReveal delay={80}>
              <div>
                <h2 className="text-xl font-extrabold text-white mb-6" style={{ letterSpacing: '-0.02em' }}>Industries We Serve in {city.name}</h2>
                <div className="space-y-2.5">
                  {relevantIndustries.map((ind: any) => (
                    <Link key={ind.slug} href={`/industries/${ind.slug}`} className="block px-5 py-3.5 bg-dark-card border border-dark-border rounded-[12px] group hover:border-[rgba(74,222,128,.2)] transition-all duration-200">
                      <span className="block text-[14px] font-bold text-white group-hover:text-[#4ADE80] transition-colors">{ind.name}</span>
                      <span className="block text-[12px] text-gray-400 mt-0.5">{ind.context}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ OTHER SERVICES IN THIS CITY (sibling links) ═══ */}
      <section className="py-20 bg-white">
        <div className="container-rq">
          <ScrollReveal>
            <h2 className="section-title mb-8">Other Recycling Services in {city.name}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {config.siblingServices.map((sib: any, i: number) => (
              <ScrollReveal key={sib.slug} delay={i * 60}>
                <Link href={`/${sib.slug}/${city.slug}`} className="block bg-gray-50 border border-gray-100 rounded-[20px] p-6 group hover:bg-white hover:border-primary-light hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
                  <h3 className="font-extrabold text-gray-800 mb-1 group-hover:text-primary transition-colors" style={{ letterSpacing: '-0.015em' }}>{sib.name}</h3>
                  <p className="text-[13px] text-gray-400">in {city.name}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ — locally framed ═══ */}
      <section className="py-20 bg-gray-50">
        <div className="container-rq">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
            <ScrollReveal>
              <div className="lg:sticky lg:top-[120px]">
                <h2 className="section-title mb-4">{config.serviceName} in {city.name} — FAQ</h2>
                <p className="text-gray-400 text-[15px] leading-relaxed">Common questions about {config.serviceName.toLowerCase()} service in the {city.name} area.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}><FAQAccordion items={localFaqs} /></ScrollReveal>
          </div>
        </div>
      </section>

      <CTABlock title={`Get ${config.serviceName} in ${city.name}`} subtitle={`Free quotes within 24 hours. Free commercial pickup in the ${city.name} metro area. Call ${CONTACT_DB.phone} for immediate assistance.`} />
    </>
  );
}
