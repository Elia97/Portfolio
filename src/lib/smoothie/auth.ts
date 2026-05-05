import { createHmac, timingSafeEqual } from "node:crypto"

export const AUTH_COOKIE = "smoothie_auth"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 giorni

interface TokenPayload {
  exp: number
}

function readEnv(name: string): string | undefined {
  const fromMeta = (import.meta.env as Record<string, string | undefined>)[name]
  if (fromMeta) return fromMeta
  if (typeof process !== "undefined" && process.env) {
    return process.env[name]
  }
  return undefined
}

function getSecret(): string {
  const secret = readEnv("SMOOTHIE_SECRET")
  if (!secret || secret.length < 16) {
    throw new Error("SMOOTHIE_SECRET non configurato (almeno 16 caratteri)")
  }
  return secret
}

function getPassword(): string {
  const pw = readEnv("SMOOTHIE_PASSWORD")
  if (!pw) throw new Error("SMOOTHIE_PASSWORD non configurato")
  return pw
}

function b64url(buf: Buffer | string): string {
  const b = typeof buf === "string" ? Buffer.from(buf) : buf
  return b
    .toString("base64")
    .replace(/=+$/, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
}

function b64urlDecode(s: string): Buffer {
  const pad = "=".repeat((4 - (s.length % 4)) % 4)
  return Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64")
}

export function signToken(payload: TokenPayload = { exp: 0 }): string {
  const exp = payload.exp || Math.floor(Date.now() / 1000) + COOKIE_MAX_AGE
  const body = b64url(JSON.stringify({ exp }))
  const sig = b64url(createHmac("sha256", getSecret()).update(body).digest())
  return `${body}.${sig}`
}

export function verifyToken(token: string | undefined | null): boolean {
  if (!token || typeof token !== "string") return false
  const [body, sig] = token.split(".")
  if (!body || !sig) return false
  const expected = createHmac("sha256", getSecret()).update(body).digest()
  let provided: Buffer
  try {
    provided = b64urlDecode(sig)
  } catch {
    return false
  }
  if (provided.length !== expected.length) return false
  if (!timingSafeEqual(provided, expected)) return false
  try {
    const payload = JSON.parse(
      b64urlDecode(body).toString("utf8")
    ) as TokenPayload
    return typeof payload.exp === "number" && payload.exp > Date.now() / 1000
  } catch {
    return false
  }
}

export function checkPassword(input: string): boolean {
  const expected = Buffer.from(getPassword())
  const got = Buffer.from(input || "")
  if (got.length !== expected.length) return false
  return timingSafeEqual(got, expected)
}

export function buildAuthCookie(token: string, secure: boolean): string {
  const parts = [
    `${AUTH_COOKIE}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${COOKIE_MAX_AGE}`,
  ]
  if (secure) parts.push("Secure")
  return parts.join("; ")
}

export function buildClearCookie(secure: boolean): string {
  const parts = [
    `${AUTH_COOKIE}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0",
  ]
  if (secure) parts.push("Secure")
  return parts.join("; ")
}

export function isAuthenticated(request: Request): boolean {
  const cookie = request.headers.get("cookie") || ""
  const match = cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(AUTH_COOKIE + "="))
  if (!match) return false
  const token = match.slice(AUTH_COOKIE.length + 1)
  return verifyToken(token)
}
