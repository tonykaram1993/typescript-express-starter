import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";

// Models
import UserModel from "../models/User.model";

// Utils
import makeError from "../utils/error.util";
import logger from "../utils/logger.util";

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
    logger.error(`User with email ${email} not found`);
    throw makeError(
      StatusCodes.NOT_FOUND,
      stringsConfig.ERRORS.EMAIL_PASSWORD_NOT_FOUND
    );
  }

  return user;
};

const verifyUserByRefreshToken = async (refreshToken: string) => {
  const user = await getUserByRefreshToken(refreshToken);

  if (!user) {
    logger.error(`User with refresh token ${refreshToken} not found`);
    throw makeError(
      StatusCodes.NOT_FOUND,
      stringsConfig.ERRORS.REFRESH_TOKEN_NOT_FOUND_OR_EXPIRED
    );
  }

  return user;
};

const checkEmailUniqueness = async (email: string) => {
  const user = await getUserByEmail(email);

  if (user) {
    logger.error(`User with email ${email} already exists`);
    throw makeError(
      StatusCodes.BAD_REQUEST,
      stringsConfig.ERRORS.EMAIL_ALREADY_EXISTS
    );
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
