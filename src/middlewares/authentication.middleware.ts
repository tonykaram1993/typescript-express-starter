import { StatusCodes } from "http-status-codes";

// Configs
import stringsConfig from "../configs/strings.config";
import { RequestHandler } from "express";

// Services
import authenticationServices from "../services/authentication.services";

/**
 * The authenticationMiddleware function checks for an authorization header in the request, decodes the
 * token, and assigns the decoded token to the request object before calling the next middleware.
 *
 * In this code snippet, if the `authorizationHeader` is `undefined`, a response with status
 * code `401` (UNAUTHORIZED) and a JSON object containing a `message` property will be returned. If the
 * `authorizationHeader` is defined, the `next()` function will be called to proceed to the next
 * middleware or route handler.
 *
 * @param request - The `request` parameter represents the incoming HTTP request object. It contains
 * information about the request, such as the request headers, request body, request method, and
 * request URL.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It is used to send data, set headers, and control the response status
 * code.
 * @param next - The `next` parameter is a function that is called to pass control to the next
 * middleware function in the chain. It is typically used to move to the next middleware function or to
 * the route handler function.
 */
const authenticationMiddleware: RequestHandler = (request, response, next) => {
    const { authorization: authorizationHeader } = request.headers;

    if (authorizationHeader === undefined) {
        return response.status(StatusCodes.UNAUTHORIZED).json({
            message: stringsConfig.ERRORS.UNAUTHORIZED,
        });
    }

    const authorizationToken =
        authenticationServices.getTokenFromAuthorizationHeader(
            authorizationHeader
        );

    const decodedAuthorizationToken =
        authenticationServices.decodeToken(authorizationToken);

    request.user = decodedAuthorizationToken;

    next();
};

export default authenticationMiddleware;
