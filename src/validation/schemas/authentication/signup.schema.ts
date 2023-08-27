import { z } from "zod";

// Configs
import stringsConfig from "../../../configs/strings.config";

// Schemas
import passwordSchema from "../password.schema";

const authenticationSignupSchema = z.object({
  body: z
    .object({
      email: z.string().email(),
      password: passwordSchema,
      confirmationPassword: passwordSchema,
    })
    // Make sure that passwords is equal to confirmationPassword
    .refine((data) => data.password === data.confirmationPassword, {
      message: stringsConfig.ERRORS.PASSWORDS_DO_NOT_MATCH,
      path: ["confirmationPassword"],
    }),
});

export default authenticationSignupSchema;
