import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT } from '@/lib/data';
import { JsonLd, webPageSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PageHero from '@/components/ui/PageHero';
import { CTABlock, ScrollReveal } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Contact Recycling Quotes',
  description: 'Contact Recycling Quotes for free recycling quotes, service inquiries, or to schedule a pickup. Call 817-946-5655 or fill out our online form.',
  alternates: { canonical: 'https://recyclingquotes.com/contact' },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/contact', name: 'Contact Recycling Quotes', description: 'Contact us for free recycling quotes and service inquiries.' })} />
      <Breadcrumbs items={[{ name: 'Contact', href: '/contact' }]} />

      <PageHero
        tag="Get in Touch"
        tagIcon="mail"
        title="Let's Talk"
        titleAccent="Recycling"
        description="Whether you need a quote, want to schedule a pickup, or have questions about our services — we're here to help. Most inquiries get a response within 24 hours."
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=600&fit=crop"
        primaryCta={{ label: 'Get a Quote', href: '/get-a-quote', icon: 'arrow_forward' }}
        secondaryCta={null}
        showPhone
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="container-rq max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            <ScrollReveal>
              <a href={CONTACT.phoneHref} className="block bg-gray-50 border border-gray-100 rounded-[20px] p-8 hover:border-primary-light hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group text-center">
                <div className="w-14 h-14 rounded-[16px] bg-primary-light flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
                  <span className="material-symbols-outlined text-[28px] text-primary group-hover:text-white transition-colors">phone</span>
                </div>
                <h2 className="font-extrabold text-gray-800 mb-1">Call Us</h2>
                <p className="text-primary font-bold text-lg">{CONTACT.phone}</p>
                <p className="text-[13px] text-gray-400 mt-1">Mon–Fri, 8am–6pm CT</p>
              </a>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <a href={`mailto:${CONTACT.email}`} className="block bg-gray-50 border border-gray-100 rounded-[20px] p-8 hover:border-primary-light hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group text-center">
                <div className="w-14 h-14 rounded-[16px] bg-primary-light flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
                  <span className="material-symbols-outlined text-[28px] text-primary group-hover:text-white transition-colors">email</span>
                </div>
                <h2 className="font-extrabold text-gray-800 mb-1">Email Us</h2>
                <p className="text-primary font-bold">{CONTACT.email}</p>
                <p className="text-[13px] text-gray-400 mt-1">Response within 24 hours</p>
              </a>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <Link href="/get-a-quote" className="block bg-primary border border-primary rounded-[20px] p-8 hover:bg-primary-dark hover:-translate-y-1 transition-all duration-300 text-white text-center">
                <div className="w-14 h-14 rounded-[16px] bg-white/15 flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-[28px]">request_quote</span>
                </div>
                <h2 className="font-extrabold mb-1">Get a Quote</h2>
                <p className="text-white/80 font-bold">Free, no obligation</p>
                <p className="text-[13px] text-white/60 mt-1">Fill out our quick form</p>
              </Link>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="bg-gray-50 border border-gray-100 rounded-[20px] p-8 text-left">
              <h2 className="font-extrabold text-gray-800 text-lg mb-4" style={{ letterSpacing: '-0.015em' }}>Our Headquarters</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-500 leading-relaxed mb-4">Recycling Quotes is headquartered in Fort Worth, Texas, with a nationwide service network covering 52+ cities across the United States, Canada, United Kingdom, and Australia.</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[14px] text-gray-600"><span className="material-symbols-outlined text-[18px] text-primary">location_on</span> Fort Worth, TX</div>
                    <div className="flex items-center gap-2 text-[14px] text-gray-600"><span className="material-symbols-outlined text-[18px] text-primary">public</span> Serving US, Canada, UK, Australia</div>
                    <div className="flex items-center gap-2 text-[14px] text-gray-600"><span className="material-symbols-outlined text-[18px] text-primary">schedule</span> Mon–Fri, 8am–6pm CT</div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Link href="/locations" className="btn-outline"><span className="material-symbols-outlined text-[16px]">location_on</span> Browse All 52+ Locations</Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTABlock title="Prefer to Talk to Someone?" subtitle="Call us at 817-946-5655 for immediate assistance. Our recycling specialists are available Monday through Friday, 8am to 6pm Central Time." />
    </>
  );
}
