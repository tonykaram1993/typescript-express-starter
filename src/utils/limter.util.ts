import { RateLimitRequestHandler, rateLimit } from "express-rate-limit";
import settingsConfig from "../configs/settings.config";

const rateLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: settingsConfig.RATE_LIMITER.WINDOW_MS,
  max: settingsConfig.RATE_LIMITER.MAX,
  standardHeaders: true,
  legacyHeaders: false,
});

export default rateLimiter;
