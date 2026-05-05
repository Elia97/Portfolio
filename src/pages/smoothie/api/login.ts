import type { APIRoute } from "astro"
import {
  buildAuthCookie,
  checkPassword,
  signToken,
} from "../../../lib/smoothie/auth"

export const prerender = false

const lastAttempt = new Map<string, number>()
const RATE_LIMIT_MS = 1000

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = clientAddress || "unknown"
  const now = Date.now()
  const last = lastAttempt.get(ip) ?? 0
  if (now - last < RATE_LIMIT_MS) {
    return new Response(JSON.stringify({ error: "Troppi tentativi" }), {
      status: 429,
      headers: { "content-type": "application/json" },
    })
  }
  lastAttempt.set(ip, now)

  let body: { password?: string }
  const contentType = request.headers.get("content-type") || ""
  try {
    if (contentType.includes("application/json")) {
      body = await request.json()
    } else {
      const form = await request.formData()
      body = { password: String(form.get("password") || "") }
    }
  } catch {
    return new Response(JSON.stringify({ error: "Body non valido" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })
  }

  if (!body.password || !checkPassword(body.password)) {
    if (contentType.includes("application/json")) {
      return new Response(JSON.stringify({ error: "Password errata" }), {
        status: 401,
        headers: { "content-type": "application/json" },
      })
    }
    return Response.redirect(
      new URL("/smoothie/login/?error=1", request.url),
      303
    )
  }

  const token = signToken()
  const secure = new URL(request.url).protocol === "https:"
  const cookie = buildAuthCookie(token, secure)

  if (contentType.includes("application/json")) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "set-cookie": cookie,
      },
    })
  }

  return new Response(null, {
    status: 303,
    headers: {
      location: "/smoothie/",
      "set-cookie": cookie,
    },
  })
}
