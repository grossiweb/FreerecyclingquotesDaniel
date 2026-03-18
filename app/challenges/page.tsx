import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT } from '@/lib/data';
import { JsonLd, webPageSchema, faqPageSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PageHero from '@/components/ui/PageHero';
import { SectionHeader, CTABlock, FAQAccordion, ScrollReveal } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Recycling Challenges We Solve',
  description: 'From e-waste compliance to ESG reporting, we solve the recycling challenges that keep operations managers up at night. Certified solutions with documentation.',
  alternates: { canonical: 'https://recyclingquotes.com/challenges' },
};

const CHALLENGES = [
  { slug: 'ewaste-compliance', icon: 'gavel', color: 'blue', title: 'E-Waste Compliance & Data Security', pain: 'Worried about data breaches, EPA violations, and the liability of improper electronics disposal? E-waste regulations are complex and penalties are steep — up to $50,000 per violation.', stats: '62M tonnes of e-waste generated globally in 2022 (WHO)' },
  { slug: 'waste-diversion', icon: 'alt_route', color: 'green', title: 'Waste Diversion Goals', pain: 'Struggling to hit your waste diversion targets? Most businesses divert less than 35% of their waste — far below the 90%+ rates that are achievable with the right program.', stats: 'Average diversion improvement: 40% → 92% within 6 months' },
  { slug: 'esg-reporting', icon: 'eco', color: 'green', title: 'ESG Reporting & Sustainability', pain: 'Need documented recycling data for ESG disclosures, sustainability reports, or stakeholder presentations? Without proper tracking, you can\'t prove your environmental impact.', stats: '90% of S&P 500 companies now publish sustainability reports' },
  { slug: 'hazardous-waste', icon: 'warning', color: 'amber', title: 'Hazardous Waste Management', pain: 'Managing batteries, chemicals, light bulbs, or medical waste without a licensed disposal partner exposes your organization to regulatory fines, environmental liability, and health risks.', stats: 'EPA RCRA violations average $37,500 per day per violation' },
  { slug: 'cost-reduction', icon: 'savings', color: 'green', title: 'Recycling Cost Reduction', pain: 'Spending too much on waste disposal? Many businesses overpay because they mix recyclables with landfill waste, use the wrong container sizes, or lack competitive vendor pricing.', stats: 'Clients typically save 20-35% on disposal costs in year one' },
  { slug: 'program-setup', icon: 'settings', color: 'blue', title: 'Recycling Program Setup', pain: 'Don\'t know where to start with a recycling program? Setting up bins isn\'t enough — you need waste audits, vendor management, employee training, and compliance documentation.', stats: 'Program setup to first pickup: average 10 business days' },
  { slug: 'supply-chain-sustainability', icon: 'hub', color: 'teal', title: 'Supply Chain Sustainability', pain: 'Your customers and procurement teams are asking about your environmental practices. Without a documented recycling program, you risk losing contracts and failing sustainability audits.', stats: '73% of procurement officers consider sustainability in vendor selection' },
  { slug: 'cd-waste-compliance', icon: 'domain', color: 'amber', title: 'C&D Waste Compliance', pain: 'Construction and demolition waste regulations vary by state and municipality. Non-compliance can halt projects, trigger fines, and damage your reputation with general contractors.', stats: '600M tons of C&D debris generated annually in the US (EPA)' },
];

const colorMap = { green: 'icon-box-green', amber: 'icon-box-amber', blue: 'icon-box-blue', teal: 'icon-box-teal' } as const;

const FAQS = [
  { q: 'What recycling challenges does Recycling Quotes help solve?', a: 'We address 8 core recycling challenges: e-waste compliance, waste diversion, ESG reporting, hazardous waste management, cost reduction, program setup, supply chain sustainability, and construction and demolition waste compliance. Each challenge page maps to the specific services, materials, and certifications that solve it.' },
  { q: 'How do you help with e-waste compliance specifically?', a: 'We provide R2 and e-Stewards certified electronics recycling, NIST 800-88 compliant data destruction with Certificates of Destruction, full chain-of-custody documentation, and compliance reporting that meets EPA, state, and industry-specific regulations including HIPAA for healthcare.' },
  { q: 'Can you help us set up a recycling program from scratch?', a: 'Yes. Our program setup service includes a waste audit to assess your current waste streams, a customized program design, vendor coordination, container placement, employee communication materials, and ongoing compliance monitoring. Most programs are operational within 10 business days of the initial assessment.' },
  { q: 'Do you provide documentation for ESG and sustainability reporting?', a: 'We provide detailed recycling metrics including pounds diverted by material type, carbon offset calculations, water savings estimates, and compliance certificates. This data integrates directly into GRI, SASB, CDP, and UN SDG reporting frameworks.' },
  { q: 'What if we have multiple challenges across different facilities?', a: 'That\'s common for multi-location businesses. We design integrated programs that address multiple challenges simultaneously — for example, combining e-waste compliance with cost reduction and ESG reporting under a single contract with consolidated reporting across all your facilities.' },
];

export default function ChallengesPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/challenges', name: 'Recycling Challenges We Solve', description: 'From e-waste compliance to ESG reporting, we solve recycling challenges for businesses.' })} />
      <JsonLd data={faqPageSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <Breadcrumbs items={[{ name: 'Challenges', href: '/challenges' }]} />

      <PageHero
        tag="Problem → Solution"
        tagIcon="psychology"
        title="Recycling Challenges"
        titleAccent="We Solve"
        description="Whatever your waste management problem, we have a certified solution. Each challenge below maps to the specific services, materials, and compliance frameworks that solve it — so you can go from problem to resolution with a single partner."
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=600&fit=crop"
        showPhone
      />

      {/* Challenges Grid */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <ScrollReveal><SectionHeader tag="8 Core Challenges" tagIcon="lightbulb" title="Identify Your Challenge" subtitle="Select the challenge closest to your situation. We'll show you exactly how we solve it." /></ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CHALLENGES.map((ch, i) => (
              <ScrollReveal key={ch.slug} delay={Math.min(i * 60, 300)}>
                <Link href={`/challenges/${ch.slug}`} className="block bg-gray-50 border border-gray-100 rounded-[20px] p-7 group hover:bg-white hover:border-primary-light hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
                  <div className="flex items-start gap-4">
                    <div className={`icon-box shrink-0 ${colorMap[ch.color as keyof typeof colorMap]}`}>
                      <span className="material-symbols-outlined text-[22px]">{ch.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-gray-800 mb-2 text-[1.0625rem]" style={{ letterSpacing: '-0.015em' }}>{ch.title}</h3>
                      <p className="text-[13px] text-gray-500 leading-relaxed mb-3">{ch.pain}</p>
                      <div className="stats-block text-[12px] text-primary font-semibold bg-primary-light rounded-full inline-block px-3 py-1 mb-3">{ch.stats}</div>
                      <div><span className="inline-flex items-center gap-1 text-[13px] font-bold text-primary group-hover:gap-2 transition-all">See how we solve this <span className="material-symbols-outlined text-[16px]">arrow_forward</span></span></div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + CTA */}
      <section className="py-24 bg-gray-50">
        <div className="container-rq">
          <ScrollReveal><SectionHeader tag="FAQ" tagIcon="help" title="Questions About Recycling Challenges" /></ScrollReveal>
          <ScrollReveal><FAQAccordion items={FAQS} /></ScrollReveal>
        </div>
      </section>
      <CTABlock title="Ready to Solve Your Recycling Challenge?" subtitle="Tell us what you're dealing with. We'll map it to the right services and give you a free quote within 24 hours." />
    </>
  );
}
