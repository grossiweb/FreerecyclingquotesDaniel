import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { CTABlock, ScrollReveal } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Guides & Downloads — Recycling Checklists & Templates',
  description: 'Free downloadable guides, compliance checklists, waste audit templates, and ESG reporting frameworks for commercial recycling programs.',
  alternates: { canonical: 'https://recyclingquotes.com/resources/guides' },
};

const GUIDES = [
  { icon: 'checklist', tag: 'Compliance', title: 'E-Waste Compliance Checklist', desc: 'Step-by-step checklist for HIPAA, GLBA, PCI-DSS, and FISMA-compliant electronics disposition. Covers data destruction, documentation, and vendor qualification.', related: '/challenges/ewaste-compliance' },
  { icon: 'assessment', tag: 'Getting Started', title: 'Waste Audit Template & Guide', desc: 'Complete template for conducting a commercial waste audit — waste stream inventory, volume estimates, cost analysis, and improvement recommendations.', related: '/services/waste-audits-consulting' },
  { icon: 'monitoring', tag: 'ESG', title: 'ESG Reporting Framework Comparison', desc: 'Side-by-side comparison of GRI 306, SASB, CDP, and UN SDG waste management metrics. Know what each framework requires and how recycling data maps to each.', related: '/challenges/esg-reporting' },
  { icon: 'security', tag: 'Data Security', title: 'NIST 800-88 Quick Reference Guide', desc: 'Media sanitization levels (Clear, Purge, Destroy) explained. Which method for which media type. Certificate of Destruction requirements.', related: '/services/data-destruction' },
  { icon: 'local_shipping', tag: 'Hazardous Waste', title: 'Hazardous Waste Generator Guide', desc: 'Know your generator category (LQG, SQG, VSQG), storage time limits, manifest requirements, and inspection preparation. Based on EPA RCRA regulations.', related: '/challenges/hazardous-waste' },
  { icon: 'calculate', tag: 'Cost Savings', title: 'Recycling ROI Calculator Guide', desc: 'How to calculate the financial impact of a recycling program — disposal cost savings, commodity revenue, and total ROI. Includes formulas and benchmarks.', related: '/challenges/cost-reduction' },
  { icon: 'construction', tag: 'Construction', title: 'C&D Diversion Plan Template', desc: 'Template for municipal C&D waste management plans. Estimated waste types, diversion strategies, designated facilities, and documentation requirements.', related: '/challenges/cd-waste-compliance' },
  { icon: 'apartment', tag: 'Office', title: 'Office Recycling Program Starter Kit', desc: 'Container placement guide, employee training template, sorting signage designs, and contamination reduction strategies for corporate offices.', related: '/industries/offices' },
];

export default function GuidesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Resources', href: '/resources' }, { name: 'Guides', href: '/resources/guides' }]} />

      <section className="py-16 bg-gradient-to-br from-primary-50 via-[#FAFCFB] to-white">
        <div className="container-rq max-w-3xl">
          <ScrollReveal>
            <h1 className="font-extrabold text-gray-800 leading-[1.08] mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', letterSpacing: '-0.035em' }}>Guides & Downloads</h1>
            <p className="text-gray-500 text-[16px] leading-relaxed">Free compliance checklists, waste audit templates, and ESG reporting frameworks. Built by recycling professionals for operations teams.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-rq">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {GUIDES.map((guide, i) => (
              <ScrollReveal key={guide.title} delay={i * 50}>
                <div className="bg-gray-50 border border-gray-100 rounded-[20px] p-7 hover:bg-white hover:border-primary-light hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-full">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary scale-x-0 origin-left hover:scale-x-100 transition-transform duration-400" />
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-[12px] bg-primary-light flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[24px] text-primary">{guide.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <span className="inline-block px-2.5 py-[3px] bg-gray-200 text-gray-600 text-[10px] font-bold rounded-full mb-2">{guide.tag}</span>
                      <h2 className="font-extrabold text-gray-800 mb-2" style={{ letterSpacing: '-0.015em' }}>{guide.title}</h2>
                      <p className="text-[13px] text-gray-400 leading-relaxed mb-4">{guide.desc}</p>
                      <div className="flex gap-2.5">
                        <Link href="/get-a-quote" className="inline-flex items-center gap-1 text-[12px] font-bold text-primary hover:gap-2 transition-all">
                          Request guide <span className="material-symbols-outlined text-[14px]">download</span>
                        </Link>
                        <Link href={guide.related} className="inline-flex items-center gap-1 text-[12px] font-bold text-gray-400 hover:text-primary transition-colors">
                          Related page <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTABlock title="Need a Custom Guide for Your Industry?" subtitle="We create industry-specific recycling program guides for our managed service clients. Get in touch." />
    </>
  );
}
