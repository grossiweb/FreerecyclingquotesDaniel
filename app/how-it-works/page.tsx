import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT } from '@/lib/data';
import { JsonLd, webPageSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { CTABlock, ScrollReveal } from '@/components/ui';

export const metadata: Metadata = {
  title: 'How It Works — 3 Steps to Certified Recycling',
  description: 'Get a free recycling quote, schedule a pickup, and receive your Certificate of Recycling — all in 3 simple steps. Free nationwide service.',
  alternates: { canonical: 'https://recyclingquotes.com/how-it-works' },
};

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/how-it-works', name: 'How It Works', description: '3 simple steps from quote to certified recycling.' })} />
      <Breadcrumbs items={[{ name: 'How It Works', href: '/how-it-works' }]} />

      <section className="py-16 lg:py-24 bg-[#FAFCFB]">
        <div className="container-rq max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal>
              <div className="section-tag mb-6"><span className="material-symbols-outlined text-[14px]">timeline</span> Simple Process</div>
              <h1 className="font-extrabold text-gray-800 leading-[1.08] mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', letterSpacing: '-0.035em' }}>
                How Recycling Quotes <span className="text-primary">Works</span>
              </h1>
              <p className="definition-block text-gray-500 text-[17px] leading-relaxed max-w-xl mx-auto">
                Recycling Quotes simplifies commercial recycling into three steps: request a quote, schedule your pickup, and receive your Certificate of Recycling. The entire process — from initial contact to completed recycling — typically takes 5-10 business days.
              </p>
            </ScrollReveal>
          </div>

          <div className="space-y-8">
            {[
              {
                num: '1', title: 'Request a Quote', icon: 'request_quote',
                desc: 'Tell us what materials you need to recycle, your estimated quantity, and your location. You can submit a request through our online form, call us at 817-946-5655, or email info@recyclingquotes.com.',
                details: [
                  'Free, no-obligation quotes for all 15+ material types',
                  'Most quotes delivered within 24 hours — many same day',
                  'We assess your waste stream and recommend the optimal service',
                  'Volume-based pricing with no hidden fees',
                ],
                cta: { label: 'Get Your Free Quote', href: '/get-a-quote' },
              },
              {
                num: '2', title: 'Schedule Pickup', icon: 'local_shipping',
                desc: 'Once you approve the quote, we schedule a pickup at your convenience. Our logistics team handles everything — container delivery, loading, transportation, and processing.',
                details: [
                  'Flexible scheduling: one-time, weekly, or monthly pickups',
                  'We provide the right containers for your material type and volume',
                  'GPS-tracked transportation with full chain-of-custody',
                  'Available in 52+ cities across the US, Canada, UK, and Australia',
                ],
                cta: { label: 'Schedule a Pickup', href: '/schedule-pickup' },
              },
              {
                num: '3', title: 'Get Your Certificate', icon: 'verified',
                desc: 'After processing, you receive a Certificate of Recycling documenting what was recycled, how much was diverted from landfill, and your compliance status. Plus, eligible materials earn rewards.',
                details: [
                  'Certificate of Recycling with weight, material type, and processing details',
                  'Certificate of Destruction for data-bearing devices (NIST 800-88 compliant)',
                  'ESG-ready data: carbon offset, water savings, and diversion metrics',
                  'Rewards program: earn credit toward future pickups',
                ],
                cta: { label: 'Learn About Certifications', href: '/about/certifications' },
              },
            ].map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 80}>
                <div className="bg-white border border-gray-200 rounded-[24px] p-8 lg:p-10 relative overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 flex items-center justify-center bg-dark-bg text-[#4ADE80] text-xl font-extrabold rounded-full shrink-0" style={{ boxShadow: '0 4px 16px rgba(10,15,12,.2)' }}>
                      {step.num}
                    </div>
                    <div className="flex-1">
                      <h2 className="font-extrabold text-gray-800 text-xl mb-2" style={{ letterSpacing: '-0.02em' }}>{step.title}</h2>
                      <p className="text-gray-500 leading-relaxed mb-4">{step.desc}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-5">
                        {step.details.map(d => (
                          <div key={d} className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-[16px] text-primary mt-0.5 shrink-0">check_circle</span>
                            <span className="text-[13px] text-gray-600">{d}</span>
                          </div>
                        ))}
                      </div>
                      <Link href={step.cta.href} className="btn-outline text-[13px]">
                        {step.cta.label} <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTABlock />
    </>
  );
}
