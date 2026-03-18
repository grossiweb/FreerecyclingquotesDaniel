import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT } from '@/lib/data';
import { JsonLd, webPageSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PageHero from '@/components/ui/PageHero';
import { CTABlock, ScrollReveal } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Why Choose Recycling Quotes',
  description: 'Largest certified recycling network, nationwide coverage, complete documentation, and a single point of contact. Here\'s why 10,000+ businesses choose us.',
  alternates: { canonical: 'https://recyclingquotes.com/about/why-choose-us' },
};

const DIFFERENTIATORS = [
  { title: 'Largest Certified Network', description: 'We\'ve built the largest network of R2, e-Stewards, and ISO 14001 certified recycling processors in the industry. Every partner is vetted, audited, and held to documented standards. You don\'t research recyclers — we\'ve already done it.', stat: '97+ cities' },
  { title: 'One Vendor, Every Stream', description: 'Metals, cardboard, plastics, electronics, pallets, hazardous waste, document shredding — all under one contract with one invoice and one account manager. No more coordinating 5 vendors with 5 different schedules.', stat: '17 services' },
  { title: 'Documentation, Not Promises', description: 'Every pickup generates weight tickets. Every data-bearing device gets a Certificate of Destruction. Every program produces monthly reports with diversion rates, carbon offset, and ESG-ready metrics. Your compliance team gets data, not anecdotes.', stat: '100% documented' },
  { title: 'Free Commercial Pickup', description: 'For qualifying commercial volumes, pickup is free in all 97+ service cities. We bring the containers, handle the logistics, and manage the processing. No hidden fees, no fuel surcharges on recycling hauls.', stat: 'Free pickup' },
  { title: 'Revenue From Your Waste', description: 'Scrap metal, clean cardboard, and Grade A pallets have commodity value. We pay market rates for qualifying materials — turning your disposal cost into a revenue line. Many programs are net revenue-positive.', stat: 'Revenue share' },
  { title: 'Multi-Location at Scale', description: 'From 3 locations to 300 — we manage recycling programs across all your facilities with consistent service, consolidated billing, and one report that covers every site. Your operations team gets one phone number for everything.', stat: 'Nationwide' },
];

export default function WhyChooseUsPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/about/why-choose-us', name: 'Why Choose Recycling Quotes', description: 'Largest certified network, nationwide coverage, complete documentation.' })} />
      <Breadcrumbs items={[{ name: 'About', href: '/about' }, { name: 'Why Choose Us', href: '/about/why-choose-us' }]} />

      <PageHero tag="Why Us" tagIcon="verified" title="Why 10,000+ Businesses" titleAccent="Choose Us" description="We're not the only recycling company. But we are the only one with a nationwide certified network, 17 services under one contract, and documentation that satisfies every compliance framework you face." image="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&h=600&fit=crop" primaryCta={{ label: 'Get a Quote', href: '/get-a-quote', icon: 'arrow_forward' }} showPhone />

      {/* Differentiators */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <ScrollReveal><h2 className="section-title mb-10">What Sets Us Apart</h2></ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {DIFFERENTIATORS.map((d, i) => (
              <ScrollReveal key={d.title} delay={i * 60}>
                <div className="bg-gray-50 border border-gray-100 rounded-[20px] p-7 hover:bg-white hover:border-primary-light hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-full">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform" />
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-extrabold text-gray-800 text-lg" style={{ letterSpacing: '-0.015em' }}>{d.title}</h3>
                    <span className="text-[12px] font-bold text-primary bg-primary-light px-3 py-1 rounded-full shrink-0">{d.stat}</span>
                  </div>
                  <p className="text-[14px] text-gray-400 leading-relaxed">{d.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 bg-dark-bg relative overflow-hidden">
        <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.08) 0%, transparent 60%)' }} />
        <div className="container-rq relative z-10">
          <ScrollReveal><h2 className="section-title !text-white mb-10">How We Compare</h2></ScrollReveal>
          <ScrollReveal>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-dark-border">
                    <th className="py-4 pr-6 text-gray-400 font-bold uppercase tracking-wider text-[11px]">Feature</th>
                    <th className="py-4 px-4 text-[#4ADE80] font-bold text-center">Recycling Quotes</th>
                    <th className="py-4 px-4 text-gray-500 font-bold text-center">Local Hauler</th>
                    <th className="py-4 px-4 text-gray-500 font-bold text-center">National Waste Co.</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {[
                    ['R2 / e-Stewards certified', '✓', '✗', 'Varies'],
                    ['NIST 800-88 data destruction', '✓', '✗', '✗'],
                    ['17 recycling services', '✓', '2-3', '5-6'],
                    ['Free commercial pickup', '✓', 'Sometimes', 'Fee-based'],
                    ['ESG-ready reporting', '✓', '✗', 'Extra cost'],
                    ['Multi-location nationwide', '✓', '✗', '✓'],
                    ['Revenue share on materials', '✓', 'Rare', '✗'],
                    ['Certificate of Destruction', '✓', '✗', 'Extra cost'],
                    ['Dedicated account manager', '✓', '✗', 'Large accounts only'],
                  ].map(([feature, us, local, national]) => (
                    <tr key={feature} className="border-b border-dark-border/50">
                      <td className="py-3 pr-6 text-gray-400">{feature}</td>
                      <td className="py-3 px-4 text-center font-bold text-[#4ADE80]">{us}</td>
                      <td className="py-3 px-4 text-center text-gray-500">{local}</td>
                      <td className="py-3 px-4 text-center text-gray-500">{national}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Trust stats */}
      <section className="py-20 bg-primary-50 border-y border-primary-light">
        <div className="container-rq">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { stat: '10,000+', label: 'Businesses served' },
              { stat: '500K+', label: 'Tons diverted from landfill' },
              { stat: '97+', label: 'Cities worldwide' },
              { stat: '20 years', label: 'In the recycling industry' },
            ].map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 60}>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-extrabold text-primary mb-1" style={{ letterSpacing: '-0.03em' }}>{s.stat}</div>
                  <p className="text-[13px] text-gray-500">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTABlock title="See the Difference for Yourself" subtitle="Get a free quote and experience the Recycling Quotes difference — certified processing, complete documentation, and a single point of contact." />
    </>
  );
}
