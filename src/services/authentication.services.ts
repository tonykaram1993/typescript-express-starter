import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import lodash from "lodash";
import { StatusCodes } from "http-status-codes";

// Types
import DecodedJwtToken, {
    userPropertiesToOmitInTokens,
} from "../validation/types/authentication/DecodedJwtToken.type";

// Models
import UserModel, { User } from "../models/User.model";

// Utils
import getEnvVariable from "../utils/getEnvVariable.util";
import PlatformError from "../utils/error.util";

// Configs
import settingsConfig from "../configs/settings.config";
import stringsConfig from "../configs/strings.config";
import globalsConfig from "../configs/globals.config";

/**
 * The function `getTokenFromAuthorizationHeader` extracts the token from the authorization header and
 * throws an error if no token is found.
 *
 * @param {string} authorizationHeader - The `authorizationHeader` parameter is a string that
 * represents the value of the Authorization header in an HTTP request. This header is typically used
 * to send authentication credentials, such as a token, to the server. In this code snippet, the
 * function `getTokenFromAuthorizationHeader` extracts the token from the authorization
 *
 * @returns the token extracted from the authorization header.
 */
const getTokenFromAuthorizationHeader = (authorizationHeader: string) => {
    const [, token] = authorizationHeader.split("Bearer ");

    if (!token) {
        throw new PlatformError(
            stringsConfig.ERRORS.INVALID_AUTHENTICATION_HEADER,
            StatusCodes.UNAUTHORIZED
        );
    }

    return token;
};

/**
 * The function `getSafeUserData` takes a user object and returns a decoded JWT token with certain
 * properties omitted.
 *
 * @param {User} user - The `user` parameter is an object of type `User`.
 *
 * @returns a decoded JWT token.
 */
const getSafeUserData = (user: User): DecodedJwtToken =>
    lodash.omit(user, userPropertiesToOmitInTokens);

/**
 * The function generates a JWT token using a user's data and a secret key.
 *
 * @param {User} user - The `user` parameter is an object of type `User`.
 *
 * @returns The function `generateJwtToken` returns a JSON Web Token (JWT) token.
 */
const generateJwtToken = (user: User) => {
    const JWT_TOKEN_SECRET = getEnvVariable.single(
        globalsConfig.ENV_VARIABLES.JWT_TOKEN_SECRET
    );

    const data = getSafeUserData(user);

    const jwtToken = jsonwebtoken.sign(data, JWT_TOKEN_SECRET, {
        expiresIn: settingsConfig.AUTHENTICATION.JWT_TOKEN_EXPIRY,
    });

    return jwtToken;
};

/**
 * The function generates a refresh token for a user, signs it with a secret key, and updates the
 * user's refresh token in the database.
 *
 * @param {User} user - The `user` parameter is an object of type `User`.
 *
 * @returns the refresh token.
 */
const generateRefreshToken = async (user: User) => {
    const JWT_REFRESH_TOKEN_SECRET = getEnvVariable.single(
        globalsConfig.ENV_VARIABLES.JWT_REFRESH_TOKEN_SECRET
    );

    const data = {
        ...getSafeUserData(user),
        createdAt: Date.now(),
    };

    const refreshToken = jsonwebtoken.sign(data, JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: settingsConfig.AUTHENTICATION.REFRESH_TOKEN_EXPIRY,
    });

    UserModel.findOneAndUpdate({ email: user.email }, { refreshToken });

    return refreshToken;
};

/**
 * The function `deleteRefreshToken` deletes the refresh token from the user document in the database.
 *
 * @param {User} user - The `user` parameter is an object of type `User`.
 */
const deleteRefreshToken = async (user: User) => {
    await UserModel.findOneAndUpdate(
        { email: user.email },
        {
            $unset: {
                refreshToken: "",
            },
        }
    );
};

/**
 * The function `decodeToken` decodes a JSON Web Token (JWT) using a secret key and returns the decoded
 * token.
 *
 * @param {string} token - The `token` parameter is a string that represents a JSON Web Token (JWT).
 *
 * @returns The function `decodeToken` returns the decoded token as an object of type
 * `DecodedJwtToken`.
 */
const decodeToken = (token: string) => {
    const JWT_TOKEN_SECRET = getEnvVariable.single(
        globalsConfig.ENV_VARIABLES.JWT_TOKEN_SECRET
    );

    const decodedToken = jsonwebtoken.verify(
        token,
        JWT_TOKEN_SECRET
    ) as DecodedJwtToken;

    return decodedToken;
};

/**
 * The function checks if a user's password is correct and throws an error if it is not.
 *
 * @param {User} user - The `user` parameter is an object of type `User` which represents a user in the
 * system.
 * @param {string} password - The `password` parameter is a string that represents the password entered
 * by the user.
 */
const checkUserPassword = (user: User, password: string) => {
    const isPasswordCorrect = bcrypt.compareSync(password, user.passwordHash);

    if (!isPasswordCorrect) {
        throw new PlatformError(
            stringsConfig.ERRORS.EMAIL_PASSWORD_NOT_FOUND,
            StatusCodes.NOT_FOUND
        );
    }
};

export default {
    getTokenFromAuthorizationHeader,
    decodeToken,
    checkUserPassword,
    generateJwtToken,
    generateRefreshToken,
    deleteRefreshToken,
    getSafeUserData,
};
