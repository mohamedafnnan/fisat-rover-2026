import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * Payload publish webhook → on-demand ISR (stub).
 * Secure with REVALIDATE_SECRET in production.
 */
export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");
  const expected = process.env.REVALIDATE_SECRET;

  if (expected && secret !== expected) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      tags?: string[];
      paths?: string[];
    };

    for (const tag of body.tags ?? []) {
      revalidateTag(tag);
    }
    for (const path of body.paths ?? []) {
      revalidatePath(path);
    }

    return NextResponse.json({
      ok: true,
      revalidated: true,
      tags: body.tags ?? [],
      paths: body.paths ?? [],
      now: Date.now(),
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }
}
