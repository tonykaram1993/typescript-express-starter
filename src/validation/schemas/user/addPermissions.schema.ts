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

const addPermissionsSchema = z.object({ body });

export default addPermissionsSchema;

export type AddPermissionsRequest = Request<
    unknown, // Params
    unknown, // Response body
    z.infer<typeof body>, // Body
    unknown // Query
>;
