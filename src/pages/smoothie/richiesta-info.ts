import type { APIRoute } from "astro"
import { isAuthenticated } from "../../lib/smoothie/auth"
import html from "../../data/richiesta-info-bimestre.html?raw"

export const prerender = false

export const GET: APIRoute = ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response(null, {
      status: 302,
      headers: { location: "/smoothie/login/" },
    })
  }
  return new Response(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  })
}
