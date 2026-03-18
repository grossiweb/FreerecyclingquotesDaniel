import Link from 'next/link';
import Image from 'next/image';
import { SERVICES, MATERIALS, INDUSTRIES, CONTACT } from '@/lib/data';
import { JsonLd, webPageSchema } from '@/lib/schema';
import { SectionHeader, CTABlock, ScrollReveal } from '@/components/ui';

// Homepage WebPage schema (Structured Data §3.1)
const homeSchema = webPageSchema({
  path: '',
  name: 'Free Recycling Quotes | Electronics, Metal, Paper, Plastic & More',
  description: 'Get free recycling quotes for electronics, metal, paper, plastic, pallets, and hazardous materials. Nationwide pickup service since 2005.',
});

export default function HomePage() {
  const featuredServices = SERVICES.filter(s => ['pallet-recycling', 'business-recycling-programs', 'it-asset-disposition', 'dumpster-rental'].includes(s.slug));
  const colorMap = { green: 'icon-box-green', amber: 'icon-box-amber', blue: 'icon-box-blue', teal: 'icon-box-teal' } as const;

  return (
    <>
      <JsonLd data={homeSchema} />

      {/* ═══ HERO — with background image ═══ */}
      <section className="relative overflow-hidden bg-[#F0FAF3]" style={{ marginTop: '-72px', paddingTop: '0' }}>
        {/* Hero background image — copy hero-bg.png from your Vercel project to public/images/ */}
        {/* If the image doesn't exist yet, the gradient background shows as fallback */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.png"
            alt=""
            width={1600}
            height={800}
            className="w-full h-full object-cover object-center"
            priority
          />
        </div>

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-15" style={{
          backgroundImage: 'linear-gradient(#1B7A3D10 1px, transparent 1px), linear-gradient(90deg, #1B7A3D10 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 100%)',
        }} />

        <div className="container-rq relative z-10 text-center" style={{ paddingTop: 'calc(72px + 40px + 72px)', paddingBottom: '48px' }}>
          <div className="max-w-[800px] mx-auto">
            <ScrollReveal>
              <h1 className="font-extrabold leading-[1.08] text-gray-800" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 3.75rem)', letterSpacing: '-0.035em' }}>
                Recycling that helps businesses build a more <span className="text-primary">sustainable future</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <Image src="/images/hero-underline.png" alt="" width={220} height={12} className="mx-auto mt-2 mb-5 opacity-70" />
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <p className="text-gray-500 text-[17px] leading-relaxed max-w-[560px] mx-auto mb-7">
                Get quick, dependable recycling solutions for end-of-life products, materials, and business waste — with guidance you can trust.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <div className="flex gap-2.5 justify-center flex-wrap">
                <Link href="/get-a-quote" className="btn-primary">
                  Get a Quote <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
                <a href={CONTACT.phoneHref} className="btn-outline">
                  <span className="material-symbols-outlined text-[16px]">phone</span> {CONTACT.phone}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ ESG IMPACT CARDS + STATS ═══ */}
      <section className="bg-[#FAFCFB] pb-12">
        <div className="container-rq">
          <ScrollReveal>
            <div className="text-[11px] font-bold uppercase tracking-[.1em] text-gray-400 mb-6 text-center">Impacts We Make</div>
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {[
              { icon: 'park', title: 'Environmental', desc: 'We maximize your company\'s recycling efforts to reduce environmental impact, including climate risks, emissions, and resource use.' },
              { icon: 'diversity_3', title: 'Social', desc: 'Our recycling solutions help companies build trust with stakeholders, employees, and communities while addressing health, safety, and labor practices.' },
              { icon: 'shield', title: 'Governance', desc: 'We ensure recycling programs are transparent, compliant, and accountable — with documented oversight and responsible recycling practices.' },
            ].map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 80}>
                <div className="bg-white border border-gray-200 rounded-[20px] p-7 text-left relative overflow-hidden group hover:-translate-y-1 hover:shadow-lg hover:border-primary-light transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
                  <div className="w-[52px] h-[52px] rounded-[12px] bg-primary-light flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-[26px] text-primary">{card.icon}</span>
                  </div>
                  <h3 className="font-extrabold text-gray-800 mb-2" style={{ letterSpacing: '-0.015em' }}>{card.title}</h3>
                  <p className="text-[13px] text-gray-400 leading-relaxed">{card.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 bg-dark-bg rounded-[20px] overflow-hidden mt-8">
              {[
                { num: '500,000+', label: 'Tons Diverted' },
                { num: '1.2M', label: 'Gallons Water Preserved' },
                { num: '92%', label: 'Material Recovery Rate' },
                { num: 'Zero', label: 'Landfill Commitment' },
              ].map((stat, i) => (
                <div key={stat.label} className="py-7 px-6 text-center relative">
                  {i < 3 && <div className="hidden lg:block absolute top-[20%] right-0 bottom-[20%] w-px bg-dark-border" />}
                  <div className="font-extrabold text-white leading-none" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.03em' }}>
                    <span className="text-[#4ADE80]">{stat.num}</span>
                  </div>
                  <div className="text-[11px] text-gray-400 font-medium mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ MATERIAL SELECTOR ═══ */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container-rq">
          <ScrollReveal>
            <SectionHeader tag="Materials" tagIcon="category" title="What Do You Need to Recycle?" subtitle="Select a material to get a free quote and schedule a pickup." />
          </ScrollReveal>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {MATERIALS.map((mat, i) => (
              <ScrollReveal key={mat.slug} delay={Math.min(i * 40, 320)}>
                <Link href={`/materials/${mat.slug}`} className="flex flex-col items-center gap-2.5 py-5 px-2 bg-gray-50 border border-gray-100 rounded-[12px] text-center relative group hover:bg-white hover:-translate-y-[3px] hover:shadow-md transition-all duration-300">
                  <div className="absolute inset-[-1px] rounded-[12px] border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className={`icon-box w-12 h-12 rounded-[8px] ${colorMap[mat.color]}`}>
                    <span className="material-symbols-outlined text-[24px]">{mat.icon}</span>
                  </div>
                  <span className="text-[13px] font-semibold text-gray-600 group-hover:text-primary transition-colors" style={{ letterSpacing: '-0.01em' }}>{mat.name}</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="py-24 bg-gray-50">
        <div className="container-rq">
          <ScrollReveal>
            <SectionHeader tag="Services" tagIcon="handyman" title="Recycling Services for Every Business" subtitle="Certified recycling, logistics, and compliance services — tailored to your industry and scale." />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredServices.map((svc, i) => (
              <ScrollReveal key={svc.slug} delay={i * 80}>
                <Link href={`/services/${svc.slug}`} className="block bg-white border border-gray-200 rounded-[20px] p-6 relative overflow-hidden group hover:-translate-y-1 hover:shadow-lg hover:border-transparent transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-350" />
                  <div className={`icon-box mb-3.5 ${colorMap[svc.color]}`}>
                    <span className="material-symbols-outlined text-[22px]">{svc.icon}</span>
                  </div>
                  <h3 className="font-extrabold text-gray-800 mb-1.5" style={{ letterSpacing: '-0.015em' }}>{svc.name}</h3>
                  <p className="text-[13px] text-gray-400 leading-relaxed mb-3.5">{svc.description}</p>
                  <span className="inline-flex items-center gap-[3px] text-[13px] font-bold text-primary">
                    Learn more <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform duration-200">arrow_forward</span>
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="text-center mt-10">
              <Link href="/services" className="btn-outline">View All Services <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <ScrollReveal>
            <SectionHeader tag="Process" tagIcon="timeline" title="How It Works" subtitle="Three simple steps from quote to certified recycling." />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-px" style={{ background: 'linear-gradient(90deg, transparent, #E2E8E5 20%, #E2E8E5 80%, transparent)' }} />
            {[
              { num: '1', title: 'Request a Quote', desc: 'Tell us what you need to recycle. We\'ll provide a free, no-obligation quote within 24 hours.' },
              { num: '2', title: 'Schedule Pickup', desc: 'Choose a pickup date. We handle logistics, transportation, and all the heavy lifting.' },
              { num: '3', title: 'Get Your Certificate', desc: 'Receive your Certificate of Recycling with full compliance documentation and rewards.' },
            ].map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 80}>
                <div className="text-center relative">
                  <div className="w-16 h-16 flex items-center justify-center bg-dark-bg text-[#4ADE80] text-xl font-extrabold rounded-full mx-auto mb-5 relative z-10" style={{ boxShadow: '0 4px 16px rgba(10,15,12,.2)', letterSpacing: '-0.02em' }}>
                    {step.num}
                  </div>
                  <h3 className="font-extrabold text-gray-800 mb-1.5" style={{ fontSize: 'clamp(1.0625rem, 2vw, 1.25rem)', letterSpacing: '-0.015em' }}>{step.title}</h3>
                  <p className="text-[13px] text-gray-400 leading-relaxed max-w-[260px] mx-auto">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INDUSTRIES ═══ */}
      <section className="py-24 bg-gray-50">
        <div className="container-rq">
          <ScrollReveal>
            <SectionHeader tag="Industries" tagIcon="domain" title="Industries We Serve" subtitle="Recycling solutions tailored to the compliance and operational needs of your industry." />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {INDUSTRIES.map((ind, i) => (
              <ScrollReveal key={ind.slug} delay={i * 60}>
                <Link href={`/industries/${ind.slug}`} className="relative rounded-[20px] overflow-hidden aspect-[3/2.2] block group">
                  <Image src={ind.image} alt={ind.name} width={400} height={300} className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 transition-all duration-300" style={{ background: 'linear-gradient(180deg, transparent 35%, rgba(10,15,12,.88) 100%)' }}>
                    <h3 className="text-white text-[15px] font-extrabold" style={{ letterSpacing: '-0.01em' }}>{ind.name}</h3>
                    <p className="text-white/60 text-[12px] mt-[3px] font-medium">{ind.description}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="py-[52px] bg-dark-bg relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.06) 0%, transparent 60%)' }} />
        <div className="container-rq relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { num: '500K+', label: 'Tons Diverted from Landfill' },
              { num: '52+', label: 'Cities Served Nationwide' },
              { num: '10K+', label: 'Businesses Trust Us' },
              { num: '15+', label: 'Years in Business' },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 60}>
                <div className="relative">
                  {i < 3 && <div className="hidden lg:block absolute top-[10%] right-[-16px] bottom-[10%] w-px bg-dark-border" />}
                  <div className="font-extrabold text-white leading-none" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', letterSpacing: '-0.03em' }}>
                    <span className="text-[#4ADE80]">{stat.num}</span>
                  </div>
                  <div className="text-[12px] text-gray-400 font-medium mt-1">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <ScrollReveal>
            <SectionHeader tag="Testimonials" tagIcon="format_quote" title="Trusted by Businesses Nationwide" subtitle="See why companies choose Recycling Quotes for their recycling needs." />
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[
              { quote: 'Recycling Quotes simplified our entire e-waste compliance process. Their ITAD team handled everything from data destruction to the final certificate. Couldn\'t be happier.', name: 'Michael R.', role: 'IT Director · Healthcare', initials: 'MR' },
              { quote: 'We schedule regular pallet pickups across three distribution centers. The process is seamless and our diversion rate went from 40% to over 90% in six months.', name: 'Sarah K.', role: 'Operations Manager · Logistics', initials: 'SK' },
              { quote: 'Their dumpster rental service saved our construction project thousands. Fast delivery, competitive pricing, and they handled all the waste diversion documentation.', name: 'James L.', role: 'Project Manager · Construction', initials: 'JL' },
            ].map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 80}>
                <div className="bg-gray-50 border border-gray-100 rounded-[20px] p-6 hover:shadow-md hover:border-gray-200 transition-all duration-300">
                  <div className="flex gap-px mb-3.5">
                    {[...Array(5)].map((_, s) => <span key={s} className="material-symbols-outlined text-[16px] text-accent-amber">star</span>)}
                  </div>
                  <p className="text-[13px] text-gray-500 leading-relaxed mb-[18px]">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-primary-light rounded-full flex items-center justify-center font-extrabold text-[11px] text-primary">{t.initials}</div>
                    <div>
                      <div className="font-bold text-[13px] text-gray-800">{t.name}</div>
                      <div className="text-[11px] text-gray-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CHALLENGES CALLOUT ═══ */}
      <section className="py-24 bg-gray-50">
        <div className="container-rq">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-center bg-dark-bg rounded-[28px] p-12 lg:p-[52px] relative overflow-hidden">
              <div className="absolute top-[-120px] right-[-80px] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.1) 0%, transparent 60%)' }} />
              <div className="absolute inset-0 rounded-[28px] border border-white/[.04] pointer-events-none" />
              <div className="relative z-10">
                <div className="section-tag !bg-[rgba(27,122,61,.15)]">
                  <span className="material-symbols-outlined text-[14px]">psychology</span> Challenges
                </div>
                <h2 className="section-title !text-white mb-3">Struggling with Recycling Challenges?</h2>
                <p className="text-dark-text leading-relaxed mb-6 text-[15px]">Whether it&apos;s e-waste compliance, ESG reporting, or rising disposal costs — we solve the problems that keep operations managers up at night.</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'E-Waste Compliance', icon: 'gavel', href: '/challenges/ewaste-compliance' },
                    { label: 'ESG Reporting', icon: 'eco', href: '/challenges/esg-reporting' },
                    { label: 'Cost Reduction', icon: 'savings', href: '/challenges/cost-reduction' },
                    { label: 'Waste Diversion', icon: 'alt_route', href: '/challenges/waste-diversion' },
                    { label: 'Hazardous Waste', icon: 'warning', href: '/challenges/hazardous-waste' },
                  ].map(tag => (
                    <Link key={tag.label} href={tag.href} className="inline-flex items-center gap-[5px] px-3.5 py-[7px] bg-dark-card border border-dark-border rounded-full text-[13px] font-semibold text-dark-text hover:border-primary hover:text-white hover:bg-dark-card-hover transition-all duration-200">
                      <span className="material-symbols-outlined text-[14px]">{tag.icon}</span> {tag.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-6">
                  <Link href="/challenges" className="btn-white">Explore All Challenges <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 relative z-10">
                {[
                  { icon: 'shield', num: '100%', label: 'Compliance Rate' },
                  { icon: 'trending_down', num: '35%', label: 'Cost Reduction' },
                  { icon: 'eco', num: '92%', label: 'Diversion Rate' },
                  { icon: 'schedule', num: '24hr', label: 'Quote Response' },
                ].map(card => (
                  <div key={card.label} className="bg-dark-card border border-dark-border rounded-[12px] p-5 text-center hover:border-[rgba(74,222,128,.2)] hover:-translate-y-0.5 transition-all duration-300">
                    <span className="material-symbols-outlined text-[24px] text-[#4ADE80] mb-2">{card.icon}</span>
                    <div className="text-[1.375rem] font-extrabold text-white" style={{ letterSpacing: '-0.02em' }}>{card.num}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{card.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ BLOG PREVIEW ═══ */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <ScrollReveal>
            <SectionHeader tag="Resources" tagIcon="article" title="Resources & Insights" subtitle="Stay up to date on recycling regulations, best practices, and industry trends." />
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[
              { slug: 'ewaste-compliance-guide-2026', tag: 'Compliance', title: 'The Complete Guide to E-Waste Compliance in 2026', desc: 'Everything you need to know about federal and state e-waste regulations for your business.', img: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=400&h=200&fit=crop' },
              { slug: 'esg-reporting-recycling', tag: 'ESG', title: 'How Recycling Programs Support ESG Goals', desc: 'Learn how to document and report your recycling impact for ESG disclosures and stakeholder reporting.', img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&h=200&fit=crop' },
              { slug: 'reduce-waste-disposal-costs', tag: 'Cost Savings', title: '5 Ways to Reduce Waste Disposal Costs This Year', desc: 'Practical strategies to lower your recycling and waste management spend without sacrificing compliance.', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=200&fit=crop' },
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
              <Link href="/resources/blog" className="btn-outline">View All Resources <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <CTABlock />
    </>
  );
}
