import { createClient } from "@uswriting/openauth/client"
import { cookies as getCookies } from "next/headers"
export { subjects } from "../../../subjects"

export const client = createClient({
  clientID: "nextjs",
  issuer: "http://localhost:3000",
})

export async function setTokens(access: string, refresh: string) {
  const cookies = await getCookies()

  cookies.set({
    name: "access_token",
    value: access,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 34560000,
  })
  cookies.set({
    name: "refresh_token",
    value: refresh,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 34560000,
  })
}
