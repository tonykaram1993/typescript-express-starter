import { StatusCodes } from "http-status-codes";

// Configs
import stringsConfig from "../configs/strings.config";

// Types
import EnvVariablesEnum from "../validation/types/EnvVariable.type";

// Helpers
import PlatformError from "./error.helper";

/**
 * The function `getSingle` retrieves the value of an environment variable and throws an error if it is undefined.
 *
 * @param {EnvVariablesEnum} name - The `name` parameter is of type `EnvVariablesEnum`. It is used to specify the name of
 * the environment variable that you want to retrieve the value for.
 *
 * @returns {function} The function `getSingle` returns the value of the environment variable specified by the `name` parameter.
 */
const getSingle = (name: EnvVariablesEnum) => {
    const envVariable = process.env[name];

    if (envVariable === undefined) {
        throw new PlatformError(
            stringsConfig.ERRORS.CANNOT_READ_ENV_VARIABLES,
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }

    return envVariable;
};

/**
 * The function `getMultiple` takes an array of environment variable names and returns an array of their corresponding
 * values.
 *
 * @param {EnvVariablesEnum[]} names - An array of `EnvVariablesEnum` values.
 */
const getMultiple = (names: EnvVariablesEnum[]) =>
    names.map((name) => getSingle(name));

export default {
    getSingle,
    getMultiple,
};
