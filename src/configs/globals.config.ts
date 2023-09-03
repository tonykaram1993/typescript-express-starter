const ENVIRONMENTS = {
    PRODUCTION: "production",
    STAGING: "staging",
    DEVELOPMENT: "development",
} as const;

const ENV_VARIABLES = {
    PORT: "PORT",
    NODE_ENV: "NODE_ENV",
    MONGODB_HOST: "MONGODB_HOST",
    MONGODB_PORT: "MONGODB_PORT",
    MONGODB_DATABASE: "MONGODB_DATABASE",
    JWT_TOKEN_SECRET: "JWT_TOKEN_SECRET",
    JWT_REFRESH_TOKEN_SECRET: "JWT_REFRESH_TOKEN_SECRET",
} as const;

const HEADERS = {
    AUTHORIZATION: "authorization",
    REFRESH_TOKEN: "refresh-token",
} as const;

export default {
    ENVIRONMENTS,
    ENV_VARIABLES,
    HEADERS,
};
