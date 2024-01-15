import { z } from "zod";
import { RequestHandler } from "express";

// Schemas
import emailSchema from "../email.schema";

const query = z.object({
    email: emailSchema,
});

const getPermissionsSchema = z.object({ query });

export default getPermissionsSchema;

export type GetPermissionsRequestHandler = RequestHandler<
    unknown, // Params
    unknown, // Response body
    unknown, // Body
    z.infer<typeof query> // Query
>;
