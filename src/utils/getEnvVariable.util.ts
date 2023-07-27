import { StatusCodes } from "http-status-codes";

// Utils
import makeError from "./error.util";

// Configs
import stringsConfig from "../configs/strings.config";

const getEnvVariable = (name: string) => {
  const envVariable = process.env[name];
  const { NODE_ENV } = process.env;

  if (envVariable === undefined) {
    throw makeError({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: stringsConfig.ERRORS.INTERNAL_SERVER_ERROR,
      logMessage: `${name} is undefined. Make sure it is defined in the appropriate .env file. Current environment is ${NODE_ENV}`,
    });
  }

  return envVariable;
};

export default getEnvVariable;
