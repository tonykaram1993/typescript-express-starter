import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

// Utils
import logger from "../utils/logger.util";

const errorHandlerMiddleware: ErrorRequestHandler = (
  error,
  request,
  response,
  next
) => {
  if (response.headersSent) {
    return next(error);
  }

  const { message } = error;

  logger.error(error);

  response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
};

export default errorHandlerMiddleware;
