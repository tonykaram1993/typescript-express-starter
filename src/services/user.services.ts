import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";

// Models
import UserModel from "../models/User.model";

// Utils
import makeError from "../utils/error.util";

// Configs
import stringsConfig from "../configs/strings.config";
import settingsConfig from "../configs/settings.config";

const getUserByEmail = async (email: string) => {
  const user = await UserModel.findOne({
    email,
  });

  return user;
};

const getUserByRefreshToken = async (refreshToken: string) => {
  const user = await UserModel.findOne({
    refreshToken,
  });

  return user;
};

const verifyUserByEmail = async (email: string) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw makeError({
      status: StatusCodes.NOT_FOUND,
      message: stringsConfig.ERRORS.EMAIL_PASSWORD_NOT_FOUND,
      logMessage: `User with email ${email} not found`,
    });
  }

  return user;
};

const verifyUserByRefreshToken = async (refreshToken: string) => {
  const user = await getUserByRefreshToken(refreshToken);

  if (!user) {
    throw makeError({
      status: StatusCodes.NOT_FOUND,
      message: stringsConfig.ERRORS.REFRESH_TOKEN_NOT_FOUND_OR_EXPIRED,
      logMessage: `User with refresh token ${refreshToken} not found`,
    });
  }

  return user;
};

const checkEmailUniqueness = async (email: string) => {
  const user = await getUserByEmail(email);

  if (user) {
    throw makeError({
      status: StatusCodes.BAD_REQUEST,
      message: stringsConfig.ERRORS.EMAIL_ALREADY_EXISTS,
      logMessage: `User with email ${email} already exists`,
    });
  }
};

const addUser = async (email: string, password: string) => {
  const salt = bcrypt.genSaltSync(settingsConfig.AUTHENTICATION.saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  const user = await UserModel.create({ email, passwordHash: hash, salt });

  return user;
};

export default {
  getUserByEmail,
  getUserByRefreshToken,
  verifyUserByEmail,
  verifyUserByRefreshToken,
  checkEmailUniqueness,
  addUser,
};
