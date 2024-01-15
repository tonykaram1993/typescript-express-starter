// Middlewares
import validateRequestMiddleware from "../middlewares/validateRequest.middleware";
import validateUserPermissionMiddleware from "../middlewares/validateUserPermission.middleware";

// Routers
import authenticatedRouter from "../routers/authenticated.router";

// Utils
import tryCatch from "../utils/tryCatch.util";

// Schemas
import addPermissionsPostSchema from "../validation/schemas/user/addPermissions.schema";
import removePermissionsPostSchema from "../validation/schemas/user/removePermissions.schema";
import getPermissionsSchema from "../validation/schemas/user/getPermissions.schema";

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
            globalsConfig.PERMISSIONS.SET_PERMISSIONS_USER,
        ])
    ),
    tryCatch(userControllers.addPermissions)
);

authenticatedRouter.delete(
    "/permissions",
    tryCatch(validateRequestMiddleware(removePermissionsPostSchema)),
    tryCatch(
        validateUserPermissionMiddleware([
            globalsConfig.PERMISSIONS.REMOVE_PERMISSIONS_USER,
        ])
    ),
    tryCatch(userControllers.removePermissions)
);

authenticatedRouter.get(
    "/permissions",
    tryCatch(validateRequestMiddleware(getPermissionsSchema)),
    tryCatch(
        validateUserPermissionMiddleware([
            globalsConfig.PERMISSIONS.GET_PERMISSIONS_USER,
        ])
    ),
    tryCatch(userControllers.getPermissions)
);

const userRoutes = {
    authenticatedRouter,
};

export default userRoutes;
