import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd, webPageSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PageHero from '@/components/ui/PageHero';
import { CTABlock, ScrollReveal } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Certifications — R2, e-Stewards, ISO 14001, NAID AAA & More',
  description: 'Our network holds R2, e-Stewards, ISO 14001, ISO 9001, NAID AAA, EPA RCRA, and state-specific certifications. Learn what each means for your recycling program.',
  alternates: { canonical: 'https://recyclingquotes.com/about/certifications' },
};

const CERTS = [
  { name: 'R2 (Responsible Recycling)', category: 'Electronics', description: 'The R2 Standard is a comprehensive set of practices for the responsible recycling of electronics. It covers environmental health and safety, data destruction, downstream accountability, and material management. R2 certified facilities undergo annual third-party audits.', relevance: 'Required for responsible e-waste recycling. Ensures your electronics don\'t end up in landfills or developing countries. Verifies data destruction processes meet NIST 800-88 standards.', services: ['electronics-recycling', 'it-asset-disposition'] },
  { name: 'e-Stewards', category: 'Electronics', description: 'The e-Stewards Standard is the strictest certification for electronics recycling, developed by the Basel Action Network. It prohibits export of hazardous e-waste to developing countries, prohibits use of prison labor, and requires stronger data security controls than R2.', relevance: 'The highest standard for electronics recycling ethics. Preferred by organizations with strong corporate social responsibility commitments.', services: ['electronics-recycling', 'it-asset-disposition'] },
  { name: 'ISO 14001', category: 'Environmental', description: 'ISO 14001 is the international standard for Environmental Management Systems (EMS). It provides a framework for organizations to manage environmental responsibilities systematically, including waste reduction, pollution prevention, and regulatory compliance.', relevance: 'Demonstrates that our processing partners operate documented environmental management systems with continuous improvement. Often required by ISO 14001 certified clients for vendor qualification.', services: ['business-recycling-programs', 'material-recycling-solutions'] },
  { name: 'NIST 800-88 Rev. 1', category: 'Data Security', description: 'NIST Special Publication 800-88 Revision 1 (Guidelines for Media Sanitization) is the federal standard for data destruction. It defines three sanitization levels: Clear (logical overwrite), Purge (degaussing/cryptographic erasure), and Destroy (physical shredding).', relevance: 'The accepted standard for data destruction across all compliance frameworks — HIPAA, GLBA, PCI-DSS, FISMA, and SOX. Our processes meet Purge and Destroy levels.', services: ['data-destruction', 'it-asset-disposition'] },
  { name: 'NAID AAA', category: 'Data Security', description: 'NAID AAA Certification is awarded by the National Association for Information Destruction to facilities that meet security standards for document and media destruction. Annual audits verify employee screening, facility security, destruction processes, and chain-of-custody.', relevance: 'The standard for secure document and media destruction. Required by many healthcare, financial, and government organizations for vendor qualification.', services: ['shredding-services', 'data-destruction'] },
  { name: 'EPA RCRA Compliance', category: 'Hazardous Waste', description: 'The Resource Conservation and Recovery Act (RCRA) is the federal framework for hazardous waste management. Compliance requires proper waste identification, manifesting, storage, transportation, and disposal at permitted Treatment, Storage, and Disposal Facilities (TSDFs).', relevance: 'Essential for any organization generating hazardous waste — batteries, chemicals, light bulbs, medical waste. Our partners hold all required EPA permits and state authorizations.', services: ['hazardous-waste-disposal'] },
  { name: 'DOT Hazmat Certification', category: 'Transportation', description: 'Department of Transportation certification for the transportation of hazardous materials. Covers proper packaging, labeling, placarding, and driver training requirements for regulated materials transport.', relevance: 'Required for the safe, legal transportation of batteries, chemicals, and other regulated materials from your facility to processing sites.', services: ['hazardous-waste-disposal'] },
  { name: 'ISRI Membership', category: 'Metals', description: 'Institute of Scrap Recycling Industries membership indicates participation in the leading trade association for the scrap recycling industry. ISRI members adhere to industry standards for safety, environmental management, and ethical business practices.', relevance: 'Our scrap metal processing partners are ISRI members with certified scales, transparent grading, and documented downstream accountability.', services: ['scrap-metal-recycling'] },
  { name: 'SFI Certified Chain of Custody', category: 'Paper', description: 'Sustainable Forestry Initiative (SFI) Chain of Custody certification tracks fiber from forest to consumer. Paper mills with SFI certification demonstrate that recycled fiber enters responsible manufacturing streams.', relevance: 'Ensures your recycled paper and cardboard re-enters manufacturing through certified sustainable supply chains.', services: ['cardboard-paper-recycling', 'shredding-services'] },
];

export default function CertificationsPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/about/certifications', name: 'Our Certifications', description: 'R2, e-Stewards, ISO 14001, NAID AAA, EPA RCRA and more.' })} />
      <Breadcrumbs items={[{ name: 'About', href: '/about' }, { name: 'Certifications', href: '/about/certifications' }]} />

      <PageHero tag="Trust" tagIcon="workspace_premium" title="Our" titleAccent="Certifications" description="Certifications aren't marketing badges — they're third-party verified proof that our processing partners meet the highest standards for environmental management, data security, and regulatory compliance. Here's every certification in our network and what it means for you." image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&h=600&fit=crop" primaryCta={{ label: 'Get a Quote', href: '/get-a-quote', icon: 'arrow_forward' }} secondaryCta={{ label: 'Why Choose Us', href: '/about/why-choose-us', icon: 'verified' }} />

      {/* Certifications */}
      <section className="py-24 bg-white">
        <div className="container-rq">
          <ScrollReveal><h2 className="section-title mb-10">Certifications Our Network Holds</h2></ScrollReveal>
          <div className="space-y-5">
            {CERTS.map((cert, i) => (
              <ScrollReveal key={cert.name} delay={i * 40}>
                <div className="bg-gray-50 border border-gray-100 rounded-[24px] p-8 hover:bg-white hover:border-primary-light hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="lg:w-2/5">
                      <span className="inline-block px-3 py-1 bg-primary-light text-primary text-[11px] font-bold rounded-full mb-3">{cert.category}</span>
                      <h3 className="font-extrabold text-gray-800 text-lg mb-2" style={{ letterSpacing: '-0.015em' }}>{cert.name}</h3>
                      <p className="text-[13px] text-gray-500 leading-relaxed">{cert.description}</p>
                    </div>
                    <div className="lg:w-3/5 bg-white lg:bg-gray-50 border border-gray-200 lg:border-gray-100 rounded-[16px] p-5">
                      <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-2">Why It Matters for You</h4>
                      <p className="text-[14px] text-gray-700 leading-relaxed mb-4">{cert.relevance}</p>
                      <div className="flex flex-wrap gap-2">
                        {cert.services.map(svc => (
                          <Link key={svc} href={`/services/${svc}`} className="text-[12px] font-bold text-primary hover:underline">
                            {svc.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} →
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why certs matter */}
      <section className="py-20 bg-dark-bg relative overflow-hidden">
        <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,122,61,.08) 0%, transparent 60%)' }} />
        <div className="container-rq relative z-10 max-w-3xl">
          <ScrollReveal>
            <h2 className="section-title !text-white mb-8">Why Certifications Matter</h2>
            <div className="space-y-4">
              {[
                'Without R2 or e-Stewards, there\'s no assurance your electronics aren\'t being exported to unregulated facilities in developing countries.',
                'Without NIST 800-88 compliance, there\'s no way to prove data was actually destroyed — "we deleted it" doesn\'t hold up in an audit.',
                'Without NAID AAA, document shredding vendors aren\'t required to screen employees, secure facilities, or maintain chain-of-custody.',
                'Without EPA RCRA compliance, hazardous waste handlers may not have the permits, training, or insurance to protect you from liability.',
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3 bg-dark-card border border-dark-border rounded-[12px] p-5">
                  <span className="material-symbols-outlined text-[16px] text-[#4ADE80] mt-0.5 shrink-0">priority_high</span>
                  <p className="text-[14px] text-gray-300 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTABlock title="Work With a Certified Network" subtitle="Every processor in our network is vetted, certified, and audited. Your compliance team can verify every claim." />
    </>
  );
}
