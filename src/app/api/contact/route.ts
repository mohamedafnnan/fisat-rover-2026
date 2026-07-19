import { NextResponse } from "next/server";

/**
 * Contact form endpoint (stub).
 * Wired to Payload ContactSubmissions in the backend milestone.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    if (!body.email || !body.message) {
      return NextResponse.json(
        { ok: false, error: "email and message are required" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Contact endpoint ready — CMS write not wired in foundation milestone.",
      },
      { status: 202 },
    );
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }
}
