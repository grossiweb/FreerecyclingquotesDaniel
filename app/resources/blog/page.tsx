import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { CTABlock, ScrollReveal } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Blog — Recycling Guides, News & Insights',
  description: 'Expert articles on e-waste compliance, cost reduction, ESG reporting, and commercial recycling best practices.',
  alternates: { canonical: 'https://recyclingquotes.com/resources/blog' },
};

const ARTICLES = [
  { slug: 'ewaste-compliance-guide-2026', tag: 'Compliance', title: 'The Complete Guide to E-Waste Compliance in 2026', desc: 'Federal, state, and industry-specific e-waste regulations every business needs to know — from RCRA to HIPAA to state mandates.', img: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=600&h=340&fit=crop', date: 'Mar 2026', related: '/challenges/ewaste-compliance' },
  { slug: 'esg-reporting-recycling', tag: 'ESG', title: 'How Recycling Programs Support ESG Goals', desc: 'Map your recycling data to GRI 306, SASB, CDP, and SEC frameworks. What metrics to track and how to report them.', img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&h=340&fit=crop', date: 'Feb 2026', related: '/challenges/esg-reporting' },
  { slug: 'reduce-waste-disposal-costs', tag: 'Cost Savings', title: '5 Ways to Reduce Waste Disposal Costs This Year', desc: 'Right-size containers, separate recyclables, negotiate contracts, and find revenue in your waste stream.', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=340&fit=crop', date: 'Feb 2026', related: '/challenges/cost-reduction' },
  { slug: 'nist-800-88-data-destruction', tag: 'Data Security', title: 'NIST 800-88 Data Destruction Methods Explained', desc: 'Clear, Purge, and Destroy — what each level means, when to use them, and how to document compliance.', img: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&h=340&fit=crop', date: 'Jan 2026', related: '/services/data-destruction' },
  { slug: 'r2-vs-estewards-certification', tag: 'Certifications', title: 'R2 vs e-Stewards: Which Certification Matters?', desc: 'Compare the two leading electronics recycling certifications — what they cover, how they differ, and which one your recycler should have.', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=340&fit=crop', date: 'Jan 2026', related: '/about/certifications' },
  { slug: 'scrap-metal-pricing-guide', tag: 'Metals', title: 'Scrap Metal Pricing: How It Works and What to Expect', desc: 'How commodity markets determine scrap pricing, what affects your rate, and how to maximize revenue from metal recycling.', img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=340&fit=crop', date: 'Dec 2025', related: '/services/scrap-metal-recycling' },
  { slug: 'commercial-food-waste-mandates', tag: 'Regulations', title: 'Commercial Food Waste Mandates by State (2026)', desc: 'Which states require organic waste diversion, what the thresholds are, and how to set up a compliant program.', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=340&fit=crop', date: 'Dec 2025', related: '/industries/food-services' },
  { slug: 'waste-audit-guide', tag: 'Getting Started', title: 'How to Conduct a Waste Audit: Step-by-Step Guide', desc: 'Everything you need to know about assessing your waste streams, establishing baselines, and designing a recycling program.', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=340&fit=crop', date: 'Nov 2025', related: '/services/waste-audits-consulting' },
  { slug: 'hipaa-it-equipment-disposal', tag: 'Healthcare', title: 'HIPAA-Compliant IT Equipment Disposal Guide', desc: 'What HIPAA requires for electronic media disposal, how to document destruction, and preparing for Joint Commission audits.', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=340&fit=crop', date: 'Nov 2025', related: '/industries/healthcare' },
];

export default function BlogPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Resources', href: '/resources' }, { name: 'Blog', href: '/resources/blog' }]} />

      <section className="py-16 bg-gradient-to-br from-primary-50 via-[#FAFCFB] to-white">
        <div className="container-rq max-w-3xl">
          <ScrollReveal>
            <h1 className="font-extrabold text-gray-800 leading-[1.08] mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', letterSpacing: '-0.035em' }}>Blog</h1>
            <p className="text-gray-500 text-[16px] leading-relaxed">Expert guides on recycling compliance, cost reduction, ESG reporting, and industry-specific best practices.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured */}
      <section className="py-16 bg-white">
        <div className="container-rq">
          <ScrollReveal>
            <Link href={`/resources/blog/${ARTICLES[0].slug}`} className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 bg-gray-50 border border-gray-100 rounded-[24px] overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="h-[280px] lg:h-full overflow-hidden">
                <Image src={ARTICLES[0].img} alt={ARTICLES[0].title} width={600} height={340} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-primary-light text-primary text-[11px] font-bold rounded-full mb-4 w-fit">{ARTICLES[0].tag}</span>
                <h2 className="font-extrabold text-gray-800 text-xl leading-snug mb-3 group-hover:text-primary transition-colors" style={{ letterSpacing: '-0.02em' }}>{ARTICLES[0].title}</h2>
                <p className="text-[14px] text-gray-500 leading-relaxed mb-4">{ARTICLES[0].desc}</p>
                <span className="inline-flex items-center gap-1 text-[13px] font-bold text-primary group-hover:gap-2 transition-all">Read article <span className="material-symbols-outlined text-[16px]">arrow_forward</span></span>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container-rq">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ARTICLES.slice(1).map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 50}>
                <Link href={`/resources/blog/${post.slug}`} className="block bg-white border border-gray-100 rounded-[20px] overflow-hidden group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="h-[180px] overflow-hidden">
                    <Image src={post.img} alt={post.title} width={400} height={200} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block px-2.5 py-[3px] bg-primary-light text-primary text-[11px] font-bold rounded-full">{post.tag}</span>
                      <span className="text-[11px] text-gray-400">{post.date}</span>
                    </div>
                    <h3 className="font-extrabold text-gray-800 leading-snug mb-2 group-hover:text-primary transition-colors" style={{ fontSize: '0.9375rem', letterSpacing: '-0.015em' }}>{post.title}</h3>
                    <p className="text-[13px] text-gray-400 leading-relaxed">{post.desc}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTABlock title="Want Industry-Specific Guidance?" subtitle="Our team provides custom recycling program recommendations based on your industry, materials, and compliance requirements." />
    </>
  );
}
