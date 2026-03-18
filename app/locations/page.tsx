'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LOCATIONS, SERVICES, CONTACT } from '@/lib/data';
import { ScrollReveal } from '@/components/ui';

// Group US metros by region
const US_REGIONS = [
  { label: 'Northeast', metros: ['boston','buffalo','hartford','new-york-city','philadelphia','pittsburgh','providence','rochester','richmond','virginia-beach','washington-dc'] },
  { label: 'Southeast', metros: ['atlanta','birmingham','charlotte','jacksonville','louisville','memphis','miami-fort-lauderdale','nashville','new-orleans','orlando','raleigh-cary','tampa-st-petersburg'] },
  { label: 'Midwest', metros: ['chicago','cincinnati','cleveland','columbus','detroit','indianapolis','kansas-city','milwaukee','minneapolis-st-paul','st-louis'] },
  { label: 'South Central', metros: ['austin','dallas-fort-worth','houston','oklahoma-city','san-antonio'] },
  { label: 'West', metros: ['denver','las-vegas','los-angeles','phoenix','portland-vancouver','riverside-san-bernardino','sacramento','salt-lake-city','san-diego-carlsbad','san-francisco-oakland','san-jose','seattle-tacoma','tucson'] },
];

const usaData = LOCATIONS.find(c => c.slug === 'usa')!;
const totalMetros = LOCATIONS.reduce((sum, c) => sum + c.metros.length, 0);

export default function LocationsPage() {
  const [activeCountry, setActiveCountry] = useState('usa');
  const activeData = LOCATIONS.find(c => c.slug === activeCountry)!;

  return (
    <>
      {/* Hero */}
      <section className="py-16 lg:py-20 bg-dark-bg relative overflow-hidden">
        <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.08) 0%, transparent 60%)' }} />
        <div className="container-rq relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-[5px] bg-white/10 text-white/80 font-bold rounded-full mb-6" style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            <span className="material-symbols-outlined text-[14px]">public</span> {totalMetros}+ Cities Worldwide
          </div>
          <h1 className="font-extrabold text-white leading-[1.08] mb-5" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.25rem)', letterSpacing: '-0.035em' }}>
            Recycling Services <span className="text-[#4ADE80]">Near You</span>
          </h1>
          <p className="definition-block text-dark-text text-[17px] leading-relaxed max-w-xl mx-auto mb-8">
            Free commercial pickup, certified processing, and complete compliance documentation in {totalMetros}+ cities across 4 countries.
          </p>
          <div className="flex gap-2.5 justify-center flex-wrap">
            <Link href="/get-a-quote" className="btn-white">Get a Quote <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
            <a href={CONTACT.phoneHref} className="btn-outline-white"><span className="material-symbols-outlined text-[16px]">phone</span> {CONTACT.phone}</a>
          </div>
        </div>
      </section>

      {/* Country Tabs + Cities */}
      <section className="py-20 bg-white">
        <div className="container-rq">
          {/* Tab buttons with flags */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {LOCATIONS.map(country => (
              <button
                key={country.slug}
                onClick={() => setActiveCountry(country.slug)}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-full font-bold text-[14px] transition-all duration-200 ${
                  activeCountry === country.slug
                    ? 'bg-dark-bg text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="text-xl leading-none">{country.flag}</span>
                {country.name}
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  activeCountry === country.slug
                    ? 'bg-[#4ADE80]/20 text-[#4ADE80]'
                    : 'bg-gray-200 text-gray-500'
                }`}>{country.metros.length}</span>
              </button>
            ))}
          </div>

          {/* USA — grouped by region */}
          {activeCountry === 'usa' && (
            <div>
              {US_REGIONS.map(region => {
                const metros = region.metros
                  .map(slug => usaData.metros.find(m => m.slug === slug))
                  .filter(Boolean);
                return (
                  <div key={region.label} className="mb-10 last:mb-0">
                    <h3 className="text-[12px] font-bold uppercase tracking-[.1em] text-gray-400 mb-4 pb-2 border-b border-gray-100">{region.label}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                      {metros.map(metro => metro && (
                        <Link
                          key={metro.slug}
                          href={`/locations/usa/${metro.slug}`}
                          className="px-4 py-3 rounded-[10px] border border-gray-100 hover:border-primary hover:bg-primary-50 transition-all duration-200 group"
                        >
                          <span className="block text-[14px] font-bold text-gray-800 group-hover:text-primary transition-colors" style={{ letterSpacing: '-0.01em' }}>
                            {metro.name}
                          </span>
                          {metro.state && (
                            <span className="block text-[11px] text-gray-400 mt-0.5">{metro.state}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* International — flat grid, no regions needed */}
          {activeCountry !== 'usa' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{activeData.flag}</span>
                <div>
                  <h2 className="text-xl font-extrabold text-gray-800" style={{ letterSpacing: '-0.02em' }}>{activeData.name}</h2>
                  <p className="text-gray-400 text-[13px]">{activeData.metros.length} cities with recycling services</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {activeData.metros.map(metro => (
                  <Link
                    key={metro.slug}
                    href={`/locations/${activeCountry}/${metro.slug}`}
                    className="px-4 py-3 rounded-[10px] border border-gray-100 hover:border-primary hover:bg-primary-50 transition-all duration-200 group"
                  >
                    <span className="block text-[14px] font-bold text-gray-800 group-hover:text-primary transition-colors" style={{ letterSpacing: '-0.01em' }}>
                      {metro.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Multi-location CTA */}
      <section className="py-20 bg-gray-50">
        <div className="container-rq">
          <div className="bg-dark-bg rounded-[28px] p-10 lg:p-14 relative overflow-hidden">
            <div className="absolute top-[-80px] right-[-80px] w-[300px] h-[300px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.1) 0%, transparent 60%)' }} />
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-center relative z-10">
              <div>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-white mb-3" style={{ letterSpacing: '-0.025em' }}>Manage Recycling Across Every Location</h2>
                <p className="text-dark-text leading-relaxed">One contract, one invoice, one report — across all your facilities. Our multi-location programs provide consistent service levels and consolidated ESG documentation nationwide.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5 lg:justify-end">
                <Link href="/services/business-recycling-programs" className="btn-white">Business Programs <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
                <Link href="/get-a-quote" className="btn-outline-white">Multi-Location Quote</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Services */}
      <section className="py-20 bg-white">
        <div className="container-rq">
          <div className="text-center mb-10">
            <div className="section-tag mb-4"><span className="material-symbols-outlined text-[14px]">handyman</span> Available Everywhere</div>
            <h2 className="section-title">Services Available Across Our Network</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {SERVICES.filter(s => ['scrap-metal-recycling','electronics-recycling','dumpster-rental','junk-removal','pallet-recycling','hazardous-waste-disposal','business-recycling-programs','cardboard-paper-recycling','data-destruction','plastic-recycling'].includes(s.slug)).map(svc => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="flex flex-col items-center gap-2 py-5 px-3 bg-gray-50 border border-gray-100 rounded-[14px] text-center group hover:bg-white hover:border-primary hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <span className="material-symbols-outlined text-[24px] text-primary">{svc.icon}</span>
                <span className="text-[12px] font-bold text-gray-600 group-hover:text-primary transition-colors leading-tight">{svc.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Don't see your city CTA */}
      <section className="py-20 bg-primary">
        <div className="container-rq text-center">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white mb-3" style={{ letterSpacing: '-0.025em' }}>Don&apos;t See Your City?</h2>
          <p className="text-white/70 max-w-lg mx-auto mb-6">Our network is expanding. Contact us to check availability in your area — we may already have a certified partner nearby.</p>
          <div className="flex gap-2.5 justify-center flex-wrap">
            <Link href="/get-a-quote" className="btn-white">Check Availability <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
            <a href={CONTACT.phoneHref} className="btn-outline-white"><span className="material-symbols-outlined text-[16px]">phone</span> {CONTACT.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
