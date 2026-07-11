import { deflateSync, inflateSync } from "fflate";
import { fromCompact, toCompact } from "./invite-compact";
import type { InviteData } from "./invite-types";

const COMPRESSED_PREFIX = "z";

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(encoded: string): Uint8Array {
  const base64 = encoded
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(encoded.length / 4) * 4, "=");
  const binary = atob(base64);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

/** Packs invite data into a short URL-safe payload (`z` + deflated compact JSON). */
export function encodeInvite(data: InviteData): string {
  const json = JSON.stringify(toCompact(data));
  const compressed = deflateSync(new TextEncoder().encode(json), { level: 9 });
  return COMPRESSED_PREFIX + toBase64Url(compressed);
}

/**
 * Unpacks invite payload.
 * - `z...` → compressed compact v2
 * - otherwise → legacy full InviteData JSON (base64url)
 */
export function decodeInvite(encoded: string): InviteData {
  if (encoded.startsWith(COMPRESSED_PREFIX)) {
    const inflated = inflateSync(fromBase64Url(encoded.slice(1)));
    const json = new TextDecoder().decode(inflated);
    return fromCompact(JSON.parse(json));
  }

  const bytes = fromBase64Url(encoded);
  const json = new TextDecoder().decode(bytes);
  return JSON.parse(json) as InviteData;
}

/** Reads the `d` value from a URL search string like `?d=...`. */
export function readInviteEncoded(search: string): string | null {
  const value = new URLSearchParams(search).get("d");
  return value && value.length > 0 ? value : null;
}
