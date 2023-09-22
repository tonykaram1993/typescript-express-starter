// Middlewares
import validateRequestMiddleware from "../middlewares/validateRequest.middleware";
import validateUserPermissionMiddleware from "../middlewares/validateUserPermission.middleware";

// Routers
import authenticatedRouter from "../routers/authenticated.router";

// Utils
import tryCatch from "../utils/tryCatch.util";

// Schemas
import addPermissionsPostSchema from "../validation/schemas/user/addPermissions.schema";

// Controllers
import userControllers from "../controllers/user.controllers";

// Configs
import globalsConfig from "../configs/globals.config";

// Authenticated Routes
authenticatedRouter.post(
    "/permissions",
    tryCatch(validateRequestMiddleware(addPermissionsPostSchema)),
    tryCatch(
        validateUserPermissionMiddleware([
            globalsConfig.PERMISSIONS.SET_SUSPEND_USER,
        ])
    ),
    tryCatch(userControllers.addPermissions)
);

const userRoutes = {
    authenticatedRouter,
};

export default userRoutes;
