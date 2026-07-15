#!/usr/bin/env node
/**
 * Generates a salted password hash for the admin dashboard.
 *
 * Usage:
 *   node scripts/hash-password.js "YourStrongPassword"
 *
 * Copy the printed ADMIN_PASSWORD_HASH value into your .env.local file.
 */
const crypto = require("crypto");

const password = process.argv[2];

if (!password) {
  console.error("Usage: node scripts/hash-password.js <password>");
  process.exit(1);
}

const salt = crypto.randomBytes(16).toString("hex");
const hash = crypto.scryptSync(password, salt, 64).toString("hex");
const stored = `${salt}:${hash}`;

console.log("\nGenerated hash:\n");
console.log(stored);
console.log("\nAdd this line to your .env.local file:\n");
console.log(`ADMIN_PASSWORD_HASH=${stored}`);
console.log("");
