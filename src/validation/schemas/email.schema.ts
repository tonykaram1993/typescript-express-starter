import z from "zod";

const emailSchema = z.string().email();

export default emailSchema;
