import { StatusCodes } from "http-status-codes";

// Configs
import stringsConfig from "../configs/strings.config";
import { RequestHandler } from "express";

// Services
import authenticationServices from "../services/authentication.services";
import userServices from "../services/user.services";

// Utils
import PlatformError from "../utils/error.util";

/**
 * The authenticationMiddleware function checks for a valid authorization header, decodes the token, retrieves the user
 * associated with the token, and attaches the user object to the request before passing it to the next middleware. It
 * also checks that the user is not forced to re-login. A user is forced to re-login when they signout or change their
 * password.
 *
 * @param request - The `request` parameter represents the incoming HTTP request object, which contains information about
 * the client's request such as headers, query parameters, and request body.
 * @param response - The `response` parameter is the HTTP response object that is used to send a response back to the
 * client. It contains methods and properties that allow you to set the response status, headers, and body.
 * @param next - The `next` parameter is a function that is called to pass control to the next middleware function in the
 * chain. It is typically used to move to the next middleware function or to the route handler.
 *
 * @returns In this code snippet, if the `authorizationHeader` is `undefined`, a response with status code `401`
 * (UNAUTHORIZED) and a JSON object containing a `message` property will be returned. If the `authorizationHeader` is
 * defined, the code will continue to execute and call the `next()` function to pass control to the next middleware or
 * route handler.
 */
const authenticationMiddleware: RequestHandler = async (
    request,
    response,
    next
) => {
    // Get authorization header
    const { authorization: authorizationHeader } = request.headers;

    if (authorizationHeader === undefined) {
        throw new PlatformError(
            stringsConfig.ERRORS.UNAUTHORIZED,
            StatusCodes.UNAUTHORIZED
        );
    }

    // Get token and decode it
    const authorizationToken =
        authenticationServices.getTokenFromAuthorizationHeader(
            authorizationHeader
        );
    const decodedAuthorizationToken =
        authenticationServices.decodeToken(authorizationToken);

    // Get user
    const user = await userServices.getUserByEmail(
        decodedAuthorizationToken.email
    );

    if (user === false) {
        throw new PlatformError(
            stringsConfig.ERRORS.UNAUTHORIZED,
            StatusCodes.UNAUTHORIZED
        );
    }

    // Check if user is forced to login
    if (user.isForcedToLogin) {
        throw new PlatformError(
            stringsConfig.ERRORS.UNAUTHORIZED,
            StatusCodes.UNAUTHORIZED
        );
    }

    request.user = user;

    next();
};

export default authenticationMiddleware;
