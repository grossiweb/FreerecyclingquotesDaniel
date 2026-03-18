'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';

// Import all FAQ sources inline — this is a client component so we inline the data
const FAQ_CATEGORIES = [
  { key: 'services', label: 'Services', icon: 'build', href: '/services', count: 0, items: [] as { section: string; sectionHref: string; q: string; a: string }[] },
  { key: 'materials', label: 'Materials', icon: 'category', href: '/materials', count: 0, items: [] as { section: string; sectionHref: string; q: string; a: string }[] },
  { key: 'industries', label: 'Industries', icon: 'domain', href: '/industries', count: 0, items: [] as { section: string; sectionHref: string; q: string; a: string }[] },
  { key: 'challenges', label: 'Challenges', icon: 'psychology', href: '/challenges', count: 0, items: [] as { section: string; sectionHref: string; q: string; a: string }[] },
];

// We'll pass data as props from the server component wrapper
type FAQItem = { section: string; sectionHref: string; q: string; a: string; category: string };

export default function FAQHubClient({ allFaqs }: { allFaqs: FAQItem[] }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories = useMemo(() => {
    const cats = [
      { key: 'all', label: 'All Questions', count: allFaqs.length },
      { key: 'services', label: 'Services', count: allFaqs.filter(f => f.category === 'services').length },
      { key: 'materials', label: 'Materials', count: allFaqs.filter(f => f.category === 'materials').length },
      { key: 'industries', label: 'Industries', count: allFaqs.filter(f => f.category === 'industries').length },
      { key: 'challenges', label: 'Challenges', count: allFaqs.filter(f => f.category === 'challenges').length },
    ];
    return cats;
  }, [allFaqs]);

  const filtered = useMemo(() => {
    let results = allFaqs;
    if (activeCategory !== 'all') results = results.filter(f => f.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q) || f.section.toLowerCase().includes(q));
    }
    return results;
  }, [allFaqs, activeCategory, search]);

  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary-50 via-[#FAFCFB] to-white">
        <div className="container-rq max-w-3xl text-center">
          <span className="material-symbols-outlined text-[48px] text-primary mb-4 block">help</span>
          <h1 className="font-extrabold text-gray-800 leading-[1.08] mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', letterSpacing: '-0.035em' }}>
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500 text-[16px] leading-relaxed mb-8">
            {allFaqs.length}+ questions answered across all our services, materials, industries, and challenges.
          </p>
          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-gray-400">search</span>
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={e => { setSearch(e.target.value); setOpenIndex(null); }}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-full text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>
      </section>

      {/* Category tabs */}
      <section className="py-0 bg-white border-b border-gray-100 sticky top-[72px] z-20">
        <div className="container-rq">
          <div className="flex gap-1 overflow-x-auto py-3" style={{ scrollbarWidth: 'none' }}>
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => { setActiveCategory(cat.key); setOpenIndex(null); }}
                className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-bold transition-all duration-200 ${
                  activeCategory === cat.key
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {cat.label} <span className="text-[11px] opacity-70 ml-1">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 bg-white">
        <div className="container-rq max-w-3xl">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-[48px] text-gray-300 mb-4 block">search_off</span>
              <p className="text-gray-400 text-[15px]">No questions match your search. Try different keywords.</p>
            </div>
          ) : (
            <>
              <p className="text-[13px] text-gray-400 mb-6">{filtered.length} question{filtered.length !== 1 ? 's' : ''}{search ? ' matching your search' : ''}</p>
              <div className="space-y-2">
                {filtered.slice(0, 50).map((faq, i) => (
                  <div key={`${faq.section}-${i}`} className="border border-gray-200 rounded-[14px] overflow-hidden hover:border-gray-300 transition-colors">
                    <button
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
                    >
                      <div className="min-w-0">
                        <span className="text-[14px] font-bold text-gray-800 block" style={{ letterSpacing: '-0.01em' }}>{faq.q}</span>
                        <span className="text-[11px] text-gray-400 mt-0.5 block">{faq.section}</span>
                      </div>
                      <span className={`material-symbols-outlined text-[20px] text-gray-400 shrink-0 transition-transform duration-200 mt-1 ${openIndex === i ? 'rotate-180' : ''}`}>expand_more</span>
                    </button>
                    {openIndex === i && (
                      <div className="px-5 pb-4">
                        <p className="text-[14px] text-gray-500 leading-relaxed mb-3">{faq.a}</p>
                        <Link href={faq.sectionHref} className="inline-flex items-center gap-1 text-[12px] font-bold text-primary hover:gap-2 transition-all">
                          View {faq.section} page <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {filtered.length > 50 && (
                <p className="text-[13px] text-gray-400 text-center mt-8">Showing first 50 of {filtered.length} results. Narrow your search to see more specific questions.</p>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
