import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { CTABlock, ScrollReveal } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Recycling Statistics — Key Data & Industry Benchmarks',
  description: 'US recycling rates, waste generation data, material recovery metrics, and environmental impact statistics. Updated for 2026.',
  alternates: { canonical: 'https://recyclingquotes.com/resources/statistics' },
};

const NATIONAL_STATS = [
  { stat: '32%', label: 'US recycling rate', source: 'EPA' },
  { stat: '292M', label: 'tons MSW generated/year', source: 'EPA' },
  { stat: '146M', label: 'tons sent to landfill/year', source: 'EPA' },
  { stat: '600M+', label: 'tons C&D debris/year', source: 'EPA' },
  { stat: '62M', label: 'tonnes global e-waste/year', source: 'UN' },
  { stat: '22.3%', label: 'of e-waste properly recycled', source: 'UN' },
  { stat: '24%', label: 'of landfill volume is food waste', source: 'EPA' },
  { stat: '75%', label: 'of waste is recyclable', source: 'EPA' },
];

const MATERIAL_STATS = [
  { material: 'Aluminum Cans', rate: '46.1%', energySaved: '95% less energy than virgin', source: 'EPA/Aluminum Assoc.' },
  { material: 'Steel Cans', rate: '70%', energySaved: '74% energy savings', source: 'Steel Recycling Institute' },
  { material: 'Cardboard (OCC)', rate: '91.4%', energySaved: '3.1 MTCO₂e avoided per ton', source: 'EPA/AF&PA' },
  { material: 'Paper', rate: '68%', energySaved: '60% less energy, 80% less water', source: 'EPA/AF&PA' },
  { material: 'Glass', rate: '31.3%', energySaved: '30% energy savings per ton', source: 'EPA' },
  { material: 'Plastics (total)', rate: '5-6%', energySaved: 'Varies by resin type', source: 'EPA/Beyond Plastics' },
  { material: 'PET Bottles', rate: '29.1%', energySaved: '75% less energy than virgin', source: 'NAPCOR' },
  { material: 'Lead-Acid Batteries', rate: '99%', energySaved: 'Most recycled consumer product', source: 'Battery Council' },
  { material: 'Tires', rate: '81%', energySaved: 'Rubber, fuel, civil engineering', source: 'USTMA' },
  { material: 'Electronics', rate: '22.3%', energySaved: 'Gold, silver, palladium recovery', source: 'UN E-waste Monitor' },
];

const ENV_IMPACT = [
  { stat: '1 ton recycled paper', impact: 'saves 17 trees, 7,000 gallons of water, 3.3 cubic yards of landfill' },
  { stat: '1 ton recycled aluminum', impact: 'saves 14,000 kWh of energy — enough to power a home for 18 months' },
  { stat: '1 ton recycled cardboard', impact: 'avoids 3.1 metric tons of CO₂e greenhouse gas emissions' },
  { stat: '1 ton recycled steel', impact: 'saves 2,500 lbs of iron ore, 1,400 lbs of coal, 120 lbs of limestone' },
  { stat: '1 ton recycled plastic', impact: 'saves 5,774 kWh of energy and 16.3 barrels of oil' },
  { stat: '1 ton recycled electronics', impact: 'recovers more gold than 1 ton of gold ore from mining' },
];

export default function StatisticsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Resources', href: '/resources' }, { name: 'Statistics', href: '/resources/statistics' }]} />

      <section className="py-16 bg-gradient-to-br from-primary-50 via-[#FAFCFB] to-white">
        <div className="container-rq max-w-3xl">
          <ScrollReveal>
            <h1 className="font-extrabold text-gray-800 leading-[1.08] mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', letterSpacing: '-0.035em' }}>Recycling Statistics</h1>
            <p className="text-gray-500 text-[16px] leading-relaxed">Key recycling data, recovery rates, and environmental impact metrics. Sources include EPA, UN, and industry associations.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* National Overview */}
      <section className="py-16 bg-dark-bg relative overflow-hidden">
        <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.08) 0%, transparent 60%)' }} />
        <div className="container-rq relative z-10">
          <ScrollReveal><h2 className="section-title !text-white mb-8">National Overview</h2></ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {NATIONAL_STATS.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 40}>
                <div className="bg-dark-card border border-dark-border rounded-[16px] p-5 text-center hover:border-[rgba(74,222,128,.15)] transition-all duration-300">
                  <div className="text-2xl font-extrabold text-[#4ADE80] mb-1" style={{ letterSpacing: '-0.03em' }}>{s.stat}</div>
                  <div className="text-[12px] text-gray-300 mb-1">{s.label}</div>
                  <div className="text-[10px] text-gray-500">{s.source}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Material Recovery Rates */}
      <section className="py-16 bg-white">
        <div className="container-rq">
          <ScrollReveal><h2 className="section-title mb-8">Material Recovery Rates</h2></ScrollReveal>
          <ScrollReveal>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 pr-4 text-gray-400 font-bold uppercase tracking-wider text-[11px]">Material</th>
                    <th className="py-3 px-4 text-gray-400 font-bold uppercase tracking-wider text-[11px]">US Recovery Rate</th>
                    <th className="py-3 px-4 text-gray-400 font-bold uppercase tracking-wider text-[11px]">Environmental Benefit</th>
                    <th className="py-3 pl-4 text-gray-400 font-bold uppercase tracking-wider text-[11px]">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {MATERIAL_STATS.map(m => (
                    <tr key={m.material} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 pr-4 font-bold text-gray-700">{m.material}</td>
                      <td className="py-3 px-4"><span className="font-extrabold text-primary">{m.rate}</span></td>
                      <td className="py-3 px-4 text-gray-500">{m.energySaved}</td>
                      <td className="py-3 pl-4 text-[11px] text-gray-400">{m.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="py-16 bg-primary-50 border-y border-primary-light">
        <div className="container-rq">
          <ScrollReveal><h2 className="section-title mb-8">Environmental Impact Per Ton Recycled</h2></ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ENV_IMPACT.map((item, i) => (
              <ScrollReveal key={item.stat} delay={i * 50}>
                <div className="bg-white border border-gray-200 rounded-[16px] p-6 hover:shadow-md transition-all duration-300">
                  <div className="text-[14px] font-extrabold text-primary mb-2">{item.stat}</div>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{item.impact}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-rq max-w-2xl text-center">
          <ScrollReveal>
            <p className="text-[13px] text-gray-400 leading-relaxed">Data sourced from EPA Advancing Sustainable Materials Management, UN Global E-waste Monitor, Aluminum Association, American Forest & Paper Association, Steel Recycling Institute, NAPCOR, Battery Council International, and USTMA. Statistics represent most recent available data as of early 2026.</p>
          </ScrollReveal>
        </div>
      </section>

      <CTABlock title="Turn These Statistics Into Your Impact" subtitle="See how your recycling program contributes to these numbers. Free quote with projected environmental impact." />
    </>
  );
}
