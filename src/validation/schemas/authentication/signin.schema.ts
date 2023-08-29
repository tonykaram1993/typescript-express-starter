import { z } from "zod";

// Schemas
import passwordSchema from "../password.schema";
import emailSchema from "../email.schema";

const authenticationSigninSchema = z.object({
    body: z.object({
        email: emailSchema,
        password: passwordSchema,
    }),
});

export default authenticationSigninSchema;
