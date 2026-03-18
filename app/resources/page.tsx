import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { JsonLd, webPageSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { SectionHeader, CTABlock, ScrollReveal } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Recycling Resources & Insights',
  description: 'Explore recycling guides, blog posts, FAQs, videos, industry news, and recycling statistics. Stay informed on compliance, best practices, and sustainability.',
  alternates: { canonical: 'https://recyclingquotes.com/resources' },
};

const RESOURCE_SECTIONS = [
  { slug: 'blog', icon: 'article', title: 'Blog', desc: 'In-depth articles on recycling compliance, industry trends, cost reduction strategies, and sustainability best practices.', color: 'green' },
  { slug: 'faq', icon: 'help', title: 'FAQ Hub', desc: 'Answers to the most common recycling questions — organized by service, material, industry, and challenge.', color: 'green' },
  { slug: 'videos', icon: 'play_circle', title: 'Videos', desc: 'Watch our recycling process walkthroughs, facility tours, client testimonials, and educational content.', color: 'blue' },
  { slug: 'guides', icon: 'menu_book', title: 'Guides & Downloads', desc: 'Downloadable recycling guides, compliance checklists, waste audit templates, and ESG reporting frameworks.', color: 'blue' },
  { slug: 'news', icon: 'newspaper', title: 'Recycling News', desc: 'The latest developments in recycling regulations, industry consolidation, market pricing, and environmental policy.', color: 'amber' },
  { slug: 'statistics', icon: 'bar_chart', title: 'Recycling Statistics', desc: 'Key recycling data: national diversion rates, material recovery metrics, industry benchmarks, and environmental impact numbers.', color: 'amber' },
];

const colorMap = { green: 'bg-primary-light text-primary', blue: 'bg-accent-blue-light text-accent-blue', amber: 'bg-accent-amber-light text-accent-amber' } as const;

export default function ResourcesPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/resources', name: 'Recycling Resources & Insights', description: 'Guides, blog posts, FAQs, videos, news, and statistics on recycling.' })} />
      <Breadcrumbs items={[{ name: 'Resources', href: '/resources' }]} />

      {/* §1 Hero */}
      <section className="py-16 lg:py-20 bg-[#FAFCFB]">
        <div className="container-rq text-center max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="section-tag mb-6"><span className="material-symbols-outlined text-[14px]">school</span> Knowledge Base</div>
            <h1 className="font-extrabold text-gray-800 leading-[1.08] mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', letterSpacing: '-0.035em' }}>
              Recycling Resources & <span className="text-primary">Insights</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p className="definition-block text-gray-500 text-[17px] leading-relaxed max-w-xl mx-auto">
              Stay informed on recycling regulations, compliance requirements, cost reduction strategies, and sustainability trends. Our resource library covers everything from e-waste compliance guides to industry-specific recycling statistics.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* §2 Resource Sections Grid */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container-rq">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {RESOURCE_SECTIONS.map((res, i) => (
              <ScrollReveal key={res.slug} delay={i * 60}>
                <Link href={`/resources/${res.slug}`} className="block bg-gray-50 border border-gray-100 rounded-[20px] p-7 group hover:bg-white hover:border-primary-light hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-full">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
                  <div className={`w-12 h-12 rounded-[12px] flex items-center justify-center mb-4 ${colorMap[res.color as keyof typeof colorMap]}`}>
                    <span className="material-symbols-outlined text-[24px]">{res.icon}</span>
                  </div>
                  <h2 className="font-extrabold text-gray-800 text-lg mb-2" style={{ letterSpacing: '-0.015em' }}>{res.title}</h2>
                  <p className="text-[13px] text-gray-400 leading-relaxed mb-3">{res.desc}</p>
                  <span className="inline-flex items-center gap-1 text-[13px] font-bold text-primary group-hover:gap-2 transition-all">
                    Explore <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* §3 Latest Blog Posts */}
      <section className="py-24 bg-gray-50">
        <div className="container-rq">
          <ScrollReveal>
            <SectionHeader tag="Latest" tagIcon="auto_awesome" title="Latest from the Blog" subtitle="Recent articles on recycling compliance, sustainability, and industry trends." />
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[
              { slug: 'ewaste-compliance-guide-2026', tag: 'Compliance', title: 'The Complete Guide to E-Waste Compliance in 2026', desc: 'Federal and state e-waste regulations every business needs to know — from EPA RCRA to state-specific disposal laws.', img: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=400&h=200&fit=crop' },
              { slug: 'esg-reporting-recycling', tag: 'ESG', title: 'How Recycling Programs Support ESG Goals', desc: 'Document and report your recycling impact for GRI, SASB, and CDP frameworks with the right data collection strategy.', img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&h=200&fit=crop' },
              { slug: 'reduce-waste-disposal-costs', tag: 'Cost Savings', title: '5 Ways to Reduce Waste Disposal Costs This Year', desc: 'Practical strategies to lower your recycling and waste management spend without sacrificing compliance or service quality.', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=200&fit=crop' },
            ].map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 80}>
                <Link href={`/resources/blog/${post.slug}`} className="block border border-gray-100 rounded-[20px] overflow-hidden bg-white group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <div className="h-[180px] overflow-hidden">
                    <Image src={post.img} alt={post.title} width={400} height={200} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <span className="inline-block px-2.5 py-[3px] bg-primary-light text-primary text-[11px] font-bold rounded-full mb-2">{post.tag}</span>
                    <h3 className="font-extrabold text-gray-800 leading-[1.35] mb-1.5" style={{ fontSize: '0.9375rem', letterSpacing: '-0.015em' }}>{post.title}</h3>
                    <p className="text-[13px] text-gray-400 leading-relaxed">{post.desc}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="text-center mt-10">
              <Link href="/resources/blog" className="btn-outline">View All Articles <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTABlock title="Have a Recycling Question?" subtitle="Can't find what you're looking for? Contact our team and we'll help you find the answer." primaryLabel="Contact Us" primaryHref="/contact" />
    </>
  );
}
