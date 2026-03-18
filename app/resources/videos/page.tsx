import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { CTABlock, ScrollReveal } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Videos — Recycling Process Walkthroughs & Education',
  description: 'Watch recycling process walkthroughs, facility tours, data destruction demonstrations, and compliance education videos.',
  alternates: { canonical: 'https://recyclingquotes.com/resources/videos' },
};

const VIDEOS = [
  { icon: 'security', tag: 'Data Security', title: 'How NIST 800-88 Data Destruction Works', desc: 'Watch the three levels of media sanitization — Clear, Purge, and Destroy — demonstrated on HDDs and SSDs. See onsite mobile shredding in action.', related: '/services/data-destruction' },
  { icon: 'recycling', tag: 'Process', title: 'Inside an R2 Certified Electronics Recycling Facility', desc: 'Full facility tour: intake, sorting, data destruction, dismantling, precious metal recovery, and material shipping. See how e-waste becomes raw materials.', related: '/services/electronics-recycling' },
  { icon: 'local_shipping', tag: 'Process', title: 'Scrap Metal Recycling: From Pickup to Mill', desc: 'Follow a load of scrap metal from commercial pickup through sorting, grading, processing, and delivery to a domestic steel mill.', related: '/services/scrap-metal-recycling' },
  { icon: 'assessment', tag: 'Education', title: 'What Happens During a Waste Audit', desc: 'Walk through a commercial waste audit step by step — waste stream identification, volume measurement, cost analysis, and program recommendations.', related: '/services/waste-audits-consulting' },
  { icon: 'description', tag: 'Compliance', title: 'Reading a Hazardous Waste Manifest', desc: 'Line-by-line walkthrough of EPA Form 8700-22. What each field means, who fills it out, and what to check when you receive your return copy.', related: '/challenges/hazardous-waste' },
  { icon: 'phone_iphone', tag: 'Process', title: 'Cell Phone Recycling: Data to Materials', desc: 'See how smartphones are processed — data destruction, battery removal, circuit board recovery, and precious metal extraction from a single device.', related: '/materials/electronics/cell-phones' },
];

export default function VideosPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Resources', href: '/resources' }, { name: 'Videos', href: '/resources/videos' }]} />

      <section className="py-16 bg-gradient-to-br from-primary-50 via-[#FAFCFB] to-white">
        <div className="container-rq max-w-3xl">
          <ScrollReveal>
            <h1 className="font-extrabold text-gray-800 leading-[1.08] mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', letterSpacing: '-0.035em' }}>Videos</h1>
            <p className="text-gray-500 text-[16px] leading-relaxed">Process walkthroughs, facility tours, and compliance education. See how commercial recycling works from pickup to processing.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-rq">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VIDEOS.map((video, i) => (
              <ScrollReveal key={video.title} delay={i * 50}>
                <div className="bg-gray-50 border border-gray-100 rounded-[20px] overflow-hidden hover:bg-white hover:border-primary-light hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  {/* Video placeholder */}
                  <div className="h-[180px] bg-dark-bg flex items-center justify-center relative">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[32px] text-white/60">play_circle</span>
                    </div>
                    <span className="absolute top-3 right-3 px-2 py-1 bg-black/40 text-white text-[10px] font-bold rounded">Coming Soon</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-[16px] text-primary">{video.icon}</span>
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{video.tag}</span>
                    </div>
                    <h2 className="font-extrabold text-gray-800 mb-2 text-[15px]" style={{ letterSpacing: '-0.015em' }}>{video.title}</h2>
                    <p className="text-[13px] text-gray-400 leading-relaxed mb-3">{video.desc}</p>
                    <Link href={video.related} className="inline-flex items-center gap-1 text-[12px] font-bold text-primary hover:gap-2 transition-all">
                      Related page <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container-rq max-w-2xl text-center">
          <ScrollReveal>
            <span className="material-symbols-outlined text-[32px] text-gray-300 mb-3 block">videocam</span>
            <p className="text-gray-500 text-[15px] mb-4">Our video library is growing. Want to see a specific process or topic covered?</p>
            <Link href="/contact" className="btn-outline text-[13px]">Request a Video Topic</Link>
          </ScrollReveal>
        </div>
      </section>

      <CTABlock title="See Our Process Firsthand" subtitle="Schedule a virtual or in-person tour of our recycling facilities. See exactly how your materials are processed." />
    </>
  );
}
