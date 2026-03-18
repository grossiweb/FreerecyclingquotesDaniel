import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT } from '@/lib/data';
import { JsonLd, webPageSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PageHero from '@/components/ui/PageHero';
import { CTABlock, ScrollReveal } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Our Story — Recycling Quotes Since 2005',
  description: 'From a single recycling operation in Fort Worth to a nationwide network serving 97+ cities. Learn about our 20-year journey in certified commercial recycling.',
  alternates: { canonical: 'https://recyclingquotes.com/about/our-story' },
};

const MILESTONES = [
  { year: '2005', title: 'Founded in Fort Worth', description: 'Recycling Quotes launched as a single-market recycling brokerage in Fort Worth, Texas, connecting local businesses with certified scrap metal and electronics recyclers.' },
  { year: '2008', title: 'Expanded to 10 Cities', description: 'Grew from Texas into the Southeast and Midwest, adding Atlanta, Chicago, Houston, and six other major metros. Launched cardboard and pallet recycling programs.' },
  { year: '2012', title: 'R2 Certified Network', description: 'Established partnerships exclusively with R2 and e-Stewards certified processors for electronics recycling, making data security a core service differentiator.' },
  { year: '2015', title: '30+ Cities, 5,000 Clients', description: 'Reached 30 US metros and 5,000 business clients. Launched hazardous waste disposal and document shredding services. Added NIST 800-88 data destruction.' },
  { year: '2018', title: 'International Expansion', description: 'Extended service network into Canada (Toronto, Vancouver), the United Kingdom (London, Manchester), and Australia (Sydney, Melbourne).' },
  { year: '2020', title: 'ESG Reporting Launch', description: 'Introduced ESG-ready reporting for all managed accounts — GRI, SASB, and CDP formatted sustainability data built into every recycling program.' },
  { year: '2023', title: '80+ Cities, 10,000 Clients', description: 'Surpassed 10,000 business clients across 80+ cities in 4 countries. Added waste audit consulting and material recycling solutions for multi-stream management.' },
  { year: '2025', title: '97+ Cities, Full Service', description: 'Today: 97+ cities, 17 recycling services, 10 material categories, and a nationwide network of certified processors. 500,000+ tons diverted from landfill since founding.' },
];

export default function OurStoryPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/about/our-story', name: 'Our Story', description: 'The Recycling Quotes story — from Fort Worth to nationwide.' })} />
      <Breadcrumbs items={[{ name: 'About', href: '/about' }, { name: 'Our Story', href: '/about/our-story' }]} />

      <PageHero tag="Since 2005" tagIcon="auto_stories" title="Our" titleAccent="Story" description="From a single recycling brokerage in Fort Worth, Texas to a nationwide network serving 97+ cities across 4 countries. Here's how Recycling Quotes became the largest certified recycling services platform in the industry." image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=600&fit=crop" primaryCta={{ label: 'Get a Quote', href: '/get-a-quote', icon: 'arrow_forward' }} secondaryCta={{ label: 'Our Certifications', href: '/about/certifications', icon: 'workspace_premium' }} />

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="container-rq max-w-3xl">
          <ScrollReveal>
            <h2 className="section-title mb-8">Making Responsible Recycling Accessible</h2>
            <p className="definition-block text-gray-500 text-[15px] leading-relaxed mb-4">We started Recycling Quotes because we saw a disconnect: businesses wanted to recycle responsibly, but navigating the fragmented world of recycling vendors, certifications, and regulations was overwhelming. A manufacturer in Dallas shouldn't need a sustainability degree to recycle their scrap metal properly.</p>
            <p className="text-gray-500 text-[15px] leading-relaxed mb-4">Our mission has remained the same since 2005: eliminate the complexity of commercial recycling by connecting businesses with a vetted, certified network of processors who handle everything from pickup to compliance documentation. One call, one contract, complete accountability.</p>
            <p className="text-gray-500 text-[15px] leading-relaxed">We measure success not in revenue, but in tons diverted from landfills, compliance certificates issued, and the sustainability goals we help our clients achieve.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-dark-bg relative overflow-hidden">
        <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.08) 0%, transparent 60%)' }} />
        <div className="container-rq relative z-10">
          <ScrollReveal><h2 className="section-title !text-white mb-12">20 Years of Growth</h2></ScrollReveal>
          <div className="space-y-4">
            {MILESTONES.map((m, i) => (
              <ScrollReveal key={m.year} delay={i * 40}>
                <div className="flex gap-6 bg-dark-card border border-dark-border rounded-[20px] p-6 hover:border-[rgba(74,222,128,.15)] transition-all duration-300">
                  <div className="text-2xl font-extrabold text-[#4ADE80] shrink-0 w-16" style={{ letterSpacing: '-0.03em' }}>{m.year}</div>
                  <div>
                    <h3 className="font-extrabold text-white mb-1" style={{ letterSpacing: '-0.015em' }}>{m.title}</h3>
                    <p className="text-[13px] text-gray-400 leading-relaxed">{m.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <ScrollReveal><h2 className="section-title mb-10">What We Stand For</h2></ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: 'Certification Over Claims', description: 'We only work with R2, e-Stewards, ISO 14001, and NAID AAA certified processors. Every claim we make is backed by third-party audited certifications — not marketing promises.' },
              { title: 'Documentation Over Trust', description: 'Trust is important. Proof is better. Every pickup generates weight tickets, Certificates of Recycling, and compliance documentation. Your auditors see data, not anecdotes.' },
              { title: 'Accountability Over Convenience', description: 'We track materials from your dock to final processing. Downstream accountability means your waste doesn\'t end up in a landfill or shipped overseas. Our chain-of-custody is unbroken.' },
            ].map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 80}>
                <div className="bg-gray-50 border border-gray-100 rounded-[20px] p-7 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 h-full">
                  <h3 className="font-extrabold text-gray-800 mb-3" style={{ letterSpacing: '-0.015em' }}>{v.title}</h3>
                  <p className="text-[13px] text-gray-400 leading-relaxed">{v.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTABlock title="Work With a Team That's Been Doing This Since 2005" subtitle="20 years of recycling expertise. 97+ cities. 500,000+ tons diverted. Let's talk about your operation." />
    </>
  );
}
