import Link from 'next/link';
import Image from 'next/image';
import { CONTACT } from '@/lib/data';
import { ScrollReveal } from '@/components/ui';

export default function PageHero({
  tag,
  tagIcon,
  title,
  titleAccent,
  description,
  image,
  primaryCta = { label: 'Get a Quote', href: '/get-a-quote', icon: 'arrow_forward' },
  secondaryCta = { label: 'Schedule Pickup', href: '/schedule-pickup', icon: 'calendar_month' },
  showPhone = false,
}: {
  tag: string;
  tagIcon: string;
  title: string;
  titleAccent: string;
  description: string;
  image: string;
  primaryCta?: { label: string; href: string; icon: string };
  secondaryCta?: { label: string; href: string; icon: string } | null;
  showPhone?: boolean;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          width={1600}
          height={600}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/95 via-dark-bg/80 to-dark-bg/60" />
      </div>
      <div className="container-rq relative z-10 py-20 lg:py-28">
        <div className="max-w-2xl">
          <ScrollReveal>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-[5px] bg-white/10 text-white/80 font-bold rounded-full mb-6" style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <span className="material-symbols-outlined text-[14px]">{tagIcon}</span> {tag}
            </div>
            <h1 className="font-extrabold text-white leading-[1.08] mb-5" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.25rem)', letterSpacing: '-0.035em' }}>
              {title} <span className="text-[#4ADE80]">{titleAccent}</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p className="definition-block text-white/70 text-[17px] leading-relaxed max-w-xl mb-8">
              {description}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <div className="flex gap-2.5 flex-wrap">
              <Link href={primaryCta.href} className="btn-white">
                {primaryCta.label} <span className="material-symbols-outlined text-[16px]">{primaryCta.icon}</span>
              </Link>
              {secondaryCta && (
                <Link href={secondaryCta.href} className="btn-outline-white">
                  <span className="material-symbols-outlined text-[16px]">{secondaryCta.icon}</span> {secondaryCta.label}
                </Link>
              )}
              {showPhone && (
                <a href={CONTACT.phoneHref} className="btn-outline-white">
                  <span className="material-symbols-outlined text-[16px]">phone</span> {CONTACT.phone}
                </a>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
