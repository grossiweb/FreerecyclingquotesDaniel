import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CONTACT } from '@/lib/data';
import { JsonLd, webPageSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { SectionHeader, CTABlock, ScrollReveal } from '@/components/ui';

export const metadata: Metadata = {
  title: 'About Recycling Quotes — Since 2005',
  description: 'Learn about Recycling Quotes — a nationwide recycling services network founded in 2005. R2, e-Stewards, and ISO certified. 52+ cities, 10,000+ businesses served.',
  alternates: { canonical: 'https://recyclingquotes.com/about' },
};

const ABOUT_PAGES = [
  { slug: 'our-story', icon: 'auto_stories', title: 'Our Story', desc: 'How we grew from a single recycling operation in Fort Worth to a nationwide network serving 52+ cities since 2005.' },
  { slug: 'why-choose-us', icon: 'verified', title: 'Why Choose Us', desc: 'What sets Recycling Quotes apart: the largest certified network, nationwide coverage, and complete compliance documentation.' },
  { slug: 'esg', icon: 'eco', title: 'ESG & Sustainability', desc: 'Our environmental, social, and governance commitments — and how we help your business meet its sustainability goals.' },
  { slug: 'our-impact', icon: 'trending_up', title: 'Our Impact', desc: '500,000+ tons diverted, 1.2M gallons of water preserved, and a 92% material recovery rate — see the numbers.' },
  { slug: 'certifications', icon: 'workspace_premium', title: 'Certifications', desc: 'R2, e-Stewards, ISO 14001, ISO 9001, EPA, NAID — every certification our network holds and what they mean for you.' },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/about', name: 'About Recycling Quotes', description: 'Nationwide recycling services network founded in 2005. R2, e-Stewards, and ISO certified.' })} />
      <Breadcrumbs items={[{ name: 'About', href: '/about' }]} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1600&h=600&fit=crop" alt="Recycling operations" width={1600} height={600} className="w-full h-full object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/95 via-dark-bg/85 to-dark-bg/60" />
        </div>
        <div className="container-rq relative z-10 py-20 lg:py-28">
          <div className="max-w-2xl">
            <ScrollReveal>
              <div className="section-tag !bg-white/10 !text-white/80 mb-6"><span className="material-symbols-outlined text-[14px]">info</span> Since 2005</div>
              <h1 className="font-extrabold text-white leading-[1.08] mb-5" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.25rem)', letterSpacing: '-0.035em' }}>
                About <span className="text-[#4ADE80]">Recycling Quotes</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <p className="definition-block text-white/70 text-[17px] leading-relaxed max-w-xl mb-8">
                Recycling Quotes is a nationwide recycling services network that connects businesses with certified recycling solutions for 15+ material types across 52+ cities. Founded in 2005 and headquartered in Fort Worth, Texas, we&apos;ve helped over 10,000 businesses divert 500,000+ tons of materials from landfills with full compliance documentation.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <div className="flex gap-2.5 flex-wrap">
                <Link href="/about/our-story" className="btn-white">Our Story <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
                <Link href="/about/certifications" className="btn-outline-white"><span className="material-symbols-outlined text-[16px]">workspace_premium</span> Our Certifications</Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-0 bg-white">
        <div className="container-rq -mt-1">
          <ScrollReveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 bg-dark-bg rounded-[20px] overflow-hidden">
              {[
                { num: '2005', label: 'Founded' },
                { num: '52+', label: 'Cities Served' },
                { num: '10K+', label: 'Businesses Served' },
                { num: '500K+', label: 'Tons Diverted' },
              ].map((stat, i) => (
                <div key={stat.label} className="py-7 px-6 text-center relative">
                  {i < 3 && <div className="hidden lg:block absolute top-[20%] right-0 bottom-[20%] w-px bg-dark-border" />}
                  <div className="font-extrabold text-white leading-none text-2xl" style={{ letterSpacing: '-0.03em' }}>
                    <span className="text-[#4ADE80]">{stat.num}</span>
                  </div>
                  <div className="text-[11px] text-gray-400 font-medium mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About sub-pages grid */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <ScrollReveal>
            <SectionHeader tag="Learn More" tagIcon="menu_book" title="Explore Our Company" subtitle="Everything you need to know about who we are, what we stand for, and why businesses trust us." />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ABOUT_PAGES.map((page, i) => (
              <ScrollReveal key={page.slug} delay={i * 60}>
                <Link href={`/about/${page.slug}`} className="block bg-gray-50 border border-gray-100 rounded-[20px] p-7 group hover:bg-white hover:border-primary-light hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-full">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
                  <div className="w-12 h-12 rounded-[12px] bg-primary-light flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-[24px] text-primary">{page.icon}</span>
                  </div>
                  <h2 className="font-extrabold text-gray-800 text-lg mb-2" style={{ letterSpacing: '-0.015em' }}>{page.title}</h2>
                  <p className="text-[13px] text-gray-400 leading-relaxed mb-3">{page.desc}</p>
                  <span className="inline-flex items-center gap-1 text-[13px] font-bold text-primary group-hover:gap-2 transition-all">
                    Read more <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="py-24 bg-gray-50">
        <div className="container-rq max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div className="section-tag mb-6"><span className="material-symbols-outlined text-[14px]">flag</span> Our Mission</div>
            <h2 className="section-title mb-6">Making Responsible Recycling Accessible to Every Business</h2>
            <p className="text-gray-500 text-[16px] leading-relaxed mb-4">
              We believe every business — regardless of size, industry, or location — should have access to certified, transparent, and affordable recycling services. Our mission is to eliminate the complexity of commercial recycling by connecting businesses with a nationwide network of vetted, certified processors who handle everything from pickup to compliance documentation.
            </p>
            <p className="text-gray-500 text-[16px] leading-relaxed">
              We measure our success not in revenue, but in tons diverted from landfills, compliance certificates issued, and the sustainability goals we help our clients achieve. Since 2005, that has meant over 500,000 tons diverted, a 92% material recovery rate, and a zero-landfill commitment across our certified network.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <CTABlock title="Want to Work With Us?" subtitle="Get a free recycling quote and see how we can help your business achieve its sustainability goals." />
    </>
  );
}
