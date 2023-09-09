// Middlewares
import validateRequestMiddleware from "../middlewares/validateRequest.middleware";

// Routers
import unauthenticatedRouter from "../routers/unauthenticated.router";
import authenticatedRouter from "../routers/authenticated.router";

// Utils
import tryCatch from "../utils/tryCatch.util";

// Schemas
import authenticationSignupSchema from "../validation/schemas/authentication/signup.schema";
import authenticationSigninSchema from "../validation/schemas/authentication/signin.schema";
import authenticationForgotPasswordRequestSchema from "../validation/schemas/authentication/forgotPasswordRequest.schema";
import authenticationForgotPasswordResetSchema from "../validation/schemas/authentication/forgotPasswordReset.schema";

// Controllers
import authenticationControllers from "../controllers/authentication.controllers";
import validateRefreshToken from "../middlewares/validateRefreshToken.middleware";

// Unauthenticated Routes
unauthenticatedRouter.post(
    "/signin",
    tryCatch(validateRequestMiddleware(authenticationSigninSchema)),
    tryCatch(authenticationControllers.signin)
);

unauthenticatedRouter.post(
    "/signup",
    tryCatch(validateRequestMiddleware(authenticationSignupSchema)),
    tryCatch(authenticationControllers.signup)
);

unauthenticatedRouter.post(
    "/forgot-password/request",
    tryCatch(
        validateRequestMiddleware(authenticationForgotPasswordRequestSchema)
    ),
    tryCatch(authenticationControllers.forgotPasswordRequest)
);

unauthenticatedRouter.post(
    "/forgot-password/reset/",
    tryCatch(
        validateRequestMiddleware(authenticationForgotPasswordResetSchema)
    ),
    tryCatch(authenticationControllers.forgotPasswordReset)
);

unauthenticatedRouter.post(
    "/refresh",
    tryCatch(validateRefreshToken),
    tryCatch(authenticationControllers.refresh)
);

// Authenticated Routes
authenticatedRouter.get(
    "/signout",
    tryCatch(authenticationControllers.signout)
);

const authenticationRoutes = {
    unauthenticatedRouter,
    authenticatedRouter,
};

export default authenticationRoutes;
