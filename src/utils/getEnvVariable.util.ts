import { StatusCodes } from "http-status-codes";

// Configs
import stringsConfig from "../configs/strings.config";

// Utils
import PlatformError from "./error.util";

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

    if (envVariable === undefined) {
        throw new PlatformError(
            stringsConfig.ERRORS.SOMETHING_WENT_WRONG,
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }

    return envVariable;
};

export default getEnvVariable;
