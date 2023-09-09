const ERRORS = {
    SOMETHING_WENT_WRONG: "Something went wrong",
    VALIDATION: "Validation Error",
    UNAUTHORIZED: "Unauthorized",
    FORBIDDEN: "Forbidden",
    NOT_FOUND: "Not Found",
    NOT_FOUND_USER: "User not found",
    BAD_REQUEST: "Bad Request",
    EMAIL_PASSWORD_NOT_FOUND:
        "The email/password combination was not found. Please register",
    PASSWORDS_DO_NOT_MATCH: "Passwords do not match",
    EMAIL_ALREADY_EXISTS: "Email already exists",
    REFRESH_TOKEN_NOT_FOUND_OR_EXPIRED: "Refresh token not found or expired",
    RESET_PASSWORD_TOKEN_NOT_FOUND_OR_EXPIRED:
        "Reset password token not found or expired",
    INVALID_AUTHENTICATION_HEADER: "Invalid authentication header",
} as const;

const MESSAGES = {
    CONNECTED_TO_MONGODB: "Connected to MongoDB!",
    PASSWORD_RESET_SUCCESSFUL: "Password reset successful, you can now login",
} as const;

export default {
    MESSAGES,
    ERRORS,
};
