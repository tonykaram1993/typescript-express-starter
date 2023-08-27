import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

// Utils
import logger from "../utils/logger.util";

// Configs
import stringsConfig from "../configs/strings.config";

const errorHandlerMiddleware: ErrorRequestHandler = (
  error,
  request,
  response,
  next
) => {
  if (response.headersSent) {
    return next(error);
  }

  logger.error(error);

  response
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: stringsConfig.ERRORS.SOMETHING_WENT_WRONG });
};

export default errorHandlerMiddleware;
