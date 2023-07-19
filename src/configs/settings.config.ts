const ERROR = {
  FILES: {
    ERROR: "src/logs/error.log",
    COMBINED: "src/logs/combined.log",
  },
};

const RATE_LIMITER = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX: 60,
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
