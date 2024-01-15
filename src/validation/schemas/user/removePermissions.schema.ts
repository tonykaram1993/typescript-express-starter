import { z } from "zod";
import { Request } from "express";

// Schemas
import emailSchema from "../email.schema";

// Configs
import globalsConfig from "../../../configs/globals.config";

const body = z.object({
    email: emailSchema,
    permissions: z.array(z.nativeEnum(globalsConfig.PERMISSIONS)),
});

const removePermissionsSchema = z.object({ body });

export default removePermissionsSchema;

export type RemovePermissionsRequest = Request<
    unknown, // Params
    unknown, // Response body
    z.infer<typeof body>, // Body
    unknown // Query
>;
