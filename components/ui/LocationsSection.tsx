'use client';

import { useState } from 'react';
import Link from 'next/link';

// SVG Flags
const FLAGS: Record<string, React.ReactNode> = {
  usa: (
    <svg viewBox="0 0 60 40" className="w-8 h-6 rounded-[3px] shadow-sm shrink-0" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#B22234"/>
      {[0,1,2,3,4,5,6].map((i: number) => <rect key={i} y={i * 6.15} width="60" height="3.08" fill={i % 2 === 0 ? '#B22234' : '#fff'}/>)}
      <rect width="24" height="21.54" fill="#3C3B6E"/>
      {[0,1,2,3,4].map((r: number) => [0,1,2,3,4,5].slice(0, r % 2 === 0 ? 6 : 5).map((c: number) => (
        <circle key={`${r}-${c}`} cx={2 + c * 4 + (r % 2 === 0 ? 0 : 2)} cy={2 + r * 4.3} r="0.8" fill="#fff"/>
      )))}
    </svg>
  ),
  canada: (
    <svg viewBox="0 0 60 40" className="w-8 h-6 rounded-[3px] shadow-sm shrink-0" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#fff"/>
      <rect width="15" height="40" fill="#D52B1E"/>
      <rect x="45" width="15" height="40" fill="#D52B1E"/>
      <path d="M30 8 L32 16 L28 14 L24 18 L26 14 L22 14 L26 12 L24 8 L28 10 L30 8Z" fill="#D52B1E" transform="scale(1.2) translate(-5,-1)"/>
    </svg>
  ),
  uk: (
    <svg viewBox="0 0 60 40" className="w-8 h-6 rounded-[3px] shadow-sm shrink-0" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#012169"/>
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#fff" strokeWidth="6"/>
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30 0 V40 M0 20 H60" stroke="#fff" strokeWidth="10"/>
      <path d="M30 0 V40 M0 20 H60" stroke="#C8102E" strokeWidth="6"/>
    </svg>
  ),
  australia: (
    <svg viewBox="0 0 60 40" className="w-8 h-6 rounded-[3px] shadow-sm shrink-0" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#012169"/>
      <rect width="30" height="20" fill="#012169"/>
      <path d="M0 0 L30 20 M30 0 L0 20" stroke="#fff" strokeWidth="3"/>
      <path d="M0 0 L30 20 M30 0 L0 20" stroke="#C8102E" strokeWidth="2"/>
      <path d="M15 0 V20 M0 10 H30" stroke="#fff" strokeWidth="5"/>
      <path d="M15 0 V20 M0 10 H30" stroke="#C8102E" strokeWidth="3"/>
      <circle cx="45" cy="15" r="2" fill="#fff"/><circle cx="50" cy="22" r="1.5" fill="#fff"/>
      <circle cx="42" cy="28" r="1.5" fill="#fff"/><circle cx="48" cy="32" r="1.5" fill="#fff"/>
      <circle cx="15" cy="30" r="3" fill="#fff"/>
    </svg>
  ),
};

const COUNTRY_NAMES: Record<string, string> = {
  usa: 'United States',
  canada: 'Canada',
  uk: 'United Kingdom',
  australia: 'Australia',
};

const COUNTRY_ORDER = ['usa', 'canada', 'uk', 'australia'];

type CityLink = {
  slug: string;
  name: string;
  country_code: string;
  state?: string;
  urlPrefix: string;
};

type Props = {
  title?: string;
  subtitle?: string;
  cities: CityLink[];
};

export default function LocationsSection({ title = 'Available in Your City', subtitle, cities }: Props) {
  // null = nothing open, 'usa' = USA panel open, etc.
  const [openCountry, setOpenCountry] = useState<string | null>(null);

  // Group cities by country
  const byCountry: Record<string, CityLink[]> = {};
  for (const country of COUNTRY_ORDER) {
    byCountry[country] = cities.filter((c: CityLink) => c.country_code === country);
  }

  if (cities.length === 0) return null;

  const handleTabClick = (code: string) => {
    setOpenCountry(openCountry === code ? null : code);
  };

  return (
    <section className="py-20 bg-primary-50 border-y border-primary-light">
      <div className="container-rq">
        {/* Title */}
        <div className="mb-10">
          <h2 className="section-title mb-1">{title}</h2>
          {subtitle && <p className="text-gray-500 text-[15px]">{subtitle}</p>}
        </div>

        {/* Country tabs — ALWAYS VISIBLE */}
        <div className="flex gap-2.5 mb-6 flex-wrap">
          {COUNTRY_ORDER.map((code: string) => {
            const count = byCountry[code]?.length || 0;
            const isOpen = openCountry === code;
            return (
              <button
                key={code}
                onClick={() => handleTabClick(code)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-full font-bold text-[13px] transition-all duration-200 ${
                  isOpen
                    ? 'bg-dark-bg text-white shadow-lg scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {FLAGS[code]}
                {COUNTRY_NAMES[code]}
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  isOpen
                    ? 'bg-[#4ADE80]/20 text-[#4ADE80]'
                    : count > 0 ? 'bg-gray-100 text-gray-500' : 'bg-gray-100 text-gray-300'
                }`}>{count}</span>
                <span className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>
            );
          })}
        </div>

        {/* Expandable city panels — one per country, only open one shows */}
        {COUNTRY_ORDER.map((code: string) => {
          const isOpen = openCountry === code;
          const countryCities = byCountry[code] || [];

          return (
            <div
              key={code}
              className={`overflow-hidden transition-all duration-400 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
            >
              {countryCities.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2.5 pt-4">
                  {countryCities.map((city: CityLink) => (
                    <Link
                      key={city.slug}
                      href={`/${city.urlPrefix}/${city.slug}`}
                      className="px-4 py-3.5 bg-white border border-gray-200 rounded-[12px] group hover:border-primary hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <span className="block text-[14px] font-bold text-gray-800 group-hover:text-primary transition-colors" style={{ letterSpacing: '-0.01em' }}>{city.name}</span>
                      {city.state && <span className="block text-[11px] text-gray-400 mt-0.5">{city.state}</span>}
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-white rounded-[20px] border border-gray-100 mt-4">
                  <span className="material-symbols-outlined text-[36px] text-gray-200 mb-2 block">rocket_launch</span>
                  <h3 className="font-extrabold text-gray-800 text-base mb-1">Coming Soon</h3>
                  <p className="text-gray-400 text-[13px] max-w-sm mx-auto">
                    We&apos;re expanding to {COUNTRY_NAMES[code]}. Contact us for availability.
                  </p>
                  <Link href="/contact" className="inline-flex items-center gap-1.5 mt-3 text-[13px] font-bold text-primary hover:gap-2.5 transition-all">
                    Contact us <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </Link>
                </div>
              )}
            </div>
          );
        })}

        {/* View all link */}
        <div className="text-center mt-4">
          <Link href="/locations" className="btn-outline text-[13px]">
            View All 97+ Locations <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
