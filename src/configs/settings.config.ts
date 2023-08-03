const ERROR = {
  // Files where the logs will be stored
  FILES: {
    ERROR: "src/logs/error.log",
    COMBINED: "src/logs/combined.log",
  },
};

// API rate limiter for users
const RATE_LIMITER = {
  TIME_PERIOD_MS: 900_000, // 15 * 60 * 1000 = 15 minutes
  MAX_REQUESTS: 60,
};

const AUTHENTICATION = {
  jwtTokenExpiry: "1h",
  refreshTokenExpiry: "7d",
  saltRounds: 10,
};

export default {
  ERROR,
  RATE_LIMITER,
  AUTHENTICATION,
};
