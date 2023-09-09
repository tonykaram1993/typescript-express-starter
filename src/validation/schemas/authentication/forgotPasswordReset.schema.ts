import { z } from "zod";

// Schemas
import passwordSchema from "../password.schema";

// Configs
import stringsConfig from "../../../configs/strings.config";

const authenticationForgotPasswordSchema = z.object({
    body: z
        .object({
            password: passwordSchema,
            confirmationPassword: passwordSchema,
            resetPasswordToken: z.string(),
        })
        // Make sure that password is equal to confirmationPassword
        .refine((data) => data.password === data.confirmationPassword, {
            message: stringsConfig.ERRORS.PASSWORDS_DO_NOT_MATCH,
            path: ["confirmationPassword"],
        }),
});

export default authenticationForgotPasswordSchema;
