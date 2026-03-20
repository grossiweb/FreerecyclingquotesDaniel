import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getIndustryPage, getContact } from '@/lib/queries';
import { INDUSTRY_PAGES } from '@/lib/industry-pages'; // Keep for generateStaticParams + generateMetadata
import { JsonLd, faqPageSchema, webPageSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PageHero from '@/components/ui/PageHero';
import { CTABlock, FAQAccordion, ScrollReveal } from '@/components/ui';

export function generateStaticParams() {
  return Object.keys(INDUSTRY_PAGES).map(slug => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = INDUSTRY_PAGES[params.slug];
  if (!page) return {};
  return {
    title: page.titleTag,
    description: page.metaDescription,
    alternates: { canonical: `https://recyclingquotes.com/industries/${page.slug}` },
  };
}

export default async function IndustryPage({ params }: { params: { slug: string } }) {
  // ⚡ DATA FROM SUPABASE
  const page = await getIndustryPage(params.slug) as any;
  if (!page) notFound();

  const contact = await getContact();
  const CONTACT = { phone: contact.phone || '817-946-5655', phoneHref: contact.phone_href || 'tel:8179465655' };
  if (!page) notFound();
  const h = page.headlines;

  return (
    <>
      <JsonLd data={webPageSchema({ path: `/industries/${page.slug}`, name: page.h1, description: page.metaDescription })} />
      <JsonLd data={faqPageSchema(page.faqs.map(f => ({ question: f.q, answer: f.a })))} />
      <Breadcrumbs items={[{ name: 'Industries', href: '/industries' }, { name: page.name, href: `/industries/${page.slug}` }]} />

      <PageHero tag={`${page.name} Recycling`} tagIcon={page.icon} title={page.h1.split('—')[0].trim()} titleAccent={page.h1.includes('—') ? page.h1.split('—')[1].trim() : ''} description={page.definition} image={page.heroImage} />

      {/* ═══ OVERVIEW ═══ */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16">
            <div>
              <ScrollReveal><h2 className="section-title mb-8">{h.overview}</h2></ScrollReveal>
              {page.overview.map((p, i) => (
                <ScrollReveal key={i} delay={i * 60}>
                  <p className="definition-block text-gray-500 text-[15px] leading-relaxed mb-4">{p}</p>
                </ScrollReveal>
              ))}
            </div>
            {/* Quick stats sidebar */}
            <ScrollReveal delay={120}>
              <div className="bg-gray-50 border border-gray-100 rounded-[24px] p-7 lg:sticky lg:top-[120px]">
                <h3 className="font-extrabold text-gray-800 text-lg mb-5" style={{ letterSpacing: '-0.015em' }}>Why {page.name} Chooses Us</h3>
                <div className="space-y-3">
                  {page.services.slice(0, 4).map(svc => (
                    <div key={svc.slug} className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-[16px] text-primary mt-0.5 shrink-0">check</span>
                      <span className="text-[13px] text-gray-600 font-medium">{svc.name}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-gray-200">
                  <Link href="/get-a-quote" className="btn-primary w-full justify-center text-[13px]">Get a {page.name} Quote <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ WASTE PROFILE — dark panel ═══ */}
      <section className="py-20 bg-dark-bg relative overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.08) 0%, transparent 60%)' }} />
        <div className="container-rq relative z-10">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 items-start">
              <div>
                <h2 className="text-2xl font-extrabold text-white mb-3" style={{ letterSpacing: '-0.025em' }}>{h.wasteProfile}</h2>
                <p className="text-dark-text text-[15px] leading-relaxed">Typical waste streams we manage for {page.name.toLowerCase()} operations.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {page.wasteProfile.map(item => (
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

      {/* ═══ CHALLENGES — dark split (not white) ═══ */}
      <section className="py-24 bg-dark-bg relative overflow-hidden border-t border-dark-border">
        <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.08) 0%, transparent 60%)' }} />
        <div className="container-rq relative z-10">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-center">
              <div>
                <h2 className="section-title !text-white mb-3">{h.challenges}</h2>
                <p className="text-dark-text text-[15px] leading-relaxed">{h.challengesSub}</p>
              </div>
              <div className="space-y-3">
                {page.challenges.map((ch, i) => (
                  <Link key={ch.slug} href={`/challenges/${ch.slug}`} className="block bg-dark-card border border-dark-border rounded-[20px] p-6 group hover:border-[rgba(74,222,128,.2)] hover:-translate-y-1 transition-all duration-300">
                    <h3 className="font-extrabold text-white mb-2 text-[15px]" style={{ letterSpacing: '-0.015em' }}>{ch.title}</h3>
                    <p className="text-[13px] text-gray-400 leading-relaxed mb-2">{ch.pain}</p>
                    <span className="inline-flex items-center gap-1 text-[12px] font-bold text-[#4ADE80] group-hover:gap-2 transition-all">Learn more <span className="material-symbols-outlined text-[14px]">arrow_forward</span></span>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* MID CTA */}
      <section className="py-10 bg-primary">
        <div className="container-rq flex flex-col md:flex-row items-center justify-between gap-5">
          <div><h3 className="text-white font-extrabold text-lg" style={{ letterSpacing: '-0.02em' }}>Need a recycling program for {page.name.toLowerCase()}?</h3><p className="text-white/70 text-[13px] mt-0.5">Free quotes within 24 hours. No obligation.</p></div>
          <div className="flex gap-2.5 shrink-0">
            <Link href="/get-a-quote" className="btn-white">Get a Quote <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
            <a href={CONTACT.phoneHref} className="btn-outline-white"><span className="material-symbols-outlined text-[16px]">phone</span> {CONTACT.phone}</a>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES — full width cards with rationale ═══ */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <ScrollReveal><h2 className="section-title mb-10">{h.services}</h2></ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {page.services.map((svc, i) => (
              <ScrollReveal key={svc.slug} delay={i * 60}>
                <Link href={`/services/${svc.slug}`} className="block bg-gray-50 border border-gray-100 rounded-[20px] p-7 group hover:bg-white hover:border-primary-light hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-full">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
                  <h3 className="font-extrabold text-gray-800 mb-2 group-hover:text-primary transition-colors" style={{ letterSpacing: '-0.015em' }}>{svc.name}</h3>
                  <p className="text-[13px] text-gray-400 leading-relaxed">{svc.why}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MATERIALS — green-tinted panel ═══ */}
      <section className="py-16 bg-primary-50 border-y border-primary-light">
        <div className="container-rq">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <h2 className="text-xl font-extrabold text-gray-800" style={{ letterSpacing: '-0.02em' }}>{h.materials}</h2>
              <div className="flex flex-wrap gap-2.5">
                {page.materials.map(mat => (
                  <Link key={mat.slug} href={`/materials/${mat.slug}`} className="px-5 py-3 bg-white border border-gray-200 rounded-full group hover:border-primary hover:shadow-md transition-all duration-200">
                    <span className="text-[13px] font-bold text-gray-700 group-hover:text-primary transition-colors">{mat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ CASE STUDIES — dark ═══ */}
      <section className="py-24 bg-dark-bg relative overflow-hidden">
        <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.08) 0%, transparent 60%)' }} />
        <div className="container-rq relative z-10">
          <ScrollReveal><h2 className="section-title !text-white mb-10">{h.results}</h2></ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {page.caseStudies.map((cs, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="stats-block bg-dark-card border border-dark-border rounded-[20px] p-7 hover:border-[rgba(74,222,128,.15)] hover:-translate-y-0.5 transition-all duration-300">
                  <h3 className="font-extrabold text-white mb-3 text-[15px] leading-snug">{cs.title}</h3>
                  <p className="text-[13px] text-gray-400 leading-relaxed">{cs.metric}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ — split ═══ */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
            <ScrollReveal>
              <div className="lg:sticky lg:top-[120px]">
                <h2 className="section-title mb-4">{h.faq}</h2>
                <p className="text-gray-400 text-[15px] leading-relaxed mb-6">{h.faqSub}</p>
                <Link href={`/industries/${page.slug}/faqs`} className="btn-outline text-[13px]">View All FAQs <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}><FAQAccordion items={page.faqs} /></ScrollReveal>
          </div>
        </div>
      </section>

      <CTABlock title={h.cta} subtitle={h.ctaSub} />
    </>
  );
}
