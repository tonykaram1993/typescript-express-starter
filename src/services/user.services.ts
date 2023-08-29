import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";

// Models
import UserModel, { User } from "../models/User.model";

// Configs
import stringsConfig from "../configs/strings.config";
import settingsConfig from "../configs/settings.config";

// Utils
import PlatformError from "../utils/error.util";

/**
 * The function `getUserByEmail` retrieves a user from the database based on their email address.
 *
 * @param {string} email - The email parameter is a string that represents the email address of the
 * user you want to find.
 *
 * @returns the user object that is found in the database based on the provided email.
 */
const getUserByEmail = async (email: string) => {
    const user = await UserModel.findOne({
        email,
    });

    if (user === null) {
        return false;
    }

    return user.toObject();
};

/**
 * The function `getUserByRefreshToken` retrieves a user from the database based on their refresh
 * token.
 *
 * @param {string} refreshToken - The `refreshToken` parameter is a string that represents a unique
 * token associated with a user. It is typically used for authentication purposes to obtain a new
 * access token when the current one expires.
 *
 * @returns the user object that is found in the database based on the provided refresh token.
 */
const getUserByRefreshToken = async (refreshToken: string) => {
    const user = await UserModel.findOne({
        refreshToken,
    });

    if (user === null) {
        return false;
    }

    return user.toObject();
};

/**
 * The function `verifyUserByEmail` verifies a user by their email and throws an error if the user is
 * not found.
 *
 * @param {string} email - The `email` parameter is a string that represents the email address of the
 * user you want to verify.
 *
 * @returns The function `verifyUserByEmail` returns the user object if it exists.
 */
const verifyUserByEmail = async (email: string) => {
    const user = await getUserByEmail(email);

    if (user === false) {
        throw new PlatformError(
            stringsConfig.ERRORS.EMAIL_PASSWORD_NOT_FOUND,
            StatusCodes.NOT_FOUND
        );
    }

    return user;
};

/**
 * The function updates the last login date of a user in the database and returns the updated user
 * object.
 *
 * @param {User} user - The `user` parameter is an object of type `User` which represents a user in the
 * system.
 * @param {Date} lastLoginAt - The `lastLoginAt` parameter is a `Date` object that represents the date
 * and time of the user's last login.
 *
 * @returns The function `updateUserLastLoginAt` returns either `false` if the user was not found and
 * updated, or it returns the updated user object as a plain JavaScript object.
 */
const updateUserLastLoginAt = async (user: User, lastLoginAt: Date) => {
    const updatedUser = await UserModel.findOneAndUpdate(
        { email: user.email },
        { lastLoginAt }
    );

    if (updatedUser === null) {
        throw new PlatformError(
            stringsConfig.ERRORS.NOT_FOUND_USER,
            StatusCodes.NOT_FOUND
        );
    }

    return updatedUser.toObject();
};

/**
 * The function verifies a user by their refresh token and throws an error if the user is not found.
 *
 * @param {string} refreshToken - A string representing the refresh token of the user.
 *
 * @returns the user object if it exists.
 */
const verifyUserByRefreshToken = async (refreshToken: string) => {
    const user = await getUserByRefreshToken(refreshToken);

    if (user === false) {
        throw new PlatformError(
            stringsConfig.ERRORS.REFRESH_TOKEN_NOT_FOUND_OR_EXPIRED,
            StatusCodes.NOT_FOUND
        );
    }

    return user;
};

/**
 * The function checks if an email is already associated with an existing user and throws an error if
 * it does.
 *
 * @param {string} email - The `email` parameter is a string that represents the email address to be
 * checked for uniqueness.
 */
const verifyEmailUniqueness = async (email: string) => {
    const user = await getUserByEmail(email);

    if (user) {
        throw new PlatformError(
            stringsConfig.ERRORS.EMAIL_ALREADY_EXISTS,
            StatusCodes.NOT_FOUND
        );
    }
};

/**
 * The function `addUser` creates a new user with a unique email, encrypts the password, and returns
 * the created user.
 *
 * @param {string} email - The email parameter is a string that represents the email address of the
 * user you want to add.
 * @param {string} password - The `password` parameter is a string that represents the user's password.
 *
 * @returns The function `addUser` is returning a Promise that resolves to a user object.
 */
const addUser = async (email: string, password: string) => {
    await verifyEmailUniqueness(email);

    const salt = bcrypt.genSaltSync(settingsConfig.AUTHENTICATION.SALT_ROUNDS);
    const hash = bcrypt.hashSync(password, salt);

    const user = await UserModel.create({ email, passwordHash: hash, salt });

    return user.toObject();
};

export default {
    getUserByEmail,
    getUserByRefreshToken,
    verifyUserByEmail,
    updateUserLastLoginAt,
    verifyUserByRefreshToken,
    verifyEmailUniqueness,
    addUser,
};
