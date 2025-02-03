import { handle } from "hono/aws-lambda"
import { issuer } from "@uswriting/openauth"
import { CodeUI } from "@uswriting/openauth/ui/code"
import { CodeProvider } from "@uswriting/openauth/provider/code"
import { MemoryStorage } from "@uswriting/openauth/storage/memory"
import { subjects } from "./subjects"

async function getUser(email: string) {
  // Get user from database and return user ID
  return "123"
}

const app = issuer({
  subjects,
  storage: MemoryStorage(),
  // Remove after setting custom domain
  allow: async () => true,
  providers: {
    code: CodeProvider(
      CodeUI({
        sendCode: async (email, code) => {
          console.log(email, code)
        },
      }),
    ),
  },
  success: async (ctx, value) => {
    if (value.provider === "code") {
      return ctx.subject("user", {
        id: await getUser(value.claims.email),
      })
    }
    throw new Error("Invalid provider")
  },
})

export const handler = handle(app)
