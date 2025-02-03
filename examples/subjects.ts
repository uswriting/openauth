import { object, string } from "valibot"
import { createSubjects } from "@uswriting/openauth/subject"

export const subjects = createSubjects({
  user: object({
    id: string(),
  }),
})
