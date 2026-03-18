'use client';

import { useState, useEffect, useRef, type ReactNode } from 'react';
import Link from 'next/link';
import { CONTACT } from '@/lib/data';

// ─── SECTION HEADER ───
export function SectionHeader({ tag, tagIcon, title, subtitle, className = '' }: {
  tag?: string; tagIcon?: string; title: string; subtitle?: string; className?: string;
}) {
  return (
    <div className={`text-center mb-14 ${className}`}>
      {tag && (
        <div className="section-tag">
          {tagIcon && <span className="material-symbols-outlined text-[14px]">{tagIcon}</span>}
          {tag}
        </div>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle mx-auto">{subtitle}</p>}
    </div>
  );
}

// ─── CTA BLOCK ───
export function CTABlock({
  title = 'Ready to Start Recycling Smarter?',
  subtitle = 'Get a free quote in minutes. Our team will match you with certified recycling solutions for your business.',
  primaryLabel = 'Get a Quote',
  primaryHref = '/get-a-quote',
}: {
  title?: string; subtitle?: string; primaryLabel?: string; primaryHref?: string;
}) {
  return (
    <section className="py-[72px] bg-dark-bg text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(27,122,61,.08) 0%, transparent 60%)' }} />
      <div className="container-rq relative z-10">
        <h2 className="section-title !text-white">{title}</h2>
        <p className="text-dark-text text-[15px] mt-2.5 mb-7 max-w-[480px] mx-auto">{subtitle}</p>
        <div className="flex justify-center gap-2.5 flex-wrap mb-6">
          <Link href={primaryHref} className="btn-white">
            {primaryLabel} <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
          <a href={CONTACT.phoneHref} className="btn-outline-white">
            <span className="material-symbols-outlined text-[16px]">phone</span> {CONTACT.phone}
          </a>
        </div>
        <div className="flex justify-center gap-6 text-[13px] text-gray-400">
          {['Free quotes', 'Certified recycling', 'Nationwide service'].map(t => (
            <span key={t} className="flex items-center gap-[5px]">
              <span className="material-symbols-outlined text-[14px] text-[#4ADE80]">check_circle</span> {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ACCORDION ───
export function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto">
      {items.map((item, i) => (
        <div key={i} className="border-b border-gray-200">
          <button
            className="flex items-center justify-between w-full py-5 text-left font-bold text-gray-800 text-[15px] group"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            {item.q}
            <span className={`material-symbols-outlined text-[20px] transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-primary' : 'text-gray-300'}`}>expand_more</span>
          </button>
          <div className="overflow-hidden transition-all duration-350" style={{ maxHeight: openIndex === i ? '300px' : '0', transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }}>
            <p className="pb-5 text-gray-500 text-[14px] leading-relaxed pr-8">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── SCROLL REVEAL ───
export function ScrollReveal({ children, className = '', delay = 0 }: {
  children: ReactNode; className?: string; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
