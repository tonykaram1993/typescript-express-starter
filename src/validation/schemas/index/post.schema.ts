import { z } from "zod";

const indexPostSchema = z.object({
  body: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
  query: z.object({
    limit: z.number().int().positive(),
    offset: z.number().int().positive(),
  }),
});

export default indexPostSchema;
