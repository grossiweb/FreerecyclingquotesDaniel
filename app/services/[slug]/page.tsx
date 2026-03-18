import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CONTACT, INDUSTRIES } from '@/lib/data';
import { SERVICE_PAGES } from '@/lib/service-pages';
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

export default function ServicePage({ params }: { params: { slug: string } }) {
  const page = SERVICE_PAGES[params.slug];
  if (!page) notFound();

  const h = page.headlines;
  const industryImages = page.industries.map(ind => {
    const full = INDUSTRIES.find(i => i.slug === ind.slug);
    return { ...ind, image: full?.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop' };
  });

  return (
    <>
      <JsonLd data={serviceSchema({ slug: page.slug, name: page.name, description: page.definition, offers: page.materials.map(m => ({ name: `${m.name} Recycling`, url: `/${page.slug}/${m.slug}` })) })} />
      <JsonLd data={faqPageSchema(page.faqs.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={webPageSchema({ path: `/services/${page.slug}`, name: page.h1, description: page.metaDescription })} />
      <Breadcrumbs items={[{ name: 'Services', href: '/services' }, { name: page.name, href: `/services/${page.slug}` }]} />

      {/* HERO */}
      <PageHero tag={page.name} tagIcon={page.icon} title={page.h1.split('—')[0].trim()} titleAccent={page.h1.includes('—') ? page.h1.split('—')[1].trim() : ''} description={page.definition} image={page.heroImage} />

      {/* OVERVIEW — split: content + accepted items sidebar */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16">
            <div>
              <ScrollReveal>
                <div className="section-tag mb-4"><span className="material-symbols-outlined text-[14px]">info</span> Overview</div>
                <h2 className="section-title mb-6">{h.overview}</h2>
              </ScrollReveal>
              {page.overview.map((p, i) => (
                <ScrollReveal key={i} delay={i * 60}>
                  <p className="definition-block text-gray-500 text-[15px] leading-relaxed mb-4">{p}</p>
                </ScrollReveal>
              ))}
              <ScrollReveal>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {page.differentiators.slice(0, 4).map(d => (
                    <div key={d} className="flex items-start gap-2.5 p-3 bg-primary-50 rounded-[10px]">
                      <span className="material-symbols-outlined text-[16px] text-primary mt-0.5 shrink-0">verified</span>
                      <span className="text-[13px] text-gray-700 font-medium">{d}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
            {page.acceptedItems && (
              <ScrollReveal delay={120}>
                <div className="bg-gray-50 border border-gray-100 rounded-[24px] p-7 lg:p-8 lg:sticky lg:top-[120px]">
                  <h3 className="font-extrabold text-gray-800 text-lg mb-5" style={{ letterSpacing: '-0.015em' }}>What We Accept</h3>
                  <div className="space-y-2.5">
                    {page.acceptedItems.map(item => (
                      <div key={item} className="flex items-start gap-2.5"><span className="material-symbols-outlined text-[16px] text-primary mt-0.5 shrink-0">check_circle</span><span className="text-[14px] text-gray-600">{item}</span></div>
                    ))}
                  </div>
                  <div className="mt-6 pt-5 border-t border-gray-200">
                    <p className="text-[12px] text-gray-400 mb-3">Processed through certified facilities:</p>
                    <div className="flex flex-wrap gap-2">
                      {page.certifications.map(cert => (
                        <Link key={cert} href="/about/certifications" className="inline-block px-3 py-1 bg-white border border-gray-200 rounded-full text-[11px] font-bold text-gray-600 hover:border-primary hover:text-primary transition-colors">{cert}</Link>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {/* PROCESS — grid cards */}
      <section className="py-24 bg-gray-50">
        <div className="container-rq">
          <ScrollReveal>
            <div className="section-tag mb-4"><span className="material-symbols-outlined text-[14px]">timeline</span> Process</div>
            <h2 className="section-title mb-10">{h.process}</h2>
          </ScrollReveal>
          <div className="process-summary grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {page.process.map((step, i) => (
              <ScrollReveal key={i} delay={i * 50}>
                <div className="bg-white border border-gray-200 rounded-[20px] p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 h-full">
                  <div className="w-10 h-10 flex items-center justify-center bg-dark-bg text-[#4ADE80] text-[15px] font-extrabold rounded-full mb-4">{i + 1}</div>
                  <h3 className="font-extrabold text-gray-800 mb-2" style={{ letterSpacing: '-0.015em' }}>{step.title}</h3>
                  <p className="text-[13px] text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal><div className="mt-8"><Link href="/schedule-pickup" className="btn-primary">Schedule a Pickup <span className="material-symbols-outlined text-[16px]">calendar_month</span></Link></div></ScrollReveal>
        </div>
      </section>

      {/* CHALLENGES — dark split */}
      <section className="py-24 bg-dark-bg relative overflow-hidden">
        <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.08) 0%, transparent 60%)' }} />
        <div className="container-rq relative z-10">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-[5px] bg-white/10 text-white/80 font-bold rounded-full mb-4" style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}><span className="material-symbols-outlined text-[14px]">psychology</span> Challenges</div>
                <h2 className="section-title !text-white mb-3">{h.challenges}</h2>
                <p className="text-dark-text text-[15px] leading-relaxed">{h.challengesSubtitle}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {page.challenges.map(ch => (
                  <Link key={ch.slug} href={`/challenges/${ch.slug}`} className="block bg-dark-card border border-dark-border rounded-[20px] p-6 group hover:border-[rgba(74,222,128,.2)] hover:-translate-y-1 transition-all duration-300">
                    <span className="material-symbols-outlined text-[24px] text-[#4ADE80] mb-3">psychology</span>
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

      {/* INDUSTRIES + MATERIALS + LOCATIONS — combined */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16">
            <div>
              <ScrollReveal>
                <div className="section-tag mb-4"><span className="material-symbols-outlined text-[14px]">domain</span> Industries</div>
                <h2 className="section-title mb-6">{h.industries}</h2>
              </ScrollReveal>
              <div className="space-y-4">
                {industryImages.map((ind, i) => (
                  <ScrollReveal key={ind.slug} delay={i * 60}>
                    <Link href={`/industries/${ind.slug}`} className="flex gap-5 bg-gray-50 border border-gray-100 rounded-[16px] p-4 group hover:bg-white hover:border-primary-light hover:shadow-md transition-all duration-300 relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
                      <div className="w-16 h-16 rounded-[12px] overflow-hidden shrink-0"><Image src={ind.image} alt={ind.name} width={64} height={64} className="w-full h-full object-cover" /></div>
                      <div className="min-w-0"><h3 className="font-extrabold text-gray-800 mb-0.5 text-[15px]" style={{ letterSpacing: '-0.015em' }}>{ind.name}</h3><p className="text-[12px] text-gray-400 leading-relaxed line-clamp-2">{ind.context}</p></div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
            <div>
              <ScrollReveal>
                <div className="section-tag mb-4"><span className="material-symbols-outlined text-[14px]">category</span> Materials</div>
                <h2 className="text-xl font-extrabold text-gray-800 mb-5" style={{ letterSpacing: '-0.02em' }}>{h.materials}</h2>
              </ScrollReveal>
              <div className="grid grid-cols-2 gap-2.5 mb-12">
                {page.materials.map((mat, i) => (
                  <ScrollReveal key={mat.slug} delay={i * 40}>
                    <Link href={`/materials/${mat.slug}`} className="flex items-center gap-2.5 px-4 py-3 bg-gray-50 border border-gray-100 rounded-[10px] group hover:border-primary hover:bg-white transition-all duration-200">
                      <span className="material-symbols-outlined text-[18px] text-primary">category</span>
                      <span className="text-[13px] font-bold text-gray-700 group-hover:text-primary transition-colors truncate">{mat.name}</span>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
              <ScrollReveal>
                <div className="section-tag mb-4"><span className="material-symbols-outlined text-[14px]">location_on</span> Locations</div>
                <h2 className="text-xl font-extrabold text-gray-800 mb-5" style={{ letterSpacing: '-0.02em' }}>{h.locations}</h2>
              </ScrollReveal>
              <div className="grid grid-cols-2 gap-2.5">
                {page.topLocations.map((loc, i) => (
                  <ScrollReveal key={loc.slug} delay={i * 30}>
                    <Link href={`/${page.slug}/${loc.slug}`} className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-100 rounded-[10px] group hover:border-primary hover:bg-white transition-all duration-200">
                      <span className="material-symbols-outlined text-[16px] text-gray-300 group-hover:text-primary transition-colors">location_on</span>
                      <span className="text-[13px] font-bold text-gray-700 group-hover:text-primary transition-colors truncate">{loc.name}</span>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
              <ScrollReveal><Link href="/locations" className="inline-flex items-center gap-1 mt-4 text-[13px] font-bold text-primary hover:gap-2 transition-all">View all 52+ locations <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link></ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS — dark */}
      <section className="py-24 bg-dark-bg relative overflow-hidden">
        <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.08) 0%, transparent 60%)' }} />
        <div className="container-rq relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-[5px] bg-white/10 text-white/80 font-bold rounded-full mb-4" style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}><span className="material-symbols-outlined text-[14px]">trending_up</span> Results</div>
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

      {/* FAQ — split layout */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
            <ScrollReveal>
              <div className="lg:sticky lg:top-[120px]">
                <div className="section-tag mb-4"><span className="material-symbols-outlined text-[14px]">help</span> FAQ</div>
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
