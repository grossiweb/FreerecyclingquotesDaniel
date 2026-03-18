import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd, webPageSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PageHero from '@/components/ui/PageHero';
import { CTABlock, ScrollReveal } from '@/components/ui';

export const metadata: Metadata = {
  title: 'ESG & Sustainability — Our Environmental Commitments',
  description: 'Our environmental, social, and governance commitments. Zero-landfill processing, carbon offset tracking, and circular economy principles across our certified network.',
  alternates: { canonical: 'https://recyclingquotes.com/about/esg' },
};

export default function ESGPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/about/esg', name: 'ESG & Sustainability', description: 'Our environmental, social, and governance commitments.' })} />
      <Breadcrumbs items={[{ name: 'About', href: '/about' }, { name: 'ESG & Sustainability', href: '/about/esg' }]} />

      <PageHero tag="Sustainability" tagIcon="eco" title="ESG &" titleAccent="Sustainability" description="Sustainability isn't a marketing initiative — it's how we operate. Every processing partner is certified. Every pickup is documented. Every ton diverted is tracked. Here's what we commit to and how we measure it." image="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1600&h=600&fit=crop" primaryCta={{ label: 'Our Impact', href: '/about/our-impact', icon: 'trending_up' }} secondaryCta={{ label: 'ESG Reporting Challenge', href: '/challenges/esg-reporting', icon: 'monitoring' }} />

      {/* Environmental */}
      <section className="py-24 bg-white">
        <div className="container-rq max-w-4xl">
          <ScrollReveal>
            <h2 className="section-title mb-8">Environmental Commitments</h2>
          </ScrollReveal>
          <div className="space-y-5">
            {[
              { title: 'Zero-Landfill Network Goal', description: 'Our certified processing partners are committed to maximizing material recovery. Metals, paper, plastics, and electronics are recycled into raw materials. Organic waste goes to composting or anaerobic digestion. Only truly non-recyclable residual goes to waste-to-energy where available — not landfill.' },
              { title: 'Domestic Processing Only', description: 'We do not export recyclable materials to developing countries. All electronics, metals, and plastics are processed at domestic facilities with documented environmental controls. R2 and e-Stewards certifications enforce this commitment through third-party audits.' },
              { title: 'Carbon Offset Tracking', description: 'Every recycling program tracks carbon offset using EPA WARM model methodology. Clients receive CO2e avoided calculations in their monthly reports — usable for Scope 3 reporting, CDP disclosures, and carbon neutrality commitments.' },
              { title: 'Circular Economy Principles', description: 'We prioritize reuse before recycling and recycling before disposal. IT equipment is remarketed when possible. Pallets are repaired and returned to service. Textiles are donated before fiber reclamation. The goal is maximum value retention at every stage.' },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 60}>
                <div className="bg-gray-50 border border-gray-100 rounded-[20px] p-7 hover:shadow-md transition-all duration-300">
                  <h3 className="font-extrabold text-gray-800 mb-2" style={{ letterSpacing: '-0.015em' }}>{item.title}</h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Social + Governance — dark */}
      <section className="py-24 bg-dark-bg relative overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.08) 0%, transparent 60%)' }} />
        <div className="container-rq relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollReveal>
              <div>
                <h2 className="text-2xl font-extrabold text-white mb-6" style={{ letterSpacing: '-0.025em' }}>Social Responsibility</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Community Collection Events', description: 'We organize and staff recycling collection events for communities, campuses, and corporate campuses — making responsible recycling accessible beyond commercial operations.' },
                    { title: 'Donation-First Junk Removal', description: 'Usable items from junk removal and cleanout services go to local charities before anything is recycled or disposed. 60-70% of items we haul are donated or recycled.' },
                    { title: 'Employee Safety & Training', description: 'All personnel handling materials are trained in OSHA, DOT, and material-specific safety protocols. Background-checked and bonded drivers handle confidential and hazardous materials.' },
                  ].map(item => (
                    <div key={item.title} className="bg-dark-card border border-dark-border rounded-[16px] p-5">
                      <h3 className="font-extrabold text-white mb-1 text-[15px]">{item.title}</h3>
                      <p className="text-[13px] text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div>
                <h2 className="text-2xl font-extrabold text-white mb-6" style={{ letterSpacing: '-0.025em' }}>Governance</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Certified Vendor Network', description: 'Every downstream processor holds R2, e-Stewards, ISO 14001, NAID AAA, or equivalent certification. We audit vendor compliance annually and remove partners who fall below standards.' },
                    { title: 'Transparent Reporting', description: 'Monthly reports with actual weight data from certified scales — not estimates. Clients can verify every number against weight tickets and processor receipts.' },
                    { title: 'Regulatory Compliance', description: 'EPA RCRA, DOT, state environmental agencies, OSHA — we maintain compliance across all applicable regulatory frameworks and provide documentation that proves it.' },
                  ].map(item => (
                    <div key={item.title} className="bg-dark-card border border-dark-border rounded-[16px] p-5">
                      <h3 className="font-extrabold text-white mb-1 text-[15px]">{item.title}</h3>
                      <p className="text-[13px] text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Cross-link to ESG challenge + reporting */}
      <section className="py-16 bg-primary-50 border-y border-primary-light">
        <div className="container-rq">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-xl font-extrabold text-gray-800" style={{ letterSpacing: '-0.02em' }}>Need ESG Data for Your Own Reports?</h2>
                <p className="text-gray-500 text-[14px] mt-1">Our recycling programs include ESG-ready reporting formatted for GRI, SASB, CDP, and SEC frameworks.</p>
              </div>
              <div className="flex gap-2.5 shrink-0">
                <Link href="/challenges/esg-reporting" className="btn-primary text-[13px]">ESG Reporting Solutions <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
                <Link href="/about/our-impact" className="btn-outline text-[13px]">See Our Impact</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTABlock title="Sustainability Starts With Your Next Pickup" subtitle="Every recycling program we manage includes documented environmental impact data. Let's talk about yours." />
    </>
  );
}
