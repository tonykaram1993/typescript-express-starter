import { z } from "zod";

const authenticationRefreshSchema = z.object({
  body: z.object({
    refreshToken: z.string(),
  }),
});

export default authenticationRefreshSchema;
