// Shared FAQ full-page component
'use client';
import { useState } from 'react';
import Link from 'next/link';

type FAQ = { q: string; a: string };

export default function FAQFullPage({ title, description, backLabel, backHref, faqs, breadcrumbItems }: {
  title: string;
  description: string;
  backLabel: string;
  backHref: string;
  faqs: FAQ[];
  breadcrumbItems: { name: string; href: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      {/* Breadcrumb */}
      <nav className="py-3 bg-gray-50 border-b border-gray-100">
        <div className="container-rq">
          <ol className="flex flex-wrap items-center gap-1 text-[12px] text-gray-400">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            {breadcrumbItems.map(item => (
              <li key={item.href} className="flex items-center gap-1">
                <span>/</span>
                <Link href={item.href} className="hover:text-primary transition-colors">{item.name}</Link>
              </li>
            ))}
            <li className="flex items-center gap-1"><span>/</span><span className="text-gray-600 font-medium">FAQs</span></li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary-50 via-[#FAFCFB] to-white">
        <div className="container-rq max-w-3xl">
          <Link href={backHref} className="inline-flex items-center gap-1 text-[13px] font-bold text-primary mb-5 hover:gap-2 transition-all">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span> {backLabel}
          </Link>
          <h1 className="font-extrabold text-gray-800 leading-[1.08] mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', letterSpacing: '-0.035em' }}>
            {title}
          </h1>
          <p className="text-gray-500 text-[15px] leading-relaxed">{description}</p>
          <p className="text-[13px] text-gray-400 mt-3">{faqs.length} questions answered</p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16 bg-white">
        <div className="container-rq max-w-3xl">
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-[14px] overflow-hidden hover:border-gray-300 transition-colors">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                >
                  <span className="text-[14px] font-bold text-gray-800" style={{ letterSpacing: '-0.01em' }}>{faq.q}</span>
                  <span className={`material-symbols-outlined text-[20px] text-gray-400 shrink-0 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-5">
                    <p className="text-[14px] text-gray-500 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
