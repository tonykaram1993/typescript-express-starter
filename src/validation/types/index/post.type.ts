import { z } from "zod";
import indexPostSchema from "../../schemas/index/post.schema";

type indexPostType = z.infer<typeof indexPostSchema>;

export default indexPostType;
