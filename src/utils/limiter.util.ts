import { RateLimitRequestHandler, rateLimit } from "express-rate-limit";

// Configs
import settingsConfig from "../configs/settings.config";

const rateLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: settingsConfig.RATE_LIMITER.TIME_PERIOD_MS,
  max: settingsConfig.RATE_LIMITER.MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
});

export default rateLimiter;
