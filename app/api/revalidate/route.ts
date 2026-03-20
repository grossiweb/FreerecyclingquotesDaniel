import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// Secret to prevent unauthorized revalidation
const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET || 'rq-revalidate-2026';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Verify secret
    const secret = request.headers.get('x-revalidation-secret') || body.secret;
    if (secret !== REVALIDATION_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }

    const { table, slug, type } = body;

    // Revalidate based on what changed
    if (table === 'services' && slug) {
      revalidatePath(`/services/${slug}`);
      revalidatePath('/services');
    } else if (table === 'materials' && slug) {
      revalidatePath(`/materials/${slug}`);
      revalidatePath('/materials');
    } else if (table === 'industries' && slug) {
      revalidatePath(`/industries/${slug}`);
      revalidatePath('/industries');
    } else if (table === 'challenges' && slug) {
      revalidatePath(`/challenges/${slug}`);
      revalidatePath('/challenges');
    } else if (table === 'faqs') {
      // FAQs can belong to any page type
      if (type && slug) {
        revalidatePath(`/${type}s/${slug}`);
      }
    } else if (table === 'service_materials' || table === 'service_industries' || table === 'service_challenges') {
      // Junction table changed — revalidate affected service
      if (slug) revalidatePath(`/services/${slug}`);
    } else if (table === 'site_config') {
      // Contact info changed — revalidate everything
      revalidatePath('/', 'layout');
    } else if (type === 'all') {
      // Nuclear option: revalidate everything
      revalidatePath('/', 'layout');
    } else {
      return NextResponse.json({ error: 'Unknown table or missing slug' }, { status: 400 });
    }

    return NextResponse.json({
      revalidated: true,
      table,
      slug,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 });
  }
}

// Also support GET for easy testing in browser
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const path = request.nextUrl.searchParams.get('path');

  if (secret !== REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  if (path) {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path });
  }

  return NextResponse.json({ error: 'Missing path parameter' }, { status: 400 });
}
