/**
 * Payload CMS access layer (stub).
 * All content fetchers land here in the CMS milestone.
 * Pages must not import Payload directly — only this module.
 */

export type CmsResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export async function getPublishedPlaceholder() {
  return {
    ok: true as const,
    data: null,
    note: "CMS not wired in foundation milestone",
  };
}
