// app/api/revalidate/route.js
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

function unauthorized() {
  return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
}

export async function POST(req) {
  const secret = req.headers.get('x-webhook-secret');
  if (secret !== process.env.SUPABASE_WEBHOOK_SECRET) return unauthorized();

  const body = await req.json();
  // Expected Supabase DB Webhook payload:
  // {
  //   type: "INSERT" | "UPDATE" | "DELETE",
  //   table: "products",
  //   record: { id, type, slug, ... },
  //   old_record: { id, type, slug, ... }
  // }

  try {
    if (body.table === 'products') {
      const rec = body.record || {};
      const old = body.old_record || {};

      // detail pages
      if (rec.type && rec.slug) revalidatePath(`/catalog/${rec.type}/${rec.slug}`, 'page');
      if (old.type && old.slug) revalidatePath(`/catalog/${old.type}/${old.slug}`, 'page'); // handle slug/type change

      // listing pages that show many products (add what you actually have)
      revalidatePath('/catalog', 'page');
      // If you have type pages:
      if (rec.type) revalidatePath(`/catalog/${rec.type}`, 'page');
      if (old.type) revalidatePath(`/catalog/${old.type}`, 'page');
    }

    // Repeat blocks like above for other tables/routes (e.g., posts)
    // if (body.table === 'posts') { ... revalidatePath(`/blog/${rec.slug}`) ... }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e?.message || 'revalidate error' }, { status: 500 });
  }
}
