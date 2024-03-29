const ERROR = {
    // Files where the logs will be stored
    FILES: {
        ERROR: "src/logs/error.log",
        COMBINED: "src/logs/combined.log",
    },
} as const;

// API rate limiter for users
const RATE_LIMITER = {
    TIME_PERIOD_MS: 900_000, // 15 * 60 * 1000 = 15 minutes
    MAX_REQUESTS: 60,
} as const;

const AUTHENTICATION = {
    JWT_TOKEN_EXPIRY: "1h",
    JWT_REFRESH_TOKEN_EXPIRY: "7d",
    JWT_RESET_PASSWORD_TOKEN_EXPIRY: "3m",
    SALT_ROUNDS: 10,
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_INCORRECT_ATTEMPTS_LIMIT: 5,
} as const;

export default {
    ERROR,
    RATE_LIMITER,
    AUTHENTICATION,
};
