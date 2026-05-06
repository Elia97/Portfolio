import type { APIRoute } from "astro"
import { isAuthenticated } from "../../../lib/smoothie/auth"
import { getDefaults, writeState } from "../../../lib/smoothie/storage"

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: "Non autenticato" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }
  const seed = getDefaults()
  await writeState(seed)
  return new Response(JSON.stringify({ ok: true, state: seed }), {
    status: 200,
    headers: { "content-type": "application/json" },
  })
}
