import { z } from "zod";

// Schemas
import emailSchema from "../email.schema";

// Configs
import globalsConfig from "../../../configs/globals.config";

const addPermissionPostSchema = z.object({
    body: z.object({
        email: emailSchema,
        permissions: z.array(z.nativeEnum(globalsConfig.PERMISSIONS)),
    }),
});

export default addPermissionPostSchema;
