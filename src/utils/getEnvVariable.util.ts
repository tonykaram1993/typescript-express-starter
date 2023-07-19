import { StatusCodes } from "http-status-codes";

// Utils
import makeError from "./error.util";
import logger from "./logger.util";

// Configs
import stringsConfig from "../configs/strings.config";

const getEnvVariable = (name: string) => {
  const envVariable = process.env[name];
  const { NODE_ENV } = process.env;

  if (envVariable === undefined) {
    logger.error(
      `${name} is undefined. Make sure it is defined in the appropriate .env file. Current environment is ${NODE_ENV}`
    );
    throw makeError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      stringsConfig.ERRORS.INTERNAL_SERVER_ERROR
    );
  }

  return envVariable;
};

export default getEnvVariable;
