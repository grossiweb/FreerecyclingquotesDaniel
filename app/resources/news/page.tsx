import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { CTABlock, ScrollReveal } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Recycling News — Industry Updates & Regulatory Changes',
  description: 'The latest developments in recycling regulations, market pricing, industry trends, and environmental policy affecting commercial recycling.',
  alternates: { canonical: 'https://recyclingquotes.com/resources/news' },
};

const NEWS = [
  { date: 'Mar 2026', tag: 'Regulations', title: 'EPA Proposes Expanded RCRA Regulations for Lithium Battery Waste', desc: 'New EPA proposal would reclassify certain lithium-ion batteries as universal waste nationwide, simplifying collection but adding documentation requirements for commercial generators.' },
  { date: 'Feb 2026', tag: 'Market', title: 'Scrap Metal Prices Rise 12% in Q1 as Manufacturing Rebounds', desc: 'Ferrous and non-ferrous scrap prices show strong upward movement as domestic manufacturing activity increases. Copper hits $4.20/lb, best level since 2022.' },
  { date: 'Feb 2026', tag: 'Policy', title: 'California SB 1383 Enforcement Ramps Up With First Penalties Issued', desc: 'CalRecycle issues first enforcement actions under SB 1383 organic waste diversion mandate. Businesses generating 2+ cubic yards of waste per week now face compliance deadlines.' },
  { date: 'Jan 2026', tag: 'Industry', title: 'E-Waste Recycling Volumes Hit Record High in 2025', desc: 'US electronics recycling volumes reached 3.4 million tons in 2025, driven by corporate IT refresh cycles and expanded state e-waste mandates.' },
  { date: 'Jan 2026', tag: 'ESG', title: 'SEC Climate Disclosure Rules Take Effect for Large Filers', desc: 'Large accelerated filers must now report Scope 1 and 2 emissions data. Waste management data becomes relevant for Scope 3 Category 5 reporting.' },
  { date: 'Dec 2025', tag: 'Regulations', title: 'Five More States Propose Commercial Recycling Mandates', desc: 'Pennsylvania, Michigan, Ohio, Georgia, and Arizona introduce commercial recycling legislation for 2026 sessions, following models from CA, MA, and NY.' },
  { date: 'Dec 2025', tag: 'Market', title: 'Cardboard Prices Stabilize After Volatile 2025', desc: 'OCC pricing settles around $85-$95/ton after swinging between $60 and $140 during 2025. Stability supports revenue-share recycling programs.' },
  { date: 'Nov 2025', tag: 'Industry', title: 'R2 Standard Version 4 Released With Expanded Data Security Requirements', desc: 'SERI releases R2 v4 with enhanced data destruction documentation, expanded downstream tracking, and new requirements for lithium battery handling.' },
];

export default function NewsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Resources', href: '/resources' }, { name: 'News', href: '/resources/news' }]} />

      <section className="py-16 bg-gradient-to-br from-primary-50 via-[#FAFCFB] to-white">
        <div className="container-rq max-w-3xl">
          <ScrollReveal>
            <h1 className="font-extrabold text-gray-800 leading-[1.08] mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', letterSpacing: '-0.035em' }}>Recycling News</h1>
            <p className="text-gray-500 text-[16px] leading-relaxed">Regulatory changes, market pricing, and industry developments affecting commercial recycling.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-rq max-w-3xl">
          <div className="space-y-4">
            {NEWS.map((item, i) => (
              <ScrollReveal key={i} delay={i * 40}>
                <div className="bg-gray-50 border border-gray-100 rounded-[20px] p-7 hover:bg-white hover:border-primary-light hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[11px] text-gray-400 font-medium">{item.date}</span>
                    <span className="inline-block px-2.5 py-[3px] bg-primary-light text-primary text-[10px] font-bold rounded-full">{item.tag}</span>
                  </div>
                  <h2 className="font-extrabold text-gray-800 mb-2" style={{ letterSpacing: '-0.015em' }}>{item.title}</h2>
                  <p className="text-[14px] text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTABlock title="Stay Ahead of Regulatory Changes" subtitle="Our managed clients get proactive notifications when regulations change in their service areas. Get a quote to learn more." />
    </>
  );
}
