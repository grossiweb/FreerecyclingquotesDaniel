import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getChallengePage, getAllChallengeSlugs, getContact } from '@/lib/queries';
import { CHALLENGE_PAGES } from '@/lib/challenge-pages'; // Keep for generateStaticParams + generateMetadata during build
import { JsonLd, faqPageSchema, webPageSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PageHero from '@/components/ui/PageHero';
import { CTABlock, FAQAccordion, ScrollReveal } from '@/components/ui';

// Static params still use local data (build-time — Supabase might not be reachable during CI)
export function generateStaticParams() {
  return Object.keys(CHALLENGE_PAGES).map(slug => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = CHALLENGE_PAGES[params.slug];
  if (!page) return {};
  return { title: page.titleTag, description: page.metaDescription, alternates: { canonical: `https://recyclingquotes.com/challenges/${page.slug}` } };
}

export default async function ChallengePage({ params }: { params: { slug: string } }) {
  // ⚡ DATA FROM SUPABASE (was: const page = CHALLENGE_PAGES[params.slug])
  const page = await getChallengePage(params.slug);
  if (!page) notFound();

  const contact = await getContact();
  const CONTACT = {
    phone: contact?.phone || '817-946-5655',
    phoneHref: contact?.phone_href || 'tel:8179465655',
  };

  const h = page.headlines;

  return (
    <>
      <JsonLd data={webPageSchema({ path: `/challenges/${page.slug}`, name: page.h1, description: page.metaDescription })} />
      <JsonLd data={faqPageSchema(page.faqs.map(f => ({ question: f.q, answer: f.a })))} />
      <Breadcrumbs items={[{ name: 'Challenges', href: '/challenges' }, { name: page.name, href: `/challenges/${page.slug}` }]} />

      <PageHero tag="Challenge" tagIcon="psychology" title={page.h1} titleAccent="" description={page.definition} image={page.heroImage} />

      {/* ═══ §1 PROBLEM DEFINITION — stat-heavy, GEO-citable ═══ */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16">
            <div>
              <ScrollReveal>
                <h2 className="challenge-definition section-title mb-8">{h.definition}</h2>
              </ScrollReveal>
              <ScrollReveal>
                <div className="challenge-definition space-y-3 mb-8">
                  {page.consequences.map((c: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-[12px]">
                      <span className="material-symbols-outlined text-[16px] text-red-500 mt-0.5 shrink-0">warning</span>
                      <span className="text-[13px] text-gray-700">{c}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={100}>
              <div className="bg-dark-bg rounded-[24px] p-7 lg:sticky lg:top-[120px]">
                <h3 className="font-extrabold text-white text-lg mb-6" style={{ letterSpacing: '-0.015em' }}>By the Numbers</h3>
                <div className="space-y-5">
                  {page.problemStats.map((s: { stat: string; source: string }, i: number) => (
                    <div key={i} className="stats-block">
                      <div className="text-[13px] text-white font-medium mb-1">{s.stat}</div>
                      <div className="text-[11px] text-gray-500">{s.source}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ §2 WHY IT'S HARD ═══ */}
      <section className="py-24 bg-dark-bg relative overflow-hidden">
        <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.08) 0%, transparent 60%)' }} />
        <div className="container-rq relative z-10">
          <ScrollReveal>
            <h2 className="section-title !text-white mb-3">{h.whyHard}</h2>
            <p className="text-dark-text text-[15px] mb-10">{h.whyHardSub}</p>
          </ScrollReveal>
          <div className="space-y-4">
            {page.barriers.map((b: { title: string; description: string }, i: number) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="bg-dark-card border border-dark-border rounded-[20px] p-7 hover:border-[rgba(74,222,128,.15)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-[rgba(74,222,128,.1)] text-[#4ADE80] text-[13px] font-extrabold rounded-full shrink-0">{i + 1}</div>
                    <h3 className="font-extrabold text-white text-[15px]" style={{ letterSpacing: '-0.015em' }}>{b.title}</h3>
                  </div>
                  <p className="text-[13px] text-gray-400 leading-relaxed ml-11">{b.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ §3 OUR APPROACH ═══ */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <ScrollReveal>
            <h2 className="challenge-approach section-title mb-3">{h.approach}</h2>
            <p className="text-gray-400 text-[15px] mb-8 max-w-2xl">{h.approachSub}</p>
          </ScrollReveal>
          <div className="challenge-approach space-y-4 max-w-3xl mb-12">
            {page.approach.map((p: string, i: number) => (
              <ScrollReveal key={i} delay={i * 60}>
                <p className="text-gray-500 text-[15px] leading-relaxed">{p}</p>
              </ScrollReveal>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {page.services.map((svc: { slug: string; name: string; how: string }, i: number) => (
              <ScrollReveal key={svc.slug} delay={i * 60}>
                <Link href={`/services/${svc.slug}`} className="block bg-gray-50 border border-gray-100 rounded-[20px] p-7 group hover:bg-white hover:border-primary-light hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-full">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
                  <h3 className="font-extrabold text-gray-800 mb-2 group-hover:text-primary transition-colors" style={{ letterSpacing: '-0.015em' }}>{svc.name}</h3>
                  <p className="text-[13px] text-gray-400 leading-relaxed">{svc.how}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="flex flex-wrap gap-2.5 mt-8">
              {page.materials.map((mat: { slug: string; name: string }) => (
                <Link key={mat.slug} href={`/materials/${mat.slug}`} className="px-5 py-3 bg-gray-50 border border-gray-100 rounded-full group hover:border-primary hover:shadow-md transition-all duration-200">
                  <span className="text-[13px] font-bold text-gray-700 group-hover:text-primary transition-colors">{mat.name}</span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* MID CTA */}
      <section className="py-10 bg-primary">
        <div className="container-rq flex flex-col md:flex-row items-center justify-between gap-5">
          <div><h3 className="text-white font-extrabold text-lg" style={{ letterSpacing: '-0.02em' }}>Facing this challenge?</h3><p className="text-white/70 text-[13px] mt-0.5">Free assessment within 24 hours. No obligation.</p></div>
          <div className="flex gap-2.5 shrink-0">
            <Link href="/get-a-quote" className="btn-white">Get a Quote <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
            <a href={CONTACT.phoneHref} className="btn-outline-white"><span className="material-symbols-outlined text-[16px]">phone</span> {CONTACT.phone}</a>
          </div>
        </div>
      </section>

      {/* ═══ §4 INDUSTRY CONSIDERATIONS ═══ */}
      <section className="py-24 bg-dark-bg relative overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.08) 0%, transparent 60%)' }} />
        <div className="container-rq relative z-10">
          <ScrollReveal>
            <h2 className="section-title !text-white mb-3">{h.industries}</h2>
            <p className="text-dark-text text-[15px] mb-10">{h.industriesSub}</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {page.industries.map((ind: { slug: string; name: string; context: string }, i: number) => (
              <ScrollReveal key={ind.slug} delay={i * 60}>
                <Link href={`/industries/${ind.slug}`} className="block bg-dark-card border border-dark-border rounded-[20px] p-7 group hover:border-[rgba(74,222,128,.2)] hover:-translate-y-1 transition-all duration-300 h-full">
                  <h3 className="font-extrabold text-white mb-2 group-hover:text-[#4ADE80] transition-colors" style={{ letterSpacing: '-0.015em' }}>{ind.name}</h3>
                  <p className="text-[13px] text-gray-400 leading-relaxed">{ind.context}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ §5 OUTCOMES ═══ */}
      <section className="py-20 bg-primary-50 border-y border-primary-light">
        <div className="container-rq">
          <ScrollReveal><h2 className="section-title mb-10">{h.outcomes}</h2></ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {page.outcomes.map((item: { metric: string; description: string }, i: number) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="bg-white border border-gray-200 rounded-[20px] p-6 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className="text-xl lg:text-2xl font-extrabold text-primary mb-2" style={{ letterSpacing: '-0.03em' }}>{item.metric}</div>
                  <p className="text-[12px] text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ §6 RESOURCES ═══ */}
      {page.resources.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-rq">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <h2 className="text-xl font-extrabold text-gray-800" style={{ letterSpacing: '-0.02em' }}>Related Resources</h2>
                <div className="flex flex-wrap gap-2.5">
                  {page.resources.map((res: { href: string; title: string; type: string }) => (
                    <Link key={res.href} href={res.href} className="px-5 py-3 bg-gray-50 border border-gray-100 rounded-full group hover:border-primary hover:shadow-md transition-all duration-200">
                      <span className="text-[12px] text-gray-400 font-bold uppercase tracking-wider mr-2">{res.type}</span>
                      <span className="text-[13px] font-bold text-gray-700 group-hover:text-primary transition-colors">{res.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ═══ §7 FAQ ═══ */}
      <section className="py-24 bg-gray-50">
        <div className="container-rq">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
            <ScrollReveal>
              <div className="lg:sticky lg:top-[120px]">
                <h2 className="section-title mb-4">{h.faq}</h2>
                <p className="text-gray-400 text-[15px] leading-relaxed mb-4">{h.faqSub}</p>
                <p className="text-[13px] text-gray-400 mb-6">{page.faqs.length} questions answered</p>
                <Link href={`/challenges/${page.slug}/faqs`} className="btn-outline text-[13px]">View Full FAQ Page <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <FAQAccordion items={page.faqs} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <CTABlock title={h.cta} subtitle={h.ctaSub} />
    </>
  );
}
