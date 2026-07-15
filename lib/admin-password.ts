import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

/**
 * Hashes a plaintext password into a `salt:hash` string suitable for storing
 * in the ADMIN_PASSWORD_HASH environment variable. Run via:
 *   node scripts/hash-password.js "YourStrongPassword"
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const hashedInput = scryptSync(password, salt, 64);
  const storedBuf = Buffer.from(hash, "hex");
  if (hashedInput.length !== storedBuf.length) return false;
  return timingSafeEqual(hashedInput, storedBuf);
}
