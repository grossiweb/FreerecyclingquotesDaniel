import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES, INDUSTRIES, CONTACT } from '@/lib/data';
import { JsonLd, webPageSchema, faqPageSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { SectionHeader, CTABlock, FAQAccordion, ScrollReveal } from '@/components/ui';

// ─── SEO Metadata (Content Rules §3) ───
export const metadata: Metadata = {
  title: 'Recycling Services for Every Business',
  description: 'Explore 15+ certified recycling services including pallet recycling, e-waste disposal, dumpster rental, ITAD, and business recycling programs. Free quotes nationwide.',
  alternates: { canonical: 'https://recyclingquotes.com/services' },
  openGraph: {
    title: 'Recycling Services for Every Business | Recycling Quotes',
    description: 'Explore 15+ certified recycling services including pallet recycling, e-waste disposal, dumpster rental, ITAD, and business recycling programs. Free quotes nationwide.',
    url: 'https://recyclingquotes.com/services',
  },
};

// ─── Service groupings from Site Architecture v2 (Mega Menu tab) ───
const SERVICE_GROUPS = [
  {
    label: 'Core Recycling',
    slugs: ['pallet-recycling', 'business-recycling-programs', 'material-recycling-solutions', 'scrap-metal-recycling', 'electronics-recycling', 'cardboard-paper-recycling', 'plastic-recycling'],
  },
  {
    label: 'Equipment & Logistics',
    slugs: ['dumpster-rental', 'junk-removal'],
  },
  {
    label: 'Specialized Services',
    slugs: ['it-asset-disposition', 'data-destruction', 'hazardous-waste-disposal', 'waste-audits-consulting'],
  },
  {
    label: 'Programs',
    slugs: ['take-back-programs', 'collection-events'],
  },
];

// ─── FAQ data (unique to services hub — Content Rules §4.3) ───
const SERVICE_FAQS = [
  {
    q: 'What recycling services does Recycling Quotes offer?',
    a: 'We offer 15+ recycling services including pallet recycling, scrap metal recycling, electronics recycling, dumpster rental, junk removal, IT asset disposition, secure data destruction, business recycling programs, and hazardous waste disposal. All services include free pickup and compliance documentation.',
  },
  {
    q: 'Do you provide recycling services nationwide?',
    a: 'Yes. Our network covers 52+ cities across the United States, plus select metros in Canada, the UK, and Australia. Contact us to confirm service availability in your area.',
  },
  {
    q: 'How do I get a recycling quote?',
    a: 'Request a free quote through our online form or call 817-946-5655. Tell us what materials you need to recycle, your approximate quantity, and your location. We respond within 24 hours with a no-obligation quote.',
  },
  {
    q: 'What certifications do your recycling partners hold?',
    a: 'Our downstream processing partners hold R2, e-Stewards, ISO 14001, and ISO 9001 certifications. For data-bearing devices, we follow NIST 800-88 data destruction standards and provide Certificates of Destruction.',
  },
  {
    q: 'Is there a minimum quantity for recycling pickup?',
    a: 'Minimum quantities vary by material and service type. For most commercial pickups, we can accommodate any volume. Contact us for specific minimums — many materials have no minimum at all.',
  },
];

const colorMap = { green: 'icon-box-green', amber: 'icon-box-amber', blue: 'icon-box-blue', teal: 'icon-box-teal' } as const;

export default function ServicesPage() {
  return (
    <>
      {/* JSON-LD: WebPage + FAQPage (Structured Data §3.2) */}
      <JsonLd data={webPageSchema({
        path: '/services',
        name: 'Recycling Services for Every Business',
        description: 'Explore 15+ certified recycling services including pallet recycling, e-waste disposal, dumpster rental, ITAD, and business recycling programs.',
      })} />
      <JsonLd data={faqPageSchema(SERVICE_FAQS.map(f => ({ question: f.q, answer: f.a })))} />

      {/* Breadcrumbs (Build Rules §6, Structured Data §2.3) */}
      <Breadcrumbs items={[{ name: 'Services', href: '/services' }]} />

      {/* ═══ SECTION 1: Hero (Table 1, Row 1) ═══ */}
      <section className="py-16 lg:py-20 bg-[#FAFCFB]">
        <div className="container-rq text-center max-w-3xl mx-auto">
          <ScrollReveal>
            {/* GEO §2.1: Definition-first H1 */}
            <h1 className="font-extrabold text-gray-800 leading-[1.08] mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', letterSpacing: '-0.035em' }}>
              Recycling Services for <span className="text-primary">Every Business</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            {/* GEO §2.1: Entity-clear first paragraph — factual definition, not marketing */}
            <p className="definition-block text-gray-400 text-[17px] leading-relaxed max-w-xl mx-auto mb-8">
              Recycling Quotes connects businesses with certified recycling services for 15+ material types across 52+ cities nationwide. From pallet recycling to IT asset disposition, every service includes free pickup, compliance documentation, and a Certificate of Recycling.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            {/* CTA Rule #1: Two CTAs in hero */}
            <div className="flex gap-2.5 justify-center flex-wrap">
              <Link href="/get-a-quote" className="btn-primary">
                Get a Quote <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
              <Link href="/schedule-pickup" className="btn-outline">
                <span className="material-symbols-outlined text-[16px]">calendar_month</span> Schedule Pickup
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ SECTION 2: Services Grid by Category (Table 1, Row 2) ═══ */}
      {/* Internal Linking: links to all 15 service pillar pages */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container-rq">
          <ScrollReveal>
            <SectionHeader tag="All Services" tagIcon="handyman" title="What We Offer" subtitle="Certified recycling, logistics, and compliance services — grouped by category." />
          </ScrollReveal>

          {SERVICE_GROUPS.map((group) => {
            const services = group.slugs.map(slug => SERVICES.find(s => s.slug === slug)).filter(Boolean);
            return (
              <div key={group.label} className="mb-12 last:mb-0">
                <ScrollReveal>
                  <h3 className="text-[13px] font-bold uppercase tracking-[.08em] text-gray-400 mb-4 pb-2 border-b border-gray-100">
                    {group.label}
                  </h3>
                </ScrollReveal>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.map((svc, i) => svc && (
                    <ScrollReveal key={svc.slug} delay={i * 60}>
                      <Link href={`/services/${svc.slug}`} className="flex items-start gap-4 p-5 bg-gray-50 border border-gray-100 rounded-[16px] group hover:bg-white hover:border-primary-light hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                        <div className={`icon-box shrink-0 ${colorMap[svc.color]}`}>
                          <span className="material-symbols-outlined text-[22px]">{svc.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-extrabold text-gray-800 mb-1" style={{ letterSpacing: '-0.015em' }}>{svc.name}</h4>
                          <p className="text-[13px] text-gray-400 leading-relaxed">{svc.description}</p>
                          <span className="inline-flex items-center gap-1 mt-2 text-[13px] font-bold text-primary">
                            Learn more <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                          </span>
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

      {/* ═══ SECTION 3: Why Choose Us (Table 1, Row 3) ═══ */}
      {/* Cross-link to /about/certifications per Internal Linking rules */}
      <section className="py-24 bg-gray-50">
        <div className="container-rq">
          <ScrollReveal>
            <SectionHeader tag="Why Us" tagIcon="verified" title="Why Businesses Choose Recycling Quotes" subtitle="Nationwide coverage, certified processes, and complete compliance documentation." />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: 'workspace_premium', title: 'Certified Recyclers', desc: 'R2, e-Stewards, ISO 14001, and NAID certified downstream processors. Full chain-of-custody documentation.', link: '/about/certifications' },
              { icon: 'public', title: 'Nationwide Network', desc: '52+ cities across the US, Canada, UK, and Australia. One point of contact for multi-location businesses.', link: '/locations' },
              { icon: 'description', title: 'Compliance Documentation', desc: 'Certificates of Recycling, Certificates of Destruction, waste manifests, and ESG reporting support included.', link: '/challenges/esg-reporting' },
              { icon: 'auto_awesome', title: 'Zero-Waste Guarantee', desc: 'We maximize material recovery with a 92% diversion rate. Nothing goes to landfill that can be recycled.', link: '/about/our-impact' },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 80}>
                <Link href={item.link} className="block bg-white border border-gray-200 rounded-[20px] p-6 group hover:-translate-y-1 hover:shadow-lg hover:border-transparent transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
                  <div className="icon-box icon-box-green mb-4">
                    <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                  </div>
                  <h3 className="font-extrabold text-gray-800 mb-1.5" style={{ letterSpacing: '-0.015em' }}>{item.title}</h3>
                  <p className="text-[13px] text-gray-400 leading-relaxed">{item.desc}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: Industries Cross-Link (Table 1, Row 4) ═══ */}
      {/* Cross-linking: services ↔ industries */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <ScrollReveal>
            <SectionHeader tag="Industries" tagIcon="domain" title="Industries We Serve" subtitle="Every industry has different recycling needs. We tailor programs to your compliance requirements and waste streams." />
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {INDUSTRIES.map((ind, i) => (
              <ScrollReveal key={ind.slug} delay={i * 50}>
                <Link href={`/industries/${ind.slug}`} className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-100 rounded-[12px] group hover:bg-white hover:border-primary-light hover:shadow-md transition-all duration-300">
                  <span className="material-symbols-outlined text-[20px] text-primary">{ind.icon}</span>
                  <span className="text-[13px] font-bold text-gray-700 group-hover:text-primary transition-colors">{ind.name}</span>
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

      {/* ═══ SECTION 5: FAQ Preview (Table 1, Row 5) ═══ */}
      {/* FAQPage schema applied above. Unique questions per Content Rules §4.3 */}
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

      {/* ═══ SECTION 6: Final CTA (Table 1, Row 6) ═══ */}
      {/* CTA Rule #2: Every page ends with CTA band */}
      <CTABlock />
    </>
  );
}
