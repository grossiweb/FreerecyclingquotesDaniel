import type { Metadata } from 'next';
import Link from 'next/link';
import { MATERIALS, SERVICES, CONTACT } from '@/lib/data';
import { JsonLd, webPageSchema, faqPageSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { SectionHeader, CTABlock, FAQAccordion, ScrollReveal } from '@/components/ui';

export const metadata: Metadata = {
  title: 'What We Recycle — 15+ Material Types',
  description: 'We recycle electronics, metals, paper, plastics, pallets, hazardous materials, textiles, and more. Free pickup across 52+ US cities. Get a quote today.',
  alternates: { canonical: 'https://recyclingquotes.com/materials' },
};

const MATERIAL_GROUPS = [
  { label: 'Common Materials', items: MATERIALS.filter(m => ['electronics','metals','paper-cardboard','plastics','electronics/cell-phones','textiles','organics','pallets'].includes(m.slug)) },
  { label: 'Specialty & Hazardous', items: MATERIALS.filter(m => ['hazardous-materials/chemicals','vehicles','hazardous-materials/light-bulbs','hazardous-materials/batteries','hazardous-materials','junk'].includes(m.slug)) },
];

const MATERIAL_DESCRIPTIONS: Record<string, string> = {
  'electronics': 'Computers, laptops, monitors, printers, and all IT equipment',
  'metals': 'Ferrous and non-ferrous metals including copper, aluminum, steel, and brass',
  'paper-cardboard': 'Cardboard, office paper, newspapers, and mixed paper grades',
  'plastics': 'Rigid plastics, HDPE, PET, and commercial plastic packaging',
  'electronics/cell-phones': 'Smartphones, tablets, and mobile devices from all manufacturers',
  'textiles': 'Clothing, fabric, and textile waste from retail and manufacturing',
  'organics': 'Food waste, yard waste, and compostable materials',
  'pallets': 'Wooden and plastic pallets — repair, reuse, and recycle programs',
  'hazardous-materials/chemicals': 'Industrial chemicals, solvents, and chemical waste streams',
  'vehicles': 'End-of-life vehicles, auto parts, and automotive scrap',
  'hazardous-materials/light-bulbs': 'Fluorescent tubes, CFLs, HID lamps, and LED bulbs',
  'hazardous-materials/batteries': 'Lead-acid, lithium-ion, NiCd, and alkaline batteries',
  'hazardous-materials': 'Batteries, chemicals, light bulbs, medical waste, and regulated materials',
  'junk': 'Commercial and residential junk, debris, and mixed waste hauling',
};

const FAQS = [
  { q: 'What materials does Recycling Quotes accept?', a: 'We accept 15+ material types including electronics, metals (ferrous and non-ferrous), paper and cardboard, plastics, wooden and plastic pallets, hazardous materials (batteries, light bulbs, chemicals), textiles, organics, vehicles, and mixed junk. Each material follows a certified recycling process specific to its composition.' },
  { q: 'How do I know which recycling service I need for my materials?', a: 'Select your material type on this page or contact us at 817-946-5655. We\'ll assess your waste stream and recommend the right service — whether that\'s a one-time pickup, a recurring program, or a full waste audit to optimize your recycling operations.' },
  { q: 'Do you recycle hazardous materials like batteries and chemicals?', a: 'Yes. We handle regulated hazardous materials including lithium-ion batteries, lead-acid batteries, fluorescent light bulbs, industrial chemicals, solvents, and medical waste. All hazardous materials are processed through licensed facilities in compliance with EPA RCRA regulations.' },
  { q: 'Is there a minimum quantity for material recycling pickup?', a: 'Minimums vary by material type and location. Most commercial pickups have no minimum. For specialty materials like hazardous waste or electronics, contact us for quantity guidelines specific to your location.' },
  { q: 'What happens to my materials after pickup?', a: 'Materials are transported to certified processing facilities where they are sorted, processed, and recycled into raw materials for manufacturing. You receive a Certificate of Recycling documenting the chain of custody, weight diverted, and compliance status.' },
];

const colorMap = { green: 'icon-box-green', amber: 'icon-box-amber', blue: 'icon-box-blue', teal: 'icon-box-teal' } as const;

export default function MaterialsPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/materials', name: 'What We Recycle — 15+ Material Types', description: 'Recycling Quotes accepts 15+ material types including electronics, metals, paper, plastics, pallets, and hazardous materials.' })} />
      <JsonLd data={faqPageSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <Breadcrumbs items={[{ name: 'Materials', href: '/materials' }]} />

      {/* §1 Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-[#FAFCFB] to-white" />
        <div className="container-rq relative z-10 py-16 lg:py-20 text-center max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="section-tag mb-6"><span className="material-symbols-outlined text-[14px]">category</span> 15+ Material Types</div>
            <h1 className="font-extrabold text-gray-800 leading-[1.08] mb-4" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.25rem)', letterSpacing: '-0.035em' }}>
              What We <span className="text-primary">Recycle</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p className="definition-block text-gray-500 text-[17px] leading-relaxed max-w-xl mx-auto mb-8">
              Recycling Quotes handles 15+ material types across 52+ cities nationwide — from everyday recyclables like paper and plastic to regulated hazardous materials, e-waste, and industrial scrap. Every material is processed through certified facilities with full chain-of-custody documentation.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <div className="flex gap-2.5 justify-center flex-wrap">
              <Link href="/get-a-quote" className="btn-primary">Get a Quote <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
              <Link href="/schedule-pickup" className="btn-outline"><span className="material-symbols-outlined text-[16px]">calendar_month</span> Schedule Pickup</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* §2 Materials Grid — grouped */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container-rq">
          {MATERIAL_GROUPS.map((group) => (
            <div key={group.label} className="mb-14 last:mb-0">
              <ScrollReveal>
                <h2 className="text-[13px] font-bold uppercase tracking-[.08em] text-gray-400 mb-5 pb-2 border-b border-gray-100">{group.label}</h2>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.items.map((mat, i) => (
                  <ScrollReveal key={mat.slug} delay={Math.min(i * 60, 300)}>
                    <Link href={`/materials/${mat.slug}`} className="flex items-start gap-4 p-5 bg-gray-50 border border-gray-100 rounded-[16px] group hover:bg-white hover:border-primary-light hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
                      <div className={`icon-box shrink-0 ${colorMap[mat.color]}`}>
                        <span className="material-symbols-outlined text-[22px]">{mat.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-extrabold text-gray-800 mb-1" style={{ letterSpacing: '-0.015em' }}>{mat.name}</h3>
                        <p className="text-[13px] text-gray-400 leading-relaxed">{MATERIAL_DESCRIPTIONS[mat.slug] || ''}</p>
                        <span className="inline-flex items-center gap-1 mt-2 text-[13px] font-bold text-primary">
                          Learn more <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </span>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* §3 City Selector — simplified version (full interactive version when Supabase is connected) */}
      <section className="py-24 bg-gray-50">
        <div className="container-rq">
          <ScrollReveal>
            <SectionHeader tag="Locations" tagIcon="location_on" title="Find Recycling Near You" subtitle="We offer free pickup in 52+ cities across the United States, Canada, UK, and Australia." />
          </ScrollReveal>
          <ScrollReveal>
            <div className="bg-white border border-gray-200 rounded-[20px] p-8 lg:p-10 text-center max-w-2xl mx-auto">
              <p className="text-gray-500 mb-6">Select your city to see available recycling services and schedule a pickup in your area.</p>
              <div className="flex gap-2.5 justify-center flex-wrap">
                <Link href="/locations" className="btn-primary"><span className="material-symbols-outlined text-[16px]">location_on</span> Browse All Locations</Link>
                <a href={CONTACT.phoneHref} className="btn-outline"><span className="material-symbols-outlined text-[16px]">phone</span> Call {CONTACT.phone}</a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* §4 Services Cross-Link */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <ScrollReveal>
            <SectionHeader tag="Services" tagIcon="handyman" title="Need a Full Recycling Program?" subtitle="Our services go beyond single-material pickup — we design complete recycling programs for businesses of any size." />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { slug: 'business-recycling-programs', name: 'Business Recycling Programs', icon: 'apartment', desc: 'Custom multi-material recycling programs with compliance reporting and ongoing support for multi-location businesses.' },
              { slug: 'material-recycling-solutions', name: 'Material Recycling Solutions', icon: 'recycling', desc: 'End-to-end recycling for all 15 material types — one vendor, one contract, complete documentation.' },
              { slug: 'waste-audits-consulting', name: 'Waste Audits & Consulting', icon: 'query_stats', desc: 'Waste stream analysis and diversion planning to optimize your recycling operations and reduce costs.' },
            ].map((svc, i) => (
              <ScrollReveal key={svc.slug} delay={i * 80}>
                <Link href={`/services/${svc.slug}`} className="block bg-dark-bg rounded-[20px] p-7 group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#4ADE80] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
                  <div className="w-12 h-12 rounded-[12px] bg-[rgba(74,222,128,.1)] flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-[24px] text-[#4ADE80]">{svc.icon}</span>
                  </div>
                  <h3 className="font-extrabold text-white mb-2" style={{ letterSpacing: '-0.015em' }}>{svc.name}</h3>
                  <p className="text-[13px] text-gray-400 leading-relaxed">{svc.desc}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* §5 FAQ + CTA */}
      <section className="py-24 bg-gray-50">
        <div className="container-rq">
          <ScrollReveal><SectionHeader tag="FAQ" tagIcon="help" title="Common Questions About Materials" /></ScrollReveal>
          <ScrollReveal><FAQAccordion items={FAQS} /></ScrollReveal>
          <ScrollReveal><div className="text-center mt-8"><Link href="/materials/faqs" className="btn-outline">View All Material FAQs <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link></div></ScrollReveal>
        </div>
      </section>
      <CTABlock />
    </>
  );
}
