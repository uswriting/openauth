import { issuer } from "@6over3/openauth"
import { CodeUI } from "@6over3/openauth/ui/code"
import { CodeProvider } from "@6over3/openauth/provider/code"
import { MemoryStorage } from "@6over3/openauth/storage/memory"
import { subjects } from "./subjects"

async function getUser(email: string) {
  // Get user from database and return user ID
  return "123"
}

export default issuer({
  subjects,
  storage: MemoryStorage(),
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
