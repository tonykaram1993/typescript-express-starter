import { StatusCodes } from "http-status-codes";

// Configs
import stringsConfig from "../configs/strings.config";
import { RequestHandler } from "express";
import PlatformError from "../utils/error.util";

const validateRefreshToken: RequestHandler = (request, response, next) => {
    const { refreshToken } = request.headers;

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

    next();
};

export default validateRefreshToken;
