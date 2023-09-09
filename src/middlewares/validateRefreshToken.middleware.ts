import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

// Configs
import stringsConfig from "../configs/strings.config";
import globalsConfig from "../configs/globals.config";

// Utils
import PlatformError from "../utils/error.util";

// Services
import userServices from "../services/user.services";

/**
 * The function `validateRefreshToken` is a middleware function that validates a refresh token in the request headers and
 * verifies the user associated with the token. Then the user is attached to the request.
 *
 * @param request - The `request` parameter represents the incoming HTTP request object. It contains information about the
 * request, such as the request headers, query parameters, request body, etc.
 * @param response - The `response` parameter is the HTTP response object that is used to send the response back to the
 * client. It contains methods and properties to manipulate the response, such as setting headers, status code, and sending
 * data back to the client.
 * @param next - The `next` parameter is a function that is used to pass control to the next middleware function in the
 * request-response cycle. It is typically called at the end of the current middleware function to indicate that it has
 * completed its processing and the next middleware function should be called.
 *
 * @returns In this code snippet, if the `authorizationHeader` is `undefined`, a response with status code `401`
 * (UNAUTHORIZED) and a JSON object containing a `message` property will be returned. If the `authorizationHeader` is
 * defined, the code will continue to execute and call the `next()` function to pass control to the next middleware or
 * route handler.
 */
const validateRefreshToken: RequestHandler = async (
    request,
    response,
    next
) => {
    const { [globalsConfig.HEADERS.REFRESH_TOKEN]: refreshToken } =
        request.headers;

    if (refreshToken === undefined) {
        throw new PlatformError(
            stringsConfig.ERRORS.UNAUTHORIZED,
            StatusCodes.UNAUTHORIZED
        );
    }

    if (typeof refreshToken !== "string") {
        throw new PlatformError(
            stringsConfig.ERRORS.BAD_REQUEST,
            StatusCodes.BAD_REQUEST
        );
    }

    const user = await userServices.verifyUserByRefreshToken(refreshToken);

    request.user = user;

    next();
};

export default validateRefreshToken;
