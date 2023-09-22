import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

// Utils
import logger from "../utils/logger.util";
import PlatformError from "../utils/error.util";

// Configs
import stringsConfig from "../configs/strings.config";

/**
 * The errorHandlerMiddleware function handles errors in a TypeScript application by logging
 * the error, determining the appropriate status code and error message, and sending a JSON
 * response to the client.
 *
 * @param {PlatformError | Error} error - The `error` parameter represents the error that
 * occurred during the request processing.
 * @param request - The `request` parameter represents the incoming HTTP request object. It
 * contains information about the request such as the request method, URL, headers, and body.
 * @param response - The `response` parameter is the HTTP response object that is used to
 * send the response back to the client. It contains methods and properties to set the
 * response status, headers, and body. In this code, it is used to set the status code and
 * send a JSON response with an error message.
 * @param next - The `next` parameter is a function that is used to pass control to the next
 * middleware function in the request-response cycle. It is typically called at the end of
 * the current middleware function to indicate that it has completed its processing and the
 * next middleware function should be called.
 *
 * @returns In this code snippet, if the response headers have already been sent, the
 * function will call the `next` function with the `error` parameter. Otherwise, it will log
 * the error using the `logger.error` function and return the appropriate status and error
 * message.
 */
const errorHandlerMiddleware: ErrorRequestHandler = (
    error: PlatformError | Error,
    request,
    response,
    next
) => {
    if (response.headersSent) {
        return next(error);
    }

    logger.error(error);

    const isPlatformError = error instanceof PlatformError;

    const status = isPlatformError
        ? error.statusCode
        : StatusCodes.INTERNAL_SERVER_ERROR;

    const message = isPlatformError
        ? error.message
        : stringsConfig.ERRORS.SOMETHING_WENT_WRONG;

    response.status(status).json({ message });
};

export default errorHandlerMiddleware;
