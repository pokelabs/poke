import * as z from "zod"
import { CompletePost, RelatedPostModel } from "./index"

export const UserModel = z.object({
  userId: z.number().int(),
  createdAt: z.date(),
  name: z.string().nullish(),
  avatar: z.string().nullish(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  posts: CompletePost[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  posts: RelatedPostModel.array(),
}))
