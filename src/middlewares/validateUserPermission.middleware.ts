import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

// Models
import { User } from "../models/User.model";

// Types
import UserPermission from "../validation/types/user/UserPermission.type";

// Utils
import PlatformError from "../utils/error.util";

// Configs
import stringsConfig from "../configs/strings.config";

/**
 * The `validateUserPermissionMiddleware` function is a middleware that checks if a user has the required permissions and
 * throws an error if not.
 *
 * @param {UserPermission[]} permissions - An array of UserPermission values.
 */
const validateUserPermissionMiddleware =
    (permissions: UserPermission[]): RequestHandler =>
    (request, response, next) => {
        const user = request.user as User;

        if (!user) {
            throw new PlatformError(
                stringsConfig.ERRORS.NOT_FOUND_USER,
                StatusCodes.NOT_FOUND
            );
        }

        const hasPermission = permissions.every((permission) =>
            user.permissions.includes(permission)
        );

        if (!hasPermission) {
            throw new PlatformError(
                stringsConfig.ERRORS.UNAUTHORIZED,
                StatusCodes.UNAUTHORIZED
            );
        }

        next();
    };

export default validateUserPermissionMiddleware;
