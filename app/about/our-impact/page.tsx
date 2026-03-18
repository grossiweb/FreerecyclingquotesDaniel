import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd, webPageSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PageHero from '@/components/ui/PageHero';
import { CTABlock, ScrollReveal } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Our Impact — Recycling Quotes by the Numbers',
  description: '500,000+ tons diverted. 97+ cities. 10,000+ businesses. 92% material recovery rate. See the measurable environmental impact of our recycling network.',
  alternates: { canonical: 'https://recyclingquotes.com/about/our-impact' },
};

const HERO_STATS = [
  { stat: '500,000+', label: 'Tons Diverted', detail: 'from landfill since 2005' },
  { stat: '97+', label: 'Cities Served', detail: 'across US, Canada, UK, Australia' },
  { stat: '10,000+', label: 'Businesses Served', detail: 'from single-site to Fortune 500' },
  { stat: '92%', label: 'Recovery Rate', detail: 'average material recovery across our network' },
];

const ENV_METRICS = [
  { stat: '1.2M', unit: 'tons CO₂e avoided', description: 'Greenhouse gas emissions prevented through recycling vs landfill disposal, calculated per EPA WARM model.' },
  { stat: '3.8B', unit: 'gallons of water saved', description: 'Water conserved by using recycled materials instead of virgin resources in manufacturing.' },
  { stat: '890K', unit: 'MWh of energy saved', description: 'Energy conserved through recycling — enough to power 82,000 homes for a year.' },
  { stat: '8.5M', unit: 'trees preserved', description: 'Forest resources saved through paper and cardboard recycling programs.' },
  { stat: '2.1M', unit: 'barrels of oil saved', description: 'Petroleum conserved through plastic recycling and reduced manufacturing energy.' },
  { stat: '340K', unit: 'tons of iron ore saved', description: 'Mining resources preserved through scrap metal recycling programs.' },
];

export default function OurImpactPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/about/our-impact', name: 'Our Impact', description: 'The measurable environmental impact of Recycling Quotes.' })} />
      <Breadcrumbs items={[{ name: 'About', href: '/about' }, { name: 'Our Impact', href: '/about/our-impact' }]} />

      <PageHero tag="By the Numbers" tagIcon="trending_up" title="Our" titleAccent="Impact" description="We track every ton diverted, every certificate issued, and every pound of CO₂ avoided. These aren't estimates — they're documented metrics from 20 years of certified recycling operations across 97+ cities." image="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1600&h=600&fit=crop" primaryCta={{ label: 'Join Our Network', href: '/get-a-quote', icon: 'arrow_forward' }} secondaryCta={{ label: 'ESG & Sustainability', href: '/about/esg', icon: 'eco' }} />

      {/* Hero Stats */}
      <section className="py-0 bg-white">
        <div className="container-rq -mt-1">
          <ScrollReveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 bg-dark-bg rounded-[20px] overflow-hidden">
              {HERO_STATS.map((s, i) => (
                <div key={s.label} className="py-8 px-6 text-center relative">
                  {i < 3 && <div className="hidden lg:block absolute top-[20%] right-0 bottom-[20%] w-px bg-dark-border" />}
                  <div className="text-2xl lg:text-3xl font-extrabold text-[#4ADE80] leading-none mb-1" style={{ letterSpacing: '-0.03em' }}>{s.stat}</div>
                  <div className="text-[13px] text-white font-bold mb-0.5">{s.label}</div>
                  <div className="text-[11px] text-gray-500">{s.detail}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Environmental impact metrics */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <ScrollReveal><h2 className="section-title mb-10">Environmental Impact</h2></ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ENV_METRICS.map((m, i) => (
              <ScrollReveal key={m.unit} delay={i * 60}>
                <div className="bg-primary-50 border border-primary-light rounded-[20px] p-7 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 h-full">
                  <div className="text-3xl font-extrabold text-primary mb-1" style={{ letterSpacing: '-0.03em' }}>{m.stat}</div>
                  <div className="text-[13px] font-bold text-gray-700 mb-3">{m.unit}</div>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{m.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How we calculate */}
      <section className="py-24 bg-dark-bg relative overflow-hidden">
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.08) 0%, transparent 60%)' }} />
        <div className="container-rq relative z-10 max-w-3xl">
          <ScrollReveal>
            <h2 className="section-title !text-white mb-8">How We Calculate Impact</h2>
            <div className="space-y-4">
              {[
                { title: 'Certified Scale Weights', description: 'Every pickup is weighed on certified scales. Weight tickets are the raw data — not estimates, not projections.' },
                { title: 'EPA WARM Model', description: 'Carbon offset, energy savings, and water conservation calculated using the EPA Waste Reduction Model (WARM) — the standard methodology accepted by GRI, CDP, and the SEC.' },
                { title: 'Material-Specific Factors', description: 'Each material type has specific impact factors. Recycling 1 ton of aluminum saves 14,000 kWh. Recycling 1 ton of cardboard avoids 3.1 MTCO₂e. We calculate per-material impact, not averages.' },
                { title: 'Third-Party Verifiable', description: 'All data is audit-ready. Weight tickets, processor certifications, and methodology documentation available for third-party verification.' },
              ].map((item, i) => (
                <div key={item.title} className="bg-dark-card border border-dark-border rounded-[16px] p-6 hover:border-[rgba(74,222,128,.15)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-7 h-7 flex items-center justify-center bg-[rgba(74,222,128,.1)] text-[#4ADE80] text-[12px] font-extrabold rounded-full shrink-0">{i + 1}</div>
                    <h3 className="font-extrabold text-white text-[15px]">{item.title}</h3>
                  </div>
                  <p className="text-[13px] text-gray-400 leading-relaxed ml-10">{item.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTABlock title="Add Your Impact to Ours" subtitle="Every new client adds to these numbers. Get a free quote and see what your recycling program can contribute." />
    </>
  );
}
