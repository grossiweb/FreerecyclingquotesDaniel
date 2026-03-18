import type { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { ScrollReveal } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Recycling Quotes privacy policy. How we collect, use, and protect your information.',
  alternates: { canonical: 'https://recyclingquotes.com/privacy' },
};

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Privacy Policy', href: '/privacy' }]} />
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-rq max-w-3xl">
          <ScrollReveal>
            <h1 className="font-extrabold text-gray-800 mb-8" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', letterSpacing: '-0.035em' }}>Privacy Policy</h1>
            <p className="text-[13px] text-gray-400 mb-8">Last updated: January 1, 2025</p>

            {[
              { title: 'Information We Collect', content: 'We collect information you provide directly: name, email, phone number, business name, and service details when you request a quote, contact us, or create an account. We also collect usage data through cookies and analytics tools including page views, referral sources, and device information.' },
              { title: 'How We Use Your Information', content: 'We use your information to: provide recycling quotes and services, communicate about your account and pickups, send service updates and industry news (with your consent), improve our website and services, and comply with legal obligations.' },
              { title: 'Information Sharing', content: 'We share your information with: recycling service providers in our network (to fulfill service requests), payment processors (to process transactions), and analytics providers (aggregated, non-personal data). We do not sell your personal information to third parties.' },
              { title: 'Data Security', content: 'We implement industry-standard security measures including encrypted data transmission (TLS/SSL), secure data storage, access controls, and regular security assessments. No method of electronic storage is 100% secure, but we take reasonable precautions to protect your data.' },
              { title: 'Cookies', content: 'We use essential cookies for site functionality and analytics cookies (Google Analytics) to understand how visitors use our site. You can control cookie preferences through your browser settings.' },
              { title: 'Your Rights', content: 'You have the right to: access your personal data, correct inaccurate data, request deletion of your data, opt out of marketing communications, and request a copy of your data. California residents have additional rights under CCPA.' },
              { title: 'Data Retention', content: 'We retain your information for as long as your account is active or as needed to provide services. Quote request data is retained for 3 years. We may retain certain information as required by law or for legitimate business purposes.' },
              { title: 'Children\'s Privacy', content: 'Our services are not directed to individuals under 18. We do not knowingly collect personal information from children.' },
              { title: 'Changes to This Policy', content: 'We may update this policy periodically. We will notify you of material changes by posting the updated policy on this page with a new "last updated" date.' },
              { title: 'Contact Us', content: 'Questions about this privacy policy? Contact us at info@recyclingquotes.com or call 817-946-5655.' },
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
