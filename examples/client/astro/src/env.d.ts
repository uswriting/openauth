import type { SubjectPayload } from "@6over3/openauth/subject"
import { subjects } from "./auth"

declare global {
  declare namespace App {
    interface Locals {
      subject?: SubjectPayload<typeof subjects>
    }
  }
}
