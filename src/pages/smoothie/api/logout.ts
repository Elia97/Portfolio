import type { APIRoute } from "astro"
import { buildClearCookie } from "../../../lib/smoothie/auth"

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  const secure = new URL(request.url).protocol === "https:"
  return new Response(null, {
    status: 303,
    headers: {
      location: "/smoothie/login/",
      "set-cookie": buildClearCookie(secure),
    },
  })
}
