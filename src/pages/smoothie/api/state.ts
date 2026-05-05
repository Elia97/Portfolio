import type { APIRoute } from "astro"
import { isAuthenticated } from "../../../lib/smoothie/auth"
import { readState, writeState } from "../../../lib/smoothie/storage"
import { isDashboardState } from "../../../lib/smoothie/types"

export const prerender = false

function unauthorized() {
  return new Response(JSON.stringify({ error: "Non autenticato" }), {
    status: 401,
    headers: { "content-type": "application/json" },
  })
}

export const GET: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) return unauthorized()
  const state = await readState()
  return new Response(JSON.stringify(state), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
    },
  })
}

export const PUT: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) return unauthorized()
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: "JSON non valido" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })
  }
  if (!isDashboardState(body)) {
    return new Response(JSON.stringify({ error: "Shape non valido" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })
  }
  await writeState(body)
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "content-type": "application/json" },
  })
}
