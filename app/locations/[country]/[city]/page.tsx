import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CONTACT, LOCATIONS, SERVICES } from '@/lib/data';
import { SERVICE_LOCATION_CONFIGS, STATE_CONTEXT } from '@/lib/service-locations';
import { JsonLd, webPageSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { CTABlock, ScrollReveal } from '@/components/ui';

function findCity(country: string, citySlug: string) {
  const c = LOCATIONS.find(l => l.slug === country);
  if (!c) return null;
  const metro = c.metros.find(m => m.slug === citySlug);
  if (!metro) return null;
  return { ...metro, country: c.slug, countryName: c.name };
}

function getServicesForCity(citySlug: string) {
  const services: { slug: string; name: string; hasIntersection: boolean }[] = [];
  const coveredSlugs = new Set<string>();

  for (const config of SERVICE_LOCATION_CONFIGS) {
    if (config.locations.includes(citySlug)) {
      services.push({ slug: config.serviceSlug, name: config.serviceName, hasIntersection: true });
      coveredSlugs.add(config.serviceSlug);
    }
  }

  // Add remaining services without intersection pages
  for (const svc of SERVICES) {
    if (!coveredSlugs.has(svc.slug)) {
      services.push({ slug: svc.slug, name: svc.name, hasIntersection: false });
    }
  }

  return services;
}

export function generateStaticParams() {
  const params: { country: string; city: string }[] = [];
  for (const country of LOCATIONS) {
    for (const metro of country.metros) {
      params.push({ country: country.slug, city: metro.slug });
    }
  }
  return params;
}

export function generateMetadata({ params }: { params: { country: string; city: string } }): Metadata {
  const city = findCity(params.country, params.city);
  if (!city) return {};
  const label = `${city.name}${city.state ? `, ${city.state}` : ''}`;
  return {
    title: `Recycling Services in ${label} — Free Quotes`,
    description: `Commercial recycling services in ${label}. Scrap metal, electronics, dumpsters, hazardous waste, and more. Free pickup. Call ${CONTACT.phone}.`,
    alternates: { canonical: `https://recyclingquotes.com/locations/${params.country}/${city.slug}` },
  };
}

export default function CityPage({ params }: { params: { country: string; city: string } }) {
  const city = findCity(params.country, params.city);
  if (!city) notFound();

  const label = `${city.name}${city.state ? `, ${city.state}` : ''}`;
  const stateCtx = city.state ? STATE_CONTEXT[city.state] : null;
  const services = getServicesForCity(params.city);
  const localServices = services.filter(s => s.hasIntersection);
  const otherServices = services.filter(s => !s.hasIntersection);

  return (
    <>
      <JsonLd data={webPageSchema({ path: `/locations/${params.country}/${city.slug}`, name: `Recycling Services in ${label}`, description: `Commercial recycling in ${label}.` })} />
      <Breadcrumbs items={[
        { name: 'Locations', href: '/locations' },
        { name: city.countryName, href: '/locations' },
        { name: city.name, href: `/locations/${params.country}/${city.slug}` },
      ]} />

      {/* Hero */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary-50 via-[#FAFCFB] to-white">
        <div className="container-rq">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="section-tag mb-5">
                <span className="material-symbols-outlined text-[14px]">location_on</span> {city.countryName}
              </div>
              <h1 className="font-extrabold text-gray-800 leading-[1.08] mb-5" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', letterSpacing: '-0.035em' }}>
                Recycling Services in <span className="text-primary">{label}</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <p className="definition-block text-gray-500 text-[16px] leading-relaxed mb-4">
                Recycling Quotes provides commercial recycling services throughout the {city.name} metropolitan area — from scrap metal and electronics recycling to dumpster rental, document shredding, and hazardous waste disposal. Free pickup for qualifying commercial volumes.
              </p>
              {stateCtx && (
                <p className="text-gray-500 text-[15px] leading-relaxed mb-8">
                  {stateCtx.localIndustries} {stateCtx.regulations.split('.')[0]}.
                </p>
              )}
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <div className="flex gap-2.5 flex-wrap">
                <Link href="/get-a-quote" className="btn-primary">Get a Free Quote <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
                <a href={CONTACT.phoneHref} className="btn-outline"><span className="material-symbols-outlined text-[16px]">phone</span> {CONTACT.phone}</a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services with local pages */}
      {localServices.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container-rq">
            <ScrollReveal>
              <h2 className="section-title mb-3">Services Available in {city.name}</h2>
              <p className="text-gray-400 text-[15px] mb-10">Click any service for {city.name}-specific details, pricing, and local regulations.</p>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {localServices.map((svc, i) => (
                <ScrollReveal key={svc.slug} delay={i * 40}>
                  <Link href={`/${svc.slug}/${city.slug}`} className="block bg-gray-50 border border-gray-100 rounded-[20px] p-6 group hover:bg-white hover:border-primary-light hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-full">
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
                    <h3 className="font-extrabold text-gray-800 mb-1 group-hover:text-primary transition-colors" style={{ letterSpacing: '-0.015em' }}>{svc.name}</h3>
                    <p className="text-[13px] text-gray-400">in {city.name}</p>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All other services */}
      {otherServices.length > 0 && (
        <section className={`py-20 ${localServices.length > 0 ? 'bg-gray-50' : 'bg-white'}`}>
          <div className="container-rq">
            <ScrollReveal>
              <h2 className="text-xl font-extrabold text-gray-800 mb-6" style={{ letterSpacing: '-0.02em' }}>
                {localServices.length > 0 ? 'Additional Services' : `Services in ${city.name}`}
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {otherServices.map((svc, i) => (
                <ScrollReveal key={svc.slug} delay={i * 30}>
                  <Link href={`/services/${svc.slug}`} className="block px-4 py-3.5 bg-white border border-gray-200 rounded-[12px] group hover:border-primary hover:shadow-md transition-all duration-200">
                    <span className="text-[13px] font-bold text-gray-700 group-hover:text-primary transition-colors">{svc.name}</span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Local context */}
      {stateCtx && (
        <section className="py-20 bg-dark-bg relative overflow-hidden">
          <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.08) 0%, transparent 60%)' }} />
          <div className="container-rq relative z-10 max-w-3xl">
            <ScrollReveal>
              <h2 className="text-2xl font-extrabold text-white mb-4" style={{ letterSpacing: '-0.025em' }}>Recycling Regulations in {stateCtx.state}</h2>
              <p className="text-dark-text text-[15px] leading-relaxed mb-6">{stateCtx.regulations}</p>
              <div className="flex gap-2.5 flex-wrap">
                <Link href="/about/certifications" className="inline-flex items-center gap-1 text-[13px] font-bold text-[#4ADE80] hover:gap-2 transition-all">Our Certifications <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
                <Link href="/challenges/ewaste-compliance" className="inline-flex items-center gap-1 text-[13px] font-bold text-[#4ADE80] hover:gap-2 transition-all">E-Waste Compliance Guide <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Quick info */}
      <section className="py-20 bg-primary-50 border-y border-primary-light">
        <div className="container-rq">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { stat: 'Free', label: 'Commercial pickup', detail: 'For qualifying volumes' },
              { stat: '24hr', label: 'Quote turnaround', detail: 'Often same-day' },
              { stat: 'R2', label: 'Certified processors', detail: 'In the ' + city.name + ' area' },
              { stat: '17', label: 'Recycling services', detail: 'Available in ' + city.name },
            ].map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 60}>
                <div className="text-center bg-white border border-gray-200 rounded-[16px] p-5 hover:shadow-md transition-all duration-300">
                  <div className="text-xl font-extrabold text-primary mb-1" style={{ letterSpacing: '-0.03em' }}>{s.stat}</div>
                  <div className="text-[13px] font-bold text-gray-700">{s.label}</div>
                  <div className="text-[11px] text-gray-400">{s.detail}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTABlock title={`Get a Recycling Quote in ${city.name}`} subtitle={`Free quotes within 24 hours. Free commercial pickup in the ${city.name} metro area. Call ${CONTACT.phone} for immediate assistance.`} />
    </>
  );
}
