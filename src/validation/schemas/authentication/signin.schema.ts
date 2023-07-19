import { z } from "zod";

const authenticationSigninSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

export default authenticationSigninSchema;
