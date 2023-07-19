// Middlewares
import validateRequestMiddleware from "../middlewares/validateRequest.middleware";

// Routers
import unauthenticatedRouter from "../routers/unauthenticated.router";
import authenticatedRouter from "../routers/authenticated.router";

// Utils
import tryCatch from "../utils/tryCatch.util";

// Schemas
import authenticationRefreshSchema from "../validation/schemas/authentication/refresh.schema";
import authenticationSignupSchema from "../validation/schemas/authentication/signup.schema";
import authenticationSigninSchema from "../validation/schemas/authentication/signin.schema";

// Controllers
import authenticationControllers from "../controllers/authentication.controllers";

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
  "/refresh",
  tryCatch(validateRequestMiddleware(authenticationRefreshSchema)),
  tryCatch(authenticationControllers.refresh)
);

authenticatedRouter.get(
  "/signout",
  tryCatch(authenticationControllers.signout)
);

const authenticationRoutes = {
  unauthenticatedRouter,
  authenticatedRouter,
};

export default authenticationRoutes;
