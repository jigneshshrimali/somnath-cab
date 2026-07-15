/**
 * Lightweight signed session tokens using the Web Crypto API (HMAC-SHA256).
 * Deliberately avoids Node-only APIs (like `crypto` from "crypto" or `Buffer`)
 * so the same verification logic works inside Next.js Edge Middleware.
 */

const encoder = new TextEncoder();
const decoder = new TextDecoder();

async function getKey() {
  const secret = process.env.ADMIN_SESSION_SECRET || "dev-only-insecure-secret-change-me";
  const keyData = encoder.encode(secret);
  return crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str: string): Uint8Array {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/").padEnd(str.length + ((4 - (str.length % 4)) % 4), "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export async function createSessionToken(hoursValid = 24 * 7): Promise<string> {
  const exp = Date.now() + hoursValid * 60 * 60 * 1000;
  const payloadBytes = encoder.encode(JSON.stringify({ exp }));
  const key = await getKey();
  const sig = await crypto.subtle.sign("HMAC", key, payloadBytes);
  return `${toBase64Url(payloadBytes)}.${toBase64Url(new Uint8Array(sig))}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [payloadB64, sigB64] = token.split(".");
  if (!payloadB64 || !sigB64) return false;

  try {
    const key = await getKey();
    const payloadBytes = fromBase64Url(payloadB64);
    const sigBytes = fromBase64Url(sigB64);
    const valid = await crypto.subtle.verify("HMAC", key, sigBytes, payloadBytes);
    if (!valid) return false;

    const payload = JSON.parse(decoder.decode(payloadBytes)) as { exp: number };
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}
