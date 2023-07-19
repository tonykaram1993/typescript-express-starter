import { z } from "zod";
import stringsConfig from "../../../configs/strings.config";

const authenticationSignupSchema = z.object({
  body: z
    .object({
      email: z.string(),
      password: z.string(),
      confirmationPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmationPassword, {
      message: stringsConfig.ERRORS.PASSWORDS_DO_NOT_MATCH,
      path: ["confirmationPassword"],
    }),
});

export default authenticationSignupSchema;
