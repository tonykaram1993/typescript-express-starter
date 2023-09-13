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
import envVariable from "../utils/envVariable.util";
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

    if (token === undefined || token.trim() === "") {
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
    const JWT_TOKEN_SECRET = envVariable.getSingle(
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
    const JWT_REFRESH_TOKEN_SECRET = envVariable.getSingle(
        globalsConfig.ENV_VARIABLES.JWT_REFRESH_TOKEN_SECRET
    );

    const data = {
        ...getSafeUserData(user),
        createdAt: Date.now(),
    };

    const refreshToken = jsonwebtoken.sign(data, JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: settingsConfig.AUTHENTICATION.JWT_REFRESH_TOKEN_EXPIRY,
    });

    UserModel.updateOne({ email: user.email }, { refreshToken });

    return refreshToken;
};

/**
 * The function generates a reset password token using the provided email and stores it in the database for
 *  the corresponding user.
 *
 * @param {string} email - The `email` parameter is a string that represents the email address of the user
 *  for whom the reset password token is being generated.
 *
 * @returns the resetPasswordToken.
 */
const generateResetPasswordToken = async (email: string) => {
    const JWT_RESET_PASSWORD_TOKEN_SECRET = envVariable.getSingle(
        globalsConfig.ENV_VARIABLES.JWT_RESET_PASSWORD_TOKEN_SECRET
    );

    const data = {
        email,
    };

    const resetPasswordToken = jsonwebtoken.sign(
        data,
        JWT_RESET_PASSWORD_TOKEN_SECRET,
        {
            expiresIn:
                settingsConfig.AUTHENTICATION.JWT_RESET_PASSWORD_TOKEN_EXPIRY,
        }
    );

    UserModel.updateOne({ email }, { resetPasswordToken });

    return resetPasswordToken;
};

/**
 * The function `deleteRefreshToken` deletes the refresh token from the user document in the database.
 *
 * @param {User} user - The `user` parameter is an object of type `User`.
 */
const deleteRefreshToken = async (user: User) =>
    UserModel.findOneAndUpdate(
        { email: user.email },
        {
            $unset: {
                refreshToken: "",
            },
            $set: {
                isForcedToLogin: true,
            },
        }
    );

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
    const JWT_TOKEN_SECRET = envVariable.getSingle(
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
        const { incorrectPasswordAttempts } = user;

        if (
            incorrectPasswordAttempts >=
            settingsConfig.AUTHENTICATION.PASSWORD_INCORRECT_ATTEMPTS_LIMIT
        ) {
            throw new PlatformError(
                stringsConfig.ERRORS.ACCOUNT_DISABLED_TOO_MANY_ATTEMPTS,
                StatusCodes.UNAUTHORIZED
            );
        }

        UserModel.updateOne(
            { email: user.email },
            { incorrectPasswordAttempts: user.incorrectPasswordAttempts + 1 }
        );

        throw new PlatformError(
            stringsConfig.ERRORS.EMAIL_PASSWORD_NOT_FOUND,
            StatusCodes.NOT_FOUND
        );
    }
};

/**
 * The function encrypts a user's password using bcrypt and returns the salt and hash.
 *
 * @param {string} password - The `password` parameter is a string that represents the user's password that
 *  needs to be encrypted.
 *
 * @returns The function `encryptUserPassword` returns an object with two properties: `salt` and `hash`.
 */
const encryptUserPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(settingsConfig.AUTHENTICATION.SALT_ROUNDS);
    const hash = bcrypt.hashSync(password, salt);

    return {
        salt,
        hash,
    };
};

const forceUserToLogin = async (email: string) =>
    UserModel.findOneAndUpdate({ email }, { isForcedToLogin: true });

export default {
    getTokenFromAuthorizationHeader,
    decodeToken,
    checkUserPassword,
    generateJwtToken,
    generateRefreshToken,
    generateResetPasswordToken,
    deleteRefreshToken,
    getSafeUserData,
    encryptUserPassword,
    forceUserToLogin,
};
