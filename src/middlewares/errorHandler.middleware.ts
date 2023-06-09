import { Request, Response } from "express";

// Configs
import globalsConfig from "../configs/globals.config";

// Types
import Error from "../types/Error.type";

// Utils
import logger from "../utils/logger.util";

// Environment Variables
const { NODE_ENV } = process.env;

const errorHandler = (error: Error, request: Request, response: Response) => {
  if (NODE_ENV !== globalsConfig.ENVIRONMENTS.PRODUCTION && error.stack) {
    delete error.stack;
  }

  logger.error(error);

  response.status(error.statusCode).json(error);
};

export default errorHandler;
