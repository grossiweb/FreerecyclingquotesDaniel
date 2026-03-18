import type { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { ScrollReveal } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Recycling Quotes terms of service. Terms and conditions governing use of our website and services.',
  alternates: { canonical: 'https://recyclingquotes.com/terms' },
};

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Terms of Service', href: '/terms' }]} />
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-rq max-w-3xl">
          <ScrollReveal>
            <h1 className="font-extrabold text-gray-800 mb-8" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', letterSpacing: '-0.035em' }}>Terms of Service</h1>
            <p className="text-[13px] text-gray-400 mb-8">Last updated: January 1, 2025</p>

            {[
              { title: 'Acceptance of Terms', content: 'By accessing or using the Recycling Quotes website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.' },
              { title: 'Services Description', content: 'Recycling Quotes connects businesses with certified recycling service providers for the collection, processing, and recycling of commercial waste materials. We act as a service coordinator — actual recycling services are performed by our network of certified processing partners.' },
              { title: 'Quote Requests', content: 'Quote requests submitted through our website are not binding offers. Quotes provided are estimates based on the information you provide and are subject to change based on actual material type, quantity, condition, and location. Final pricing is confirmed at the time of service.' },
              { title: 'User Responsibilities', content: 'You are responsible for: providing accurate information about materials to be recycled, ensuring materials are properly stored and accessible for pickup, disclosing any hazardous materials or special handling requirements, and complying with applicable local, state, and federal regulations regarding waste storage.' },
              { title: 'Certifications and Compliance', content: 'Our processing partners maintain certifications (R2, e-Stewards, ISO 14001, NAID AAA) as described on our website. While we verify certifications at the time of partnership and through periodic reviews, ultimate responsibility for compliance with specific regulatory requirements rests with the generating organization.' },
              { title: 'Data Destruction', content: 'Data destruction services are performed per NIST 800-88 guidelines by certified technicians. Certificates of Destruction document the process and are provided for each device or batch. While we employ industry-standard methods, no data destruction method is guaranteed to be 100% irrecoverable under all circumstances.' },
              { title: 'Limitation of Liability', content: 'Recycling Quotes shall not be liable for indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability shall not exceed the fees paid for the specific service giving rise to the claim.' },
              { title: 'Intellectual Property', content: 'All content on this website — including text, graphics, logos, and software — is the property of Recycling Quotes and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our written consent.' },
              { title: 'Governing Law', content: 'These Terms are governed by the laws of the State of Texas, without regard to conflict of law principles. Any disputes shall be resolved in the courts of Tarrant County, Texas.' },
              { title: 'Changes to Terms', content: 'We reserve the right to modify these Terms at any time. Changes are effective when posted. Continued use of our services after changes constitutes acceptance of the modified Terms.' },
              { title: 'Contact', content: 'Questions about these terms? Contact us at info@recyclingquotes.com or call 817-946-5655.' },
            ].map(section => (
              <div key={section.title} className="mb-8">
                <h2 className="font-extrabold text-gray-800 text-lg mb-3" style={{ letterSpacing: '-0.015em' }}>{section.title}</h2>
                <p className="text-[14px] text-gray-500 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
