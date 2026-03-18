'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NAV_ITEMS, CONTACT, type NavItem } from '@/lib/data';

const iconColorMap = {
  green: 'bg-[rgba(27,122,61,.12)] text-[#4ADE80]',
  amber: 'bg-[rgba(217,119,6,.12)] text-[#FBBF24]',
  blue: 'bg-[rgba(37,99,235,.12)] text-[#60A5FA]',
  teal: 'bg-[rgba(20,184,166,.12)] text-[#2DD4BF]',
} as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 1024) setMobileOpen(false); };
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onEsc);
    return () => { window.removeEventListener('resize', onResize); window.removeEventListener('keydown', onEsc); };
  }, []);

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 h-[72px] z-[1000] transition-all duration-300 ${scrolled ? 'border-b border-gray-200 shadow-sm' : 'border-b border-transparent'}`}
        style={{ background: 'rgba(250,252,251,.85)', backdropFilter: 'blur(16px) saturate(180%)' }}>
        <div className="flex items-center justify-between h-full max-w-content mx-auto px-6">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="Recycling Quotes" width={180} height={40} className="h-[38px] w-auto" priority />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center">
            {NAV_ITEMS.map(item => (
              <div key={item.label} className="relative"
                onMouseEnter={() => item.type === 'mega' ? handleMouseEnter(item.label) : undefined}
                onMouseLeave={item.type === 'mega' ? handleMouseLeave : undefined}>
                {item.type === 'link' ? (
                  <Link href={item.href} className="flex items-center px-3.5 h-[72px] text-[13px] font-semibold text-gray-500 hover:text-gray-800 transition-colors" style={{ letterSpacing: '-0.01em' }}>
                    {item.label}
                  </Link>
                ) : (
                  <button className={`flex items-center gap-[3px] px-3.5 h-[72px] text-[13px] font-semibold transition-colors ${openDropdown === item.label ? 'text-gray-800' : 'text-gray-500 hover:text-gray-800'}`} style={{ letterSpacing: '-0.01em' }}>
                    {item.label}
                    <span className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`}>expand_more</span>
                  </button>
                )}

                {item.type === 'mega' && item.columns && (
                  <MegaDropdown item={item} isOpen={openDropdown === item.label} />
                )}
              </div>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-2.5">
            <a href={CONTACT.phoneHref} className="hidden lg:flex items-center gap-[5px] font-bold text-[13px] text-gray-600 px-3.5 py-2 rounded-full hover:bg-gray-100 transition-colors">
              <span className="material-symbols-outlined text-[16px] text-primary">phone</span>
              {CONTACT.phone}
            </a>
            <Link href="/get-a-quote" className="hidden lg:block px-5 py-[9px] bg-primary text-white rounded-full font-bold text-[13px] border-[1.5px] border-primary hover:bg-primary-dark hover:border-primary-dark transition-all">
              Get a Quote
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden flex flex-col justify-center items-center w-11 h-11 gap-[5px] z-[1002]" aria-label="Menu">
              <span className={`block w-5 h-[1.5px] bg-gray-700 rounded transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
              <span className={`block w-5 h-[1.5px] bg-gray-700 rounded transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-[1.5px] bg-gray-700 rounded transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div className={`fixed inset-0 z-[999] transition-all duration-300 ${mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        style={{ background: 'rgba(10,15,12,.6)', backdropFilter: 'blur(4px)' }}
        onClick={() => setMobileOpen(false)} />

      {/* Mobile Drawer */}
      <nav className={`fixed top-0 right-0 bottom-0 w-full max-w-[380px] bg-white z-[1001] overflow-y-auto transition-transform duration-400 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ WebkitOverflowScrolling: 'touch', padding: '80px 24px 32px', transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }}>
        {NAV_ITEMS.map(item => (
          <div key={item.label} className="border-b border-gray-100">
            {item.type === 'link' ? (
              <Link href={item.href} className="flex items-center justify-between py-3.5 font-bold text-gray-700 text-[15px]" onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            ) : (
              <>
                <button className={`flex items-center justify-between w-full py-3.5 font-bold text-[15px] ${mobileAccordion === item.label ? 'text-primary' : 'text-gray-700'}`}
                  onClick={() => setMobileAccordion(mobileAccordion === item.label ? null : item.label)}>
                  {item.label}
                  <span className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${mobileAccordion === item.label ? 'rotate-180 text-primary' : 'text-gray-300'}`}>expand_more</span>
                </button>
                <div className="overflow-hidden transition-all duration-350" style={{ maxHeight: mobileAccordion === item.label ? '600px' : '0', transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }}>
                  <div className="pb-3 pl-1">
                    {item.columns?.map((col, ci) => (
                      <div key={ci}>
                        {col.label && <div className="text-[11px] font-bold uppercase tracking-[.08em] text-gray-300 py-2">{col.label}</div>}
                        {col.items.map(sub => (
                          <Link key={sub.href} href={sub.href} className="flex items-center gap-2 px-3 py-[9px] text-[13px] text-gray-500 font-medium rounded-[8px] hover:bg-gray-50 hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                    <Link href={item.href} className="flex items-center gap-2 px-3 py-[9px] text-[13px] text-primary font-bold rounded-[8px] hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
                      View All {item.label} →
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
        <div className="mt-6 flex flex-col gap-2.5">
          <Link href="/get-a-quote" className="btn-primary justify-center" onClick={() => setMobileOpen(false)}>Get a Quote</Link>
          <Link href="/schedule-pickup" className="btn-outline justify-center" onClick={() => setMobileOpen(false)}>Schedule Pickup</Link>
          <a href={CONTACT.phoneHref} className="flex items-center justify-center gap-2 py-3.5 font-bold text-primary">
            <span className="material-symbols-outlined">phone</span> {CONTACT.phone}
          </a>
        </div>
      </nav>
    </>
  );
}

function MegaDropdown({ item, isOpen }: { item: NavItem; isOpen: boolean }) {
  const colCount = item.columns?.length || 1;
  const minW = colCount >= 4 ? '740px' : colCount >= 2 ? `${colCount * 220 + 80}px` : '280px';

  return (
    <div className={`absolute top-[68px] left-1/2 bg-dark-bg rounded-[20px] p-6 transition-all duration-200 ${isOpen ? 'opacity-100 visible -translate-x-1/2 translate-y-0' : 'opacity-0 invisible -translate-x-1/2 translate-y-1'}`}
      style={{ minWidth: minW, boxShadow: '0 24px 64px rgba(0,0,0,.35), 0 0 0 1px rgba(255,255,255,.04) inset' }}>
      <div className="flex gap-6">
        {item.columns?.map((col, ci) => (
          <div key={ci} className="flex-1 min-w-0">
            {col.label && (
              <div className="text-[11px] font-bold uppercase tracking-[.08em] text-gray-400 mb-2.5 pb-2 border-b border-dark-border">{col.label}</div>
            )}
            {col.items.map(link => (
              <Link key={link.href} href={link.href} className="flex items-center gap-2.5 px-2 py-[7px] rounded-[8px] text-dark-text text-[13px] font-medium hover:bg-dark-card-hover hover:text-white transition-colors">
                <span className={`w-[30px] h-[30px] flex items-center justify-center rounded-[6px] ${iconColorMap[link.color]}`}>
                  <span className="material-symbols-outlined text-[16px]">{link.icon}</span>
                </span>
                {link.label}
              </Link>
            ))}
            {ci === (item.columns!.length - 1) && !item.cta && (
              <Link href={item.href} className="flex items-center gap-1 mt-2.5 px-2 py-[7px] text-primary font-bold text-[13px] rounded-[8px] hover:bg-dark-card-hover transition-colors">
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span> View All {item.label}
              </Link>
            )}
          </div>
        ))}
      </div>
      {item.cta && (
        <Link href={item.cta.href} className="block mt-3.5 px-4 py-[9px] bg-primary text-white rounded-full text-center font-bold text-[13px] hover:bg-primary-dark transition-colors">
          <span className="material-symbols-outlined text-[14px] align-middle mr-1">calendar_month</span>
          {item.cta.label}
        </Link>
      )}
    </div>
  );
}
