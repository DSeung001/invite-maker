import type { InviteData } from "./invite-types";

export function encodeInvite(data: InviteData): string {
  const json = JSON.stringify(data);
  const bytes = new TextEncoder().encode(json);

  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export function decodeInvite(encoded: string): InviteData {
  const base64 = encoded
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(encoded.length / 4) * 4, "=");

  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  const json = new TextDecoder().decode(bytes);

  return JSON.parse(json) as InviteData;
}

/** Reads the `d` value from a URL search string like `?d=...`. */
export function readInviteEncoded(search: string): string | null {
  const value = new URLSearchParams(search).get("d");
  return value && value.length > 0 ? value : null;
}
