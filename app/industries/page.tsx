import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { INDUSTRIES, CONTACT } from '@/lib/data';
import { JsonLd, webPageSchema, faqPageSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { SectionHeader, CTABlock, FAQAccordion, ScrollReveal } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Industries We Serve — Recycling by Industry',
  description: 'Tailored recycling solutions for retail, manufacturing, healthcare, construction, logistics, banking, food services, hospitality, education, and more. Free quotes.',
  alternates: { canonical: 'https://recyclingquotes.com/industries' },
};

const ALL_INDUSTRIES = [
  ...INDUSTRIES,
  { slug: 'automotive', name: 'Automotive', icon: 'directions_car', description: 'End-of-life vehicle recycling, scrap metal, and parts recovery', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop' },
  { slug: 'hospitality', name: 'Hospitality', icon: 'hotel', description: 'Hotel and resort waste management and recycling programs', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop' },
  { slug: 'property-management', name: 'Property Management', icon: 'domain', description: 'Multi-tenant recycling and waste management programs', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop' },
];

const COMMERCIAL = ALL_INDUSTRIES.filter(i => ['retail','manufacturing','logistics','construction','automotive','banking-finance'].includes(i.slug));
const PUBLIC = ALL_INDUSTRIES.filter(i => ['healthcare','education','food-services','hospitality','property-management'].includes(i.slug));

const FAQS = [
  { q: 'Which industries does Recycling Quotes serve?', a: 'We serve 11+ industries including retail, manufacturing, healthcare, construction, distribution and logistics, banking and finance, automotive, food services, hospitality, property management, and education and government. Each industry program is tailored to its specific waste streams, compliance requirements, and operational needs.' },
  { q: 'How are recycling programs customized by industry?', a: 'Every industry generates different waste streams and faces different regulations. For example, healthcare requires HIPAA-compliant data destruction and medical waste handling, while construction needs C&D debris management and roll-off dumpsters. We assess your industry\'s specific requirements and design a program that addresses compliance, cost, and sustainability goals.' },
  { q: 'Do you handle industry-specific compliance documentation?', a: 'Yes. We provide all required compliance documentation including Certificates of Recycling, Certificates of Destruction (for data-bearing devices), waste manifests, and ESG reporting data. Our documentation meets R2, e-Stewards, HIPAA, NIST 800-88, and EPA RCRA standards as applicable to your industry.' },
  { q: 'Can you manage recycling for multi-location businesses?', a: 'Absolutely. Our nationwide network covers 52+ cities, so we can manage recycling programs across all your locations with a single point of contact, consolidated reporting, and consistent service levels. This is especially valuable for retail chains, restaurant groups, and corporate office portfolios.' },
  { q: 'What is the typical ROI of an industry recycling program?', a: 'Most businesses see a 20-35% reduction in waste disposal costs within the first year, plus additional value from compliance risk reduction, ESG reporting capability, and in some cases revenue from recyclable materials like scrap metal. We provide a cost-benefit analysis as part of our free waste audit service.' },
];

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/industries', name: 'Industries We Serve', description: 'Tailored recycling solutions for retail, manufacturing, healthcare, construction, logistics, and more.' })} />
      <JsonLd data={faqPageSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <Breadcrumbs items={[{ name: 'Industries', href: '/industries' }]} />

      {/* §1 Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1600&h=600&fit=crop" alt="Manufacturing facility" width={1600} height={600} className="w-full h-full object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/95 via-dark-bg/80 to-dark-bg/50" />
        </div>
        <div className="container-rq relative z-10 py-20 lg:py-28">
          <div className="max-w-2xl">
            <ScrollReveal>
              <div className="section-tag !bg-white/10 !text-white/80 mb-6"><span className="material-symbols-outlined text-[14px]">domain</span> 11+ Industries</div>
              <h1 className="font-extrabold text-white leading-[1.08] mb-5" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.25rem)', letterSpacing: '-0.035em' }}>
                Recycling Solutions for <span className="text-[#4ADE80]">Every Industry</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <p className="definition-block text-white/70 text-[17px] leading-relaxed max-w-xl mb-8">
                Every industry generates different waste streams and faces different environmental regulations. Recycling Quotes designs tailored recycling programs that address the specific compliance requirements, material types, and operational constraints of your industry — from HIPAA-compliant healthcare e-waste disposal to C&amp;D debris management for construction.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <div className="flex gap-2.5 flex-wrap">
                <Link href="/get-a-quote" className="btn-white">Get a Quote <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
                <Link href="/schedule-pickup" className="btn-outline-white"><span className="material-symbols-outlined text-[16px]">calendar_month</span> Schedule Pickup</Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* §2 Industries Grid — grouped with image cards */}
      {[{ label: 'Commercial & Industrial', industries: COMMERCIAL }, { label: 'Public & Services', industries: PUBLIC }].map(group => (
        <section key={group.label} className="py-16 first:pt-24 last:pb-24 bg-white">
          <div className="container-rq">
            <ScrollReveal>
              <h2 className="text-[13px] font-bold uppercase tracking-[.08em] text-gray-400 mb-6 pb-2 border-b border-gray-100">{group.label}</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {group.industries.map((ind, i) => (
                <ScrollReveal key={ind.slug} delay={i * 60}>
                  <Link href={`/industries/${ind.slug}`} className="relative rounded-[20px] overflow-hidden aspect-[16/10] block group">
                    <Image src={ind.image} alt={ind.name} width={400} height={300} className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/30 to-transparent group-hover:from-dark-bg/95 transition-all duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-extrabold text-lg mb-1" style={{ letterSpacing: '-0.015em' }}>{ind.name}</h3>
                      <p className="text-white/60 text-[13px] font-medium">{ind.description}</p>
                      <span className="inline-flex items-center gap-1 mt-2 text-[13px] font-bold text-[#4ADE80] group-hover:gap-2 transition-all">
                        View solutions <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* §3 Services Cross-Link + FAQ + CTA */}
      <section className="py-24 bg-gray-50">
        <div className="container-rq">
          <ScrollReveal>
            <div className="bg-dark-bg rounded-[28px] p-10 lg:p-14 text-center mb-16 relative overflow-hidden">
              <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.1) 0%, transparent 60%)' }} />
              <h2 className="text-2xl lg:text-3xl font-extrabold text-white mb-3 relative z-10" style={{ letterSpacing: '-0.025em' }}>Need a Cross-Industry Recycling Partner?</h2>
              <p className="text-dark-text max-w-lg mx-auto mb-6 relative z-10">Whether you manage one facility or hundreds across multiple industries, our nationwide network handles everything under one contract.</p>
              <div className="flex gap-2.5 justify-center flex-wrap relative z-10">
                <Link href="/services" className="btn-white">View All Services <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
                <Link href="/services/business-recycling-programs" className="btn-outline-white">Business Recycling Programs</Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal><SectionHeader tag="FAQ" tagIcon="help" title="Industry Recycling Questions" /></ScrollReveal>
          <ScrollReveal><FAQAccordion items={FAQS} /></ScrollReveal>
          <ScrollReveal><div className="text-center mt-8"><Link href="/industries/faqs" className="btn-outline">View All Industry FAQs <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link></div></ScrollReveal>
        </div>
      </section>
      <CTABlock />
    </>
  );
}
