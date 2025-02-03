import { issuer } from "@uswriting/openauth"
import { CloudflareStorage } from "@uswriting/openauth/storage/cloudflare"
import {
  type ExecutionContext,
  type KVNamespace,
} from "@cloudflare/workers-types"
import { subjects } from "../../subjects.js"
import { PasswordProvider } from "@uswriting/openauth/provider/password"
import { PasswordUI } from "@uswriting/openauth/ui/password"

interface Env {
  CloudflareAuthKV: KVNamespace
}

async function getUser(email: string) {
  // Get user from database
  // Return user ID
  return "123"
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    return issuer({
      storage: CloudflareStorage({
        namespace: env.CloudflareAuthKV,
      }),
      subjects,
      providers: {
        password: PasswordProvider(
          PasswordUI({
            sendCode: async (email, code) => {
              console.log(email, code)
            },
          }),
        ),
      },
      success: async (ctx, value) => {
        if (value.provider === "password") {
          return ctx.subject("user", {
            id: await getUser(value.email),
          })
        }
        throw new Error("Invalid provider")
      },
    }).fetch(request, env, ctx)
  },
}
