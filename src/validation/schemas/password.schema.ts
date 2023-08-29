import z from "zod";

// Configs
import settingsConfig from "../../configs/settings.config";

const passwordSchema = z
    .string()
    .min(settingsConfig.AUTHENTICATION.PASSWORD_MIN_LENGTH);

export default passwordSchema;
