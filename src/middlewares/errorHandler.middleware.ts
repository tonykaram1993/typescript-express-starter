import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

// Utils
import logger from "../utils/logger.util";
import PlatformError from "../utils/error.util";

// Configs
import stringsConfig from "../configs/strings.config";

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
