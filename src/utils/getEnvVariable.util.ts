import { StatusCodes } from "http-status-codes";

// Utils
import makeError from "./error.util";

// Configs
import stringsConfig from "../configs/strings.config";

/**
 * The function `getEnvVariable` retrieves the value of an environment variable and throws an error if
 * it is undefined.
 *
 * @param {string} name - The `name` parameter is a string that represents the name of the environment
 * variable you want to retrieve.
 *
 * @returns The function `getEnvVariable` returns the value of the environment variable with the given
 * name.
 */
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
