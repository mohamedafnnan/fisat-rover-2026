import { NextResponse } from "next/server";

/**
 * Global search endpoint (stub).
 * Backed by Postgres FTS / search index in the backend milestone.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim();

  if (!q) {
    return NextResponse.json({
      ok: true,
      query: "",
      results: [],
      message: "Provide ?q= to search",
    });
  }

  return NextResponse.json({
    ok: true,
    query: q,
    results: [],
    message: "Search index not wired in foundation milestone",
  });
}
