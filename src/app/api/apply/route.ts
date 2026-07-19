import { NextResponse } from "next/server";

/**
 * Recruitment application endpoint (stub).
 * Wired to Payload Applications + file upload in a later milestone.
 */
export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("multipart/form-data") && !contentType.includes("application/json")) {
      return NextResponse.json(
        { ok: false, error: "Expected JSON or multipart form data" },
        { status: 415 },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Apply endpoint ready — CMS write not wired in foundation milestone.",
      },
      { status: 202 },
    );
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
