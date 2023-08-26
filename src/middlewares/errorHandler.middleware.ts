import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

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

  response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
};

export default errorHandlerMiddleware;
