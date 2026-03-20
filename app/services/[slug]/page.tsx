import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getServicePage, getContact, getIndustryImages } from '@/lib/queries';
import { SERVICE_PAGES } from '@/lib/service-pages'; // Keep for generateStaticParams + generateMetadata
import { INDUSTRIES } from '@/lib/data'; // Keep for generateMetadata
import { JsonLd, serviceSchema, faqPageSchema, webPageSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PageHero from '@/components/ui/PageHero';
import { CTABlock, FAQAccordion, ScrollReveal } from '@/components/ui';

export function generateStaticParams() {
  return Object.keys(SERVICE_PAGES).map(slug => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = SERVICE_PAGES[params.slug];
  if (!page) return {};
  return {
    title: page.titleTag,
    description: page.metaDescription,
    alternates: { canonical: `https://recyclingquotes.com/services/${page.slug}` },
    openGraph: { title: `${page.titleTag} | Recycling Quotes`, description: page.metaDescription, url: `https://recyclingquotes.com/services/${page.slug}` },
  };
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  // ⚡ DATA FROM SUPABASE
  const page = await getServicePage(params.slug) as any;
  if (!page) notFound();

  const contact = await getContact();
  const CONTACT = { phone: contact.phone || '817-946-5655', phoneHref: contact.phone_href || 'tel:8179465655' };

  const indImages = await getIndustryImages();
  const h = page.headlines;
  const industryImages = page.industries.map((ind: any) => ({
    ...ind,
    image: indImages[ind.slug] || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
  }));

  const stepCount = page.process.length;

  return (
    <>
      <JsonLd data={serviceSchema({ slug: page.slug, name: page.name, description: page.definition, offers: page.materials.map(m => ({ name: `${m.name} Recycling`, url: `/${page.slug}/${m.slug}` })) })} />
      <JsonLd data={faqPageSchema(page.faqs.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={webPageSchema({ path: `/services/${page.slug}`, name: page.h1, description: page.metaDescription })} />
      <Breadcrumbs items={[{ name: 'Services', href: '/services' }, { name: page.name, href: `/services/${page.slug}` }]} />

      {/* HERO */}
      <PageHero tag={page.name} tagIcon={page.icon} title={page.h1.split('—')[0].trim()} titleAccent={page.h1.includes('—') ? page.h1.split('—')[1].trim() : ''} description={page.definition} image={page.heroImage} />

      {/* ═══ OVERVIEW ═══ */}
      <section className="py-24 bg-white">
        <div className="container-rq max-w-4xl">
          <ScrollReveal>
            <div className="section-tag mb-4"><span className="material-symbols-outlined text-[14px]">info</span> Overview</div>
            <h2 className="section-title mb-8">{h.overview}</h2>
          </ScrollReveal>
          {page.overview.map((p, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <p className="definition-block text-gray-500 text-[15px] leading-relaxed mb-4">{p}</p>
            </ScrollReveal>
          ))}
          <ScrollReveal>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {page.differentiators.slice(0, 4).map(d => (
                <div key={d} className="flex items-start gap-2.5 p-3 bg-primary-50 rounded-[10px]">
                  <span className="material-symbols-outlined text-[16px] text-primary mt-0.5 shrink-0">check</span>
                  <span className="text-[13px] text-gray-700 font-medium">{d}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ WHAT WE ACCEPT — full-width prominent panel ═══ */}
      {page.acceptedItems && (
        <section className="py-20 bg-dark-bg relative overflow-hidden">
          <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.08) 0%, transparent 60%)' }} />
          <div className="container-rq relative z-10">
            <ScrollReveal>
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 items-start">
                <div>
                  <h2 className="text-2xl font-extrabold text-white mb-3" style={{ letterSpacing: '-0.025em' }}>What We Accept</h2>
                  <p className="text-dark-text text-[15px] leading-relaxed mb-5">Everything we process goes through certified facilities with full documentation.</p>
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
      )}

      {/* ═══ PROCESS — always one row ═══ */}
      <section className="py-24 bg-gray-50">
        <div className="container-rq">
          <ScrollReveal>
            <div className="section-tag mb-4"><span className="material-symbols-outlined text-[14px]">timeline</span> Process</div>
            <h2 className="section-title mb-10">{h.process}</h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="process-summary flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
              {page.process.map((step, i) => (
                <div key={i} className={`bg-white border border-gray-200 rounded-[20px] p-5 shrink-0 snap-start ${stepCount <= 4 ? 'flex-1 min-w-[220px]' : 'w-[240px] lg:flex-1 lg:w-auto lg:min-w-0'}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-dark-bg text-[#4ADE80] text-[13px] font-extrabold rounded-full shrink-0">{i + 1}</div>
                    <h3 className="font-extrabold text-gray-800 text-[14px]" style={{ letterSpacing: '-0.015em' }}>{step.title}</h3>
                  </div>
                  <p className="text-[12px] text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal><div className="mt-8"><Link href="/schedule-pickup" className="btn-primary">Schedule a Pickup <span className="material-symbols-outlined text-[16px]">calendar_month</span></Link></div></ScrollReveal>
        </div>
      </section>

      {/* ═══ CHALLENGES — dark split ═══ */}
      <section className="py-24 bg-dark-bg relative overflow-hidden">
        <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.08) 0%, transparent 60%)' }} />
        <div className="container-rq relative z-10">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-center">
              <div>
                <h2 className="section-title !text-white mb-3">{h.challenges}</h2>
                <p className="text-dark-text text-[15px] leading-relaxed">{h.challengesSubtitle}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {page.challenges.map(ch => (
                  <Link key={ch.slug} href={`/challenges/${ch.slug}`} className="block bg-dark-card border border-dark-border rounded-[20px] p-6 group hover:border-[rgba(74,222,128,.2)] hover:-translate-y-1 transition-all duration-300">
                    <h3 className="font-extrabold text-white mb-2 text-[15px]" style={{ letterSpacing: '-0.015em' }}>{ch.title}</h3>
                    <p className="text-[12px] text-gray-400 leading-relaxed mb-3">{ch.pain}</p>
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
          <div><h3 className="text-white font-extrabold text-lg" style={{ letterSpacing: '-0.02em' }}>Ready to get started?</h3><p className="text-white/70 text-[13px] mt-0.5">Free quotes within 24 hours. No obligation.</p></div>
          <div className="flex gap-2.5 shrink-0">
            <Link href="/get-a-quote" className="btn-white">Get a Quote <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
            <a href={CONTACT.phoneHref} className="btn-outline-white"><span className="material-symbols-outlined text-[16px]">phone</span> {CONTACT.phone}</a>
          </div>
        </div>
      </section>

      {/* ═══ INDUSTRIES + MATERIALS — side by side ═══ */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16">
            <div>
              <ScrollReveal>
                <h2 className="section-title mb-6">{h.industries}</h2>
              </ScrollReveal>
              <div className="space-y-3">
                {industryImages.map((ind, i) => (
                  <ScrollReveal key={ind.slug} delay={i * 60}>
                    <Link href={`/industries/${ind.slug}`} className="flex gap-5 bg-gray-50 border border-gray-100 rounded-[16px] p-4 group hover:bg-white hover:border-primary-light hover:shadow-md transition-all duration-300 relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
                      <div className="w-14 h-14 rounded-[12px] overflow-hidden shrink-0">
                        <Image src={ind.image} alt={ind.name} width={56} height={56} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-extrabold text-gray-800 mb-0.5 text-[15px]" style={{ letterSpacing: '-0.015em' }}>{ind.name}</h3>
                        <p className="text-[12px] text-gray-400 leading-relaxed line-clamp-2">{ind.context}</p>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
            <div>
              <ScrollReveal>
                <h2 className="text-xl font-extrabold text-gray-800 mb-5" style={{ letterSpacing: '-0.02em' }}>{h.materials}</h2>
              </ScrollReveal>
              <div className="space-y-2.5">
                {page.materials.map((mat, i) => (
                  <ScrollReveal key={mat.slug} delay={i * 40}>
                    <Link href={`/materials/${mat.slug}`} className={`block ${mat.description ? 'bg-gray-50 border border-gray-100 rounded-[16px] p-5' : 'px-4 py-3 bg-gray-50 border border-gray-100 rounded-[10px]'} group hover:border-primary hover:bg-white hover:shadow-md transition-all duration-200 relative overflow-hidden`}>
                      {mat.description && <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />}
                      <span className="text-[14px] font-bold text-gray-700 group-hover:text-primary transition-colors block">{mat.name}</span>
                      {mat.description && <span className="text-[12px] text-gray-400 leading-relaxed mt-1 block">{mat.description}</span>}
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LOCATIONS — full-width prominent section ═══ */}
      <section className="py-20 bg-primary-50 border-y border-primary-light">
        <div className="container-rq">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
              <div>
                <h2 className="section-title mb-2">{h.locations}</h2>
                <p className="text-gray-500 text-[15px]">Free pickup and same-day quotes in these cities and 85+ more.</p>
              </div>
              <Link href="/locations" className="btn-outline shrink-0">View All 97+ Locations <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {page.topLocations.map(loc => (
                <Link key={loc.slug} href={`/${page.slug}/${loc.slug}`} className="px-5 py-4 bg-white border border-gray-200 rounded-[12px] group hover:border-primary hover:shadow-md transition-all duration-200">
                  <span className="block text-[14px] font-bold text-gray-800 group-hover:text-primary transition-colors" style={{ letterSpacing: '-0.01em' }}>{loc.name}</span>
                  <span className="block text-[11px] text-gray-400 mt-0.5">{page.name}</span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ RESULTS ═══ */}
      <section className="py-24 bg-dark-bg relative overflow-hidden">
        <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.08) 0%, transparent 60%)' }} />
        <div className="container-rq relative z-10">
          <ScrollReveal>
            <h2 className="section-title !text-white mb-10">{h.results}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {page.caseStudies.map((cs, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="stats-block bg-dark-card border border-dark-border rounded-[20px] p-7 hover:border-[rgba(74,222,128,.15)] hover:-translate-y-0.5 transition-all duration-300 h-full">
                  <div className="text-[11px] font-bold uppercase tracking-[.08em] text-[#4ADE80] mb-3">{cs.industry}</div>
                  <h3 className="font-extrabold text-white mb-3 text-[15px] leading-snug">{cs.title}</h3>
                  <p className="text-[13px] text-gray-400 leading-relaxed">{cs.metric}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
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
                <Link href={`/services/${page.slug}/faqs`} className="btn-outline text-[13px]">View All FAQs <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
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
