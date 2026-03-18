import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT } from '@/lib/data';
import { JsonLd, webPageSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { ScrollReveal } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Get a Free Recycling Quote',
  description: 'Request a free recycling quote for electronics, metals, paper, plastics, pallets, or hazardous materials. Response within 24 hours. Call 817-946-5655.',
  alternates: { canonical: 'https://recyclingquotes.com/get-a-quote' },
};

export default function GetAQuotePage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/get-a-quote', name: 'Get a Free Recycling Quote', description: 'Request a free recycling quote. Response within 24 hours.' })} />
      <Breadcrumbs items={[{ name: 'Get a Quote', href: '/get-a-quote' }]} />

      <section className="py-16 lg:py-20 bg-[#FAFCFB]">
        <div className="container-rq">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
            {/* Left: Info */}
            <div>
              <ScrollReveal>
                <div className="section-tag mb-6"><span className="material-symbols-outlined text-[14px]">request_quote</span> Free Quote</div>
                <h1 className="font-extrabold text-gray-800 leading-[1.08] mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', letterSpacing: '-0.035em' }}>
                  Get a Free <span className="text-primary">Recycling Quote</span>
                </h1>
                <p className="definition-block text-gray-500 text-[16px] leading-relaxed mb-8">
                  Tell us what you need to recycle and we&apos;ll provide a free, no-obligation quote within 24 hours. Our team will match you with certified recycling services for your specific materials, volume, and location.
                </p>
              </ScrollReveal>

              {/* Contact info — NAP for local SEO */}
              <ScrollReveal delay={80}>
                <div className="space-y-4 mb-8">
                  <a href={CONTACT.phoneHref} className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-[16px] hover:border-primary-light hover:shadow-md transition-all">
                    <div className="w-11 h-11 rounded-[10px] bg-primary-light flex items-center justify-center"><span className="material-symbols-outlined text-[22px] text-primary">phone</span></div>
                    <div>
                      <div className="text-[12px] text-gray-400 font-medium">Call us directly</div>
                      <div className="font-extrabold text-gray-800">{CONTACT.phone}</div>
                    </div>
                  </a>
                  <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-[16px] hover:border-primary-light hover:shadow-md transition-all">
                    <div className="w-11 h-11 rounded-[10px] bg-primary-light flex items-center justify-center"><span className="material-symbols-outlined text-[22px] text-primary">email</span></div>
                    <div>
                      <div className="text-[12px] text-gray-400 font-medium">Email us</div>
                      <div className="font-extrabold text-gray-800">{CONTACT.email}</div>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-[16px]">
                    <div className="w-11 h-11 rounded-[10px] bg-primary-light flex items-center justify-center"><span className="material-symbols-outlined text-[22px] text-primary">location_on</span></div>
                    <div>
                      <div className="text-[12px] text-gray-400 font-medium">Headquarters</div>
                      <div className="font-extrabold text-gray-800">{CONTACT.address}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Trust block */}
              <ScrollReveal delay={160}>
                <div className="bg-dark-bg rounded-[20px] p-6">
                  <h3 className="font-extrabold text-white mb-4 text-[15px]">Why Request a Quote From Us?</h3>
                  <div className="space-y-3">
                    {[
                      { icon: 'schedule', text: 'Quotes within 24 hours — most same day' },
                      { icon: 'workspace_premium', text: 'R2, e-Stewards, and ISO certified network' },
                      { icon: 'local_shipping', text: 'Free pickup in 52+ cities nationwide' },
                      { icon: 'description', text: 'Full compliance documentation included' },
                      { icon: 'attach_money', text: 'No hidden fees — transparent pricing' },
                    ].map(item => (
                      <div key={item.text} className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[18px] text-[#4ADE80]">{item.icon}</span>
                        <span className="text-[13px] text-dark-text">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Form */}
            <ScrollReveal delay={100}>
              <div className="bg-white border border-gray-200 rounded-[24px] p-8 lg:p-10 shadow-lg">
                <h2 className="font-extrabold text-gray-800 text-xl mb-6" style={{ letterSpacing: '-0.02em' }}>Request Your Free Quote</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">First Name *</label>
                      <input type="text" required className="w-full px-4 py-3 border border-gray-200 rounded-[12px] text-[14px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors" placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Last Name *</label>
                      <input type="text" required className="w-full px-4 py-3 border border-gray-200 rounded-[12px] text-[14px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors" placeholder="Smith" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Company Name</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-[12px] text-[14px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors" placeholder="Acme Corp" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email *</label>
                      <input type="email" required className="w-full px-4 py-3 border border-gray-200 rounded-[12px] text-[14px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors" placeholder="john@acme.com" />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Phone *</label>
                      <input type="tel" required className="w-full px-4 py-3 border border-gray-200 rounded-[12px] text-[14px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors" placeholder="(555) 123-4567" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Material Type *</label>
                    <select required className="w-full px-4 py-3 border border-gray-200 rounded-[12px] text-[14px] text-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors bg-white">
                      <option value="">Select a material...</option>
                      <option>Electronics / E-Waste</option>
                      <option>Scrap Metal</option>
                      <option>Paper & Cardboard</option>
                      <option>Plastics</option>
                      <option>Pallets</option>
                      <option>Hazardous Materials</option>
                      <option>Batteries</option>
                      <option>Light Bulbs</option>
                      <option>Junk / Mixed Waste</option>
                      <option>Dumpster Rental</option>
                      <option>Other / Multiple Materials</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Service Needed</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-[12px] text-[14px] text-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors bg-white">
                      <option value="">Select a service...</option>
                      <option>One-Time Pickup</option>
                      <option>Recurring Pickup Program</option>
                      <option>Dumpster Rental</option>
                      <option>IT Asset Disposition (ITAD)</option>
                      <option>Data Destruction</option>
                      <option>Waste Audit & Consulting</option>
                      <option>Business Recycling Program</option>
                      <option>Collection Event</option>
                      <option>Not Sure — Need Guidance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Location (City or Zip)</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-[12px] text-[14px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors" placeholder="Chicago, IL or 60601" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Message</label>
                    <textarea rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-[12px] text-[14px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors resize-none" placeholder="Tell us about your recycling needs, estimated quantity, or any questions..." />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center text-[15px] py-4">
                    Submit Quote Request <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                  <p className="text-[11px] text-gray-400 text-center">No obligation. We respond within 24 hours. Your information is secure.</p>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
