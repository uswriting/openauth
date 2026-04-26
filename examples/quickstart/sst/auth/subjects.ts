import { object, string } from "valibot"
import { createSubjects } from "@6over3/openauth/subject"

export const subjects = createSubjects({
  user: object({
    id: string(),
  }),
})
