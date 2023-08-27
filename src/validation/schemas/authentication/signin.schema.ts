import { z } from "zod";

// Schemas
import passwordSchema from "../password.schema";

const authenticationSigninSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: passwordSchema,
  }),
});

export default authenticationSigninSchema;
