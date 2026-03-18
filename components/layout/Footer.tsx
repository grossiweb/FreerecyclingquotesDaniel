import Link from 'next/link';
import Image from 'next/image';
import { CONTACT } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-[#0D1410] pt-14 text-gray-400">
      <div className="container-rq">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 pb-10 border-b border-white/5">
          <div>
            <Image src="/images/logo.png" alt="Recycling Quotes" width={150} height={34} className="brightness-0 invert opacity-80" />
            <p className="text-[13px] leading-relaxed mt-3.5 max-w-[260px]">
              Get quick, dependable recycling solutions for end-of-life products, materials, and business waste — with guidance you can trust.
            </p>
            <div className="flex items-start gap-[7px] mt-2.5 text-[13px]">
              <span className="material-symbols-outlined text-[16px] text-[#4ADE80] shrink-0 mt-0.5">phone</span>
              <a href={CONTACT.phoneHref} className="hover:text-white transition-colors">{CONTACT.phone}</a>
            </div>
            <div className="flex items-start gap-[7px] mt-2.5 text-[13px]">
              <span className="material-symbols-outlined text-[16px] text-[#4ADE80] shrink-0 mt-0.5">email</span>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-white transition-colors">{CONTACT.email}</a>
            </div>
            <div className="flex items-start gap-[7px] mt-2.5 text-[13px]">
              <span className="material-symbols-outlined text-[16px] text-[#4ADE80] shrink-0 mt-0.5">location_on</span>
              <span>{CONTACT.address}</span>
            </div>
          </div>

          <FooterCol title="Services" links={[
            { label: 'Pallet Recycling', href: '/services/pallet-recycling' },
            { label: 'Business Recycling', href: '/services/business-recycling-programs' },
            { label: 'IT Asset Disposition', href: '/services/it-asset-disposition' },
            { label: 'Dumpster Rental', href: '/services/dumpster-rental' },
            { label: 'Junk Removal', href: '/services/junk-removal' },
            { label: 'Data Destruction', href: '/services/data-destruction' },
            { label: 'All Services', href: '/services' },
          ]} />

          <FooterCol title="Materials" links={[
            { label: 'Electronics', href: '/materials/electronics' },
            { label: 'Metal', href: '/materials/metals' },
            { label: 'Paper & Cardboard', href: '/materials/paper-cardboard' },
            { label: 'Plastic', href: '/materials/plastics' },
            { label: 'Pallets', href: '/materials/pallets' },
            { label: 'Hazardous Materials', href: '/materials/hazardous-materials' },
            { label: 'All Materials', href: '/materials' },
          ]} />

          <FooterCol title="Company" links={[
            { label: 'Our Story', href: '/about/our-story' },
            { label: 'Why Choose Us', href: '/about/why-choose-us' },
            { label: 'ESG & Sustainability', href: '/about/esg' },
            { label: 'Our Impact', href: '/about/our-impact' },
            { label: 'Certifications', href: '/about/certifications' },
            { label: 'Blog', href: '/resources/blog' },
            { label: 'Contact', href: '/contact' },
          ]} />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between py-5 text-[12px] text-gray-500 gap-2.5">
          <span>&copy; {new Date().getFullYear()} Recycling Quotes. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-[11px] font-bold text-white/70 uppercase tracking-[.08em] mb-3.5">{title}</h4>
      {links.map(l => (
        <Link key={l.href} href={l.href} className="block py-[3px] text-[13px] text-gray-400 hover:text-white transition-colors">{l.label}</Link>
      ))}
    </div>
  );
}
