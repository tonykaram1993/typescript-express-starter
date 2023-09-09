import { z } from "zod";

// Schemas
import emailSchema from "../email.schema";

const authenticationForgotPasswordSchema = z.object({
    body: z.object({
        email: emailSchema,
    }),
});

export default authenticationForgotPasswordSchema;
