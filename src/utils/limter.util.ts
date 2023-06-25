import { RateLimitRequestHandler, rateLimit } from "express-rate-limit";

const rateLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
});

export default rateLimiter;
