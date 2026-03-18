import Link from 'next/link';
import { breadcrumbSchema, JsonLd, type BreadcrumbItem } from '@/lib/schema';

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  // Prepend Home
  const allItems: BreadcrumbItem[] = [{ name: 'Home', href: '/' }, ...items];

  return (
    <>
      <JsonLd data={breadcrumbSchema(allItems)} />
      <nav aria-label="Breadcrumb" className="container-rq pt-6 pb-2">
        <ol className="flex items-center gap-1.5 text-[12px] font-medium text-gray-400 flex-wrap">
          {allItems.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1.5">
              {i > 0 && <span className="material-symbols-outlined text-[14px] text-gray-300">chevron_right</span>}
              {i === allItems.length - 1 ? (
                <span className="text-gray-600">{item.name}</span>
              ) : (
                <Link href={item.href} className="hover:text-primary transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
