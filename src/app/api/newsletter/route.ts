import { NextResponse } from "next/server";

/**
 * Newsletter subscribe endpoint (stub).
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    if (!body.email || typeof body.email !== "string") {
      return NextResponse.json({ ok: false, error: "email is required" }, { status: 400 });
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Newsletter endpoint ready — CMS write not wired in foundation milestone.",
      },
      { status: 202 },
    );
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }
}
