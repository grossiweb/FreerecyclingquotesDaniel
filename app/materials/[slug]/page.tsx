import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CONTACT, INDUSTRIES } from '@/lib/data';
import { MATERIAL_PAGES } from '@/lib/material-pages';
import { JsonLd, faqPageSchema, webPageSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PageHero from '@/components/ui/PageHero';
import { CTABlock, FAQAccordion, ScrollReveal } from '@/components/ui';

export function generateStaticParams() {
  return Object.keys(MATERIAL_PAGES).map(slug => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = MATERIAL_PAGES[params.slug];
  if (!page) return {};
  return {
    title: page.titleTag,
    description: page.metaDescription,
    alternates: { canonical: `https://recyclingquotes.com/materials/${page.slug}` },
  };
}

export default function MaterialPage({ params }: { params: { slug: string } }) {
  const page = MATERIAL_PAGES[params.slug];
  if (!page) notFound();

  const h = page.headlines;
  const industryImages = page.industries.map(ind => {
    const full = INDUSTRIES.find(i => i.slug === ind.slug);
    return { ...ind, image: full?.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop' };
  });

  return (
    <>
      <JsonLd data={webPageSchema({ path: `/materials/${page.slug}`, name: page.h1, description: page.metaDescription })} />
      <JsonLd data={faqPageSchema(page.faqs.map(f => ({ question: f.q, answer: f.a })))} />
      <Breadcrumbs items={[{ name: 'Materials', href: '/materials' }, { name: page.name, href: `/materials/${page.slug}` }]} />

      {/* HERO */}
      <PageHero tag={`${page.name} Recycling`} tagIcon={page.icon} title={page.h1.split('—')[0].trim()} titleAccent={page.h1.includes('—') ? page.h1.split('—')[1].trim() : ''} description={page.definition} image={page.heroImage} />

      {/* ═══ OVERVIEW ═══ */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <div className="max-w-3xl">
            <ScrollReveal>
              <h2 className="section-title mb-8">{h.overview}</h2>
            </ScrollReveal>
            {page.overview.map((p, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <p className="definition-block text-gray-500 text-[15px] leading-relaxed mb-4">{p}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SUB-TYPES ═══ */}
      {page.subTypes && page.subTypes.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="container-rq">
            <ScrollReveal>
              <h2 className="section-title mb-10">{h.subTypes}</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {page.subTypes.map((sub, i) => (
                <ScrollReveal key={sub.slug} delay={i * 50}>
                  <Link href={`/materials/${page.slug}/${sub.slug}`} className="block bg-white border border-gray-200 rounded-[20px] p-6 group hover:border-primary-light hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-full">
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
                    <h3 className="font-extrabold text-gray-800 mb-2 group-hover:text-primary transition-colors" style={{ letterSpacing: '-0.015em' }}>{sub.name}</h3>
                    <p className="text-[13px] text-gray-400 leading-relaxed mb-3">{sub.description}</p>
                    <span className="inline-flex items-center gap-1 text-[13px] font-bold text-primary group-hover:gap-2 transition-all">Learn more <span className="material-symbols-outlined text-[14px]">arrow_forward</span></span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ ACCEPTED ITEMS — dark panel ═══ */}
      <section className="py-20 bg-dark-bg relative overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.08) 0%, transparent 60%)' }} />
        <div className="container-rq relative z-10">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 items-start">
              <div>
                <h2 className="text-2xl font-extrabold text-white mb-3" style={{ letterSpacing: '-0.025em' }}>{h.acceptedItems}</h2>
                <p className="text-dark-text text-[15px] leading-relaxed mb-5">Processed through certified facilities with full documentation.</p>
                <div className="flex flex-wrap gap-2">
                  {page.certifications.map(cert => (
                    <Link key={cert} href="/about/certifications" className="inline-block px-3 py-1.5 bg-dark-card border border-dark-border rounded-full text-[11px] font-bold text-gray-400 hover:border-[rgba(74,222,128,.3)] hover:text-[#4ADE80] transition-colors">{cert}</Link>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {page.acceptedItems.map(item => (
                  <div key={item} className="flex items-start gap-3 px-4 py-3 bg-dark-card border border-dark-border rounded-[10px]">
                    <span className="material-symbols-outlined text-[16px] text-[#4ADE80] mt-0.5 shrink-0">check_circle</span>
                    <span className="text-[14px] text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ PROCESS — one row ═══ */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <ScrollReveal><h2 className="section-title mb-10">{h.process}</h2></ScrollReveal>
          <ScrollReveal>
            <div className="process-summary flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
              {page.process.map((step, i) => (
                <div key={i} className="bg-gray-50 border border-gray-100 rounded-[20px] p-5 shrink-0 snap-start flex-1 min-w-[200px] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-dark-bg text-[#4ADE80] text-[13px] font-extrabold rounded-full shrink-0">{i + 1}</div>
                    <h3 className="font-extrabold text-gray-800 text-[14px]" style={{ letterSpacing: '-0.015em' }}>{step.title}</h3>
                  </div>
                  <p className="text-[12px] text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ WHY RECYCLE — stats with visual punch ═══ */}
      <section className="py-20 bg-dark-bg relative overflow-hidden">
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.08) 0%, transparent 60%)' }} />
        <div className="container-rq relative z-10">
          <ScrollReveal><h2 className="section-title !text-white mb-10">{h.whyRecycle}</h2></ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {page.whyRecycle.map((item, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="bg-dark-card border border-dark-border rounded-[20px] p-6 text-center hover:border-[rgba(74,222,128,.15)] transition-all duration-300">
                  <div className="text-2xl lg:text-3xl font-extrabold text-[#4ADE80] mb-2" style={{ letterSpacing: '-0.03em' }}>{item.stat}</div>
                  <p className="text-[12px] text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* MID CTA */}
      <section className="py-10 bg-primary">
        <div className="container-rq flex flex-col md:flex-row items-center justify-between gap-5">
          <div><h3 className="text-white font-extrabold text-lg" style={{ letterSpacing: '-0.02em' }}>Ready to recycle {page.name.toLowerCase()}?</h3><p className="text-white/70 text-[13px] mt-0.5">Free quotes within 24 hours. Free pickup for commercial volumes.</p></div>
          <div className="flex gap-2.5 shrink-0">
            <Link href="/get-a-quote" className="btn-white">Get a Quote <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
            <a href={CONTACT.phoneHref} className="btn-outline-white"><span className="material-symbols-outlined text-[16px]">phone</span> {CONTACT.phone}</a>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES + CHALLENGES — split with card design ═══ */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16">
            <div>
              <ScrollReveal><h2 className="section-title mb-6">{h.services}</h2></ScrollReveal>
              <div className="space-y-3">
                {page.services.map((svc, i) => (
                  <ScrollReveal key={svc.slug} delay={i * 60}>
                    <Link href={`/services/${svc.slug}`} className="block bg-gray-50 border border-gray-100 rounded-[20px] p-6 group hover:bg-white hover:border-primary-light hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
                      <h3 className="font-extrabold text-gray-800 mb-1.5" style={{ letterSpacing: '-0.015em' }}>{svc.name}</h3>
                      <p className="text-[13px] text-gray-400 leading-relaxed">{svc.context}</p>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
            <div>
              <ScrollReveal><h2 className="text-xl font-extrabold text-gray-800 mb-6" style={{ letterSpacing: '-0.02em' }}>{h.challenges}</h2></ScrollReveal>
              <div className="space-y-3">
                {page.challenges.map((ch, i) => (
                  <ScrollReveal key={ch.slug} delay={i * 60}>
                    <Link href={`/challenges/${ch.slug}`} className="block bg-gray-50 border border-gray-100 rounded-[20px] p-6 group hover:bg-white hover:border-primary-light hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
                      <h3 className="font-extrabold text-gray-800 mb-1.5" style={{ letterSpacing: '-0.015em' }}>{ch.title}</h3>
                      <p className="text-[13px] text-gray-400 leading-relaxed">{ch.pain}</p>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ INDUSTRIES ═══ */}
      <section className="py-24 bg-gray-50">
        <div className="container-rq">
          <ScrollReveal><h2 className="section-title mb-10">{h.industries}</h2></ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {industryImages.map((ind, i) => (
              <ScrollReveal key={ind.slug} delay={i * 60}>
                <Link href={`/industries/${ind.slug}`} className="flex gap-5 bg-white border border-gray-200 rounded-[20px] p-6 group hover:border-primary-light hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
                  <div className="w-16 h-16 rounded-[14px] overflow-hidden shrink-0">
                    <Image src={ind.image} alt={ind.name} width={64} height={64} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-extrabold text-gray-800 mb-1 group-hover:text-primary transition-colors" style={{ letterSpacing: '-0.015em' }}>{ind.name}</h3>
                    <p className="text-[13px] text-gray-400 leading-relaxed">{ind.context}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CITY LINKS — prominent panel ═══ */}
      <section className="py-20 bg-primary-50 border-y border-primary-light">
        <div className="container-rq">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
              <div>
                <h2 className="section-title mb-2">{h.cityLinks}</h2>
                <p className="text-gray-500 text-[15px]">Free pickup and same-day quotes in these cities and more.</p>
              </div>
              <Link href="/locations" className="btn-outline shrink-0">View All 97+ Locations <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
              {page.cityLinks.map(city => (
                <Link key={city.slug} href={`/${city.urlPrefix}/${city.slug}`} className="px-5 py-4 bg-white border border-gray-200 rounded-[14px] group hover:border-primary hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                  <span className="block text-[14px] font-bold text-gray-800 group-hover:text-primary transition-colors" style={{ letterSpacing: '-0.01em' }}>{city.name}</span>
                  <span className="block text-[11px] text-gray-400 mt-0.5">{page.name} Recycling</span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ FAQ — split layout ═══ */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
            <ScrollReveal>
              <div className="lg:sticky lg:top-[120px]">
                <h2 className="section-title mb-4">{h.faq}</h2>
                <p className="text-gray-400 text-[15px] leading-relaxed mb-6">{h.faqSubtitle}</p>
                <Link href={`/materials/${page.slug}/faqs`} className="btn-outline text-[13px]">View All FAQs <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}><FAQAccordion items={page.faqs} /></ScrollReveal>
          </div>
        </div>
      </section>

      <CTABlock title={h.cta} subtitle={h.ctaSubtitle} />
    </>
  );
}
