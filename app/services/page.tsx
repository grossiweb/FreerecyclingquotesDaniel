import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SERVICES, INDUSTRIES, CONTACT } from '@/lib/data';
import { JsonLd, webPageSchema, faqPageSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { SectionHeader, CTABlock, FAQAccordion, ScrollReveal } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Recycling Services for Every Business',
  description: 'Explore 15+ certified recycling services including pallet recycling, e-waste disposal, dumpster rental, ITAD, and business recycling programs. Free quotes nationwide.',
  alternates: { canonical: 'https://recyclingquotes.com/services' },
  openGraph: {
    title: 'Recycling Services for Every Business | Recycling Quotes',
    description: 'Explore 15+ certified recycling services. Free quotes nationwide.',
    url: 'https://recyclingquotes.com/services',
  },
};

const SERVICE_FAQS = [
  { q: 'What recycling services does Recycling Quotes offer?', a: 'We offer 15+ recycling services including pallet recycling, scrap metal recycling, electronics recycling, dumpster rental, junk removal, IT asset disposition, secure data destruction, business recycling programs, and hazardous waste disposal. All services include free pickup and compliance documentation.' },
  { q: 'Do you provide recycling services nationwide?', a: 'Yes. Our network covers 52+ cities across the United States, plus select metros in Canada, the UK, and Australia. Contact us to confirm service availability in your area.' },
  { q: 'How do I get a recycling quote?', a: 'Request a free quote through our online form or call 817-946-5655. Tell us what materials you need to recycle, your approximate quantity, and your location. We respond within 24 hours with a no-obligation quote.' },
  { q: 'What certifications do your recycling partners hold?', a: 'Our downstream processing partners hold R2, e-Stewards, ISO 14001, and ISO 9001 certifications. For data-bearing devices, we follow NIST 800-88 data destruction standards and provide Certificates of Destruction.' },
  { q: 'Is there a minimum quantity for recycling pickup?', a: 'Minimum quantities vary by material and service type. For most commercial pickups, we can accommodate any volume. Contact us for specific minimums — many materials have no minimum at all.' },
];

const colorMap = { green: 'icon-box-green', amber: 'icon-box-amber', blue: 'icon-box-blue', teal: 'icon-box-teal' } as const;

// Featured services get large visual cards
const FEATURED = ['pallet-recycling', 'dumpster-rental', 'it-asset-disposition', 'electronics-recycling'];
const FEATURED_IMAGES: Record<string, string> = {
  'pallet-recycling': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
  'dumpster-rental': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
  'it-asset-disposition': 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=600&h=400&fit=crop',
  'electronics-recycling': 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop',
};

export default function ServicesPage() {
  const featured = FEATURED.map(slug => SERVICES.find(s => s.slug === slug)!);
  const remaining = SERVICES.filter(s => !FEATURED.includes(s.slug));

  return (
    <>
      <JsonLd data={webPageSchema({ path: '/services', name: 'Recycling Services for Every Business', description: 'Explore 15+ certified recycling services.' })} />
      <JsonLd data={faqPageSchema(SERVICE_FAQS.map(f => ({ question: f.q, answer: f.a })))} />

      <Breadcrumbs items={[{ name: 'Services', href: '/services' }]} />

      {/* ═══ SECTION 1: Hero with background image ═══ */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1600&h=600&fit=crop"
            alt="Recycling facility operations"
            width={1600} height={600}
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/95 via-dark-bg/80 to-dark-bg/60" />
        </div>

        <div className="container-rq relative z-10 py-20 lg:py-28">
          <div className="max-w-2xl">
            <ScrollReveal>
              <div className="section-tag !bg-white/10 !text-white/80 mb-6">
                <span className="material-symbols-outlined text-[14px]">handyman</span> 15+ Certified Services
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h1 className="font-extrabold text-white leading-[1.08] mb-5" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.25rem)', letterSpacing: '-0.035em' }}>
                Recycling Services for <span className="text-[#4ADE80]">Every Business</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <p className="definition-block text-white/70 text-[17px] leading-relaxed max-w-xl mb-8">
                Recycling Quotes connects businesses with certified recycling services for 15+ material types across 52+ cities nationwide. From pallet recycling to IT asset disposition, every service includes free pickup, compliance documentation, and a Certificate of Recycling.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={180}>
              <div className="flex gap-2.5 flex-wrap">
                <Link href="/get-a-quote" className="btn-white">
                  Get a Quote <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
                <Link href="/schedule-pickup" className="btn-outline-white">
                  <span className="material-symbols-outlined text-[16px]">calendar_month</span> Schedule Pickup
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2A: Featured Services — Large Visual Cards ═══ */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <ScrollReveal>
            <SectionHeader tag="Featured" tagIcon="star" title="Our Most Requested Services" subtitle="High-demand recycling services trusted by thousands of businesses." />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featured.map((svc, i) => (
              <ScrollReveal key={svc.slug} delay={i * 80}>
                <Link href={`/services/${svc.slug}`} className="group relative rounded-[20px] overflow-hidden block aspect-[16/10]">
                  <Image
                    src={FEATURED_IMAGES[svc.slug]}
                    alt={svc.name}
                    width={600} height={400}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/40 to-transparent group-hover:from-dark-bg/95 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-[12px] mb-3 ${svc.color === 'green' ? 'bg-[rgba(74,222,128,.15)]' : svc.color === 'amber' ? 'bg-[rgba(251,191,36,.15)]' : 'bg-[rgba(96,165,250,.15)]'}`}>
                      <span className={`material-symbols-outlined text-[24px] ${svc.color === 'green' ? 'text-[#4ADE80]' : svc.color === 'amber' ? 'text-[#FBBF24]' : 'text-[#60A5FA]'}`}>{svc.icon}</span>
                    </div>
                    <h3 className="text-white font-extrabold text-xl mb-1.5" style={{ letterSpacing: '-0.02em' }}>{svc.name}</h3>
                    <p className="text-white/60 text-[13px] leading-relaxed max-w-md">{svc.description}</p>
                    <span className="inline-flex items-center gap-1 mt-3 text-[13px] font-bold text-[#4ADE80] group-hover:gap-2 transition-all">
                      Learn more <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2B: All Other Services — Compact Grid ═══ */}
      <section className="py-24 bg-gray-50">
        <div className="container-rq">
          <ScrollReveal>
            <SectionHeader tag="All Services" tagIcon="grid_view" title="Complete Service Catalog" subtitle="Everything we offer — from core recycling to specialized compliance programs." />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {remaining.map((svc, i) => (
              <ScrollReveal key={svc.slug} delay={Math.min(i * 50, 300)}>
                <Link href={`/services/${svc.slug}`} className="flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-[16px] group hover:border-primary-light hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
                  <div className={`icon-box shrink-0 ${colorMap[svc.color]}`}>
                    <span className="material-symbols-outlined text-[22px]">{svc.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-gray-800 mb-1" style={{ letterSpacing: '-0.015em' }}>{svc.name}</h4>
                    <p className="text-[13px] text-gray-400 leading-relaxed mb-2">{svc.description}</p>
                    <span className="inline-flex items-center gap-1 text-[13px] font-bold text-primary">
                      Learn more <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: Why Choose Us — Dark Split Layout ═══ */}
      <section className="py-24 bg-dark-bg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.08) 0%, transparent 60%)' }} />
        <div className="container-rq relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <div className="section-tag !bg-[rgba(27,122,61,.15)] mb-6">
                  <span className="material-symbols-outlined text-[14px]">verified</span> Why Us
                </div>
                <h2 className="section-title !text-white mb-4">Why Businesses Choose Recycling Quotes</h2>
                <p className="text-dark-text leading-relaxed mb-8">Nationwide coverage, certified processes, and complete compliance documentation — everything you need in a single recycling partner.</p>
              </ScrollReveal>
              <div className="space-y-4">
                {[
                  { icon: 'workspace_premium', title: 'Certified Recyclers', desc: 'R2, e-Stewards, ISO 14001, and NAID certified downstream processors.', link: '/about/certifications' },
                  { icon: 'public', title: 'Nationwide Network', desc: '52+ cities across the US, Canada, UK, and Australia.', link: '/locations' },
                  { icon: 'description', title: 'Compliance Documentation', desc: 'Certificates of Recycling, Destruction, waste manifests, and ESG reporting.', link: '/challenges/esg-reporting' },
                  { icon: 'auto_awesome', title: 'Zero-Waste Guarantee', desc: '92% material recovery rate. Nothing goes to landfill that can be recycled.', link: '/about/our-impact' },
                ].map((item, i) => (
                  <ScrollReveal key={item.title} delay={i * 80}>
                    <Link href={item.link} className="flex items-start gap-4 p-4 rounded-[16px] border border-dark-border group hover:bg-dark-card hover:border-[rgba(74,222,128,.15)] transition-all duration-300">
                      <div className="w-11 h-11 rounded-[8px] bg-[rgba(74,222,128,.1)] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[22px] text-[#4ADE80]">{item.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-extrabold text-white mb-0.5" style={{ letterSpacing: '-0.015em' }}>{item.title}</h3>
                        <p className="text-[13px] text-gray-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Stats column */}
            <ScrollReveal delay={200}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '500K+', label: 'Tons Diverted', icon: 'recycling' },
                  { num: '52+', label: 'Cities Served', icon: 'location_on' },
                  { num: '10K+', label: 'Happy Clients', icon: 'groups' },
                  { num: '15+', label: 'Years Operating', icon: 'schedule' },
                ].map(stat => (
                  <div key={stat.label} className="stats-block bg-dark-card border border-dark-border rounded-[16px] p-6 text-center hover:border-[rgba(74,222,128,.15)] transition-all duration-300">
                    <span className="material-symbols-outlined text-[28px] text-[#4ADE80] mb-2">{stat.icon}</span>
                    <div className="text-2xl font-extrabold text-white" style={{ letterSpacing: '-0.03em' }}>{stat.num}</div>
                    <div className="text-[11px] text-gray-400 font-medium mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: Industries Cross-Link ═══ */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <ScrollReveal>
            <SectionHeader tag="Industries" tagIcon="domain" title="Industries We Serve" subtitle="Every industry has different recycling needs. We tailor programs to your compliance requirements." />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {INDUSTRIES.map((ind, i) => (
              <ScrollReveal key={ind.slug} delay={i * 50}>
                <Link href={`/industries/${ind.slug}`} className="relative rounded-[20px] overflow-hidden aspect-[3/2.2] block group">
                  <Image src={ind.image} alt={ind.name} width={400} height={300} className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5" style={{ background: 'linear-gradient(180deg, transparent 35%, rgba(10,15,12,.88) 100%)' }}>
                    <h3 className="text-white text-[15px] font-extrabold" style={{ letterSpacing: '-0.01em' }}>{ind.name}</h3>
                    <p className="text-white/60 text-[12px] mt-[3px] font-medium">{ind.description}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="text-center mt-8">
              <Link href="/industries" className="btn-outline">View All Industries <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ SECTION 5: FAQ Preview ═══ */}
      <section className="py-24 bg-gray-50">
        <div className="container-rq">
          <ScrollReveal>
            <SectionHeader tag="FAQ" tagIcon="help" title="Common Questions About Our Services" subtitle="Quick answers to the most common recycling service questions." />
          </ScrollReveal>
          <ScrollReveal>
            <FAQAccordion items={SERVICE_FAQS} />
          </ScrollReveal>
          <ScrollReveal>
            <div className="text-center mt-8">
              <Link href="/services/faqs" className="btn-outline">View All Service FAQs <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ SECTION 6: Final CTA ═══ */}
      <CTABlock />
    </>
  );
}
