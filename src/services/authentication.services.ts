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
import makeError from "../utils/error.util";
import logger from "../utils/logger.util";

// Configs
import settingsConfig from "../configs/settings.config";
import stringsConfig from "../configs/strings.config";

const getTokenFromAuthorizationHeader = (authorizationHeader: string) => {
  const [, token] = authorizationHeader.split("Bearer ");

  return token;
};

const getSafeUserData = (user: User): DecodedJwtToken =>
  lodash.omit(user, userPropertiesToOmitInTokens);

const generateJwtToken = (user: User) => {
  const JWT_TOKEN_SECRET = getEnvVariable("JWT_TOKEN_SECRET");

  const data = getSafeUserData(user);

  const jwtToken = jsonwebtoken.sign(data, JWT_TOKEN_SECRET, {
    expiresIn: settingsConfig.AUTHENTICATION.jwtTokenExpiry,
  });

  return jwtToken;
};

const generateRefreshToken = async (user: User) => {
  const JWT_REFRESH_TOKEN_SECRET = getEnvVariable("JWT_REFRESH_TOKEN_SECRET");

  const data = {
    ...getSafeUserData(user),
    createdAt: Date.now(),
  };

  const refreshToken = jsonwebtoken.sign(data, JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: settingsConfig.AUTHENTICATION.refreshTokenExpiry,
  });

  await UserModel.findOneAndUpdate({ email: user.email }, { refreshToken });

  return refreshToken;
};

const deleteRefreshToken = async (user: DecodedJwtToken) => {
  await UserModel.findOneAndUpdate(
    { email: user.email },
    {
      $unset: {
        refreshToken: "",
      },
    }
  );
};

const decodeToken = (token: string) => {
  const JWT_TOKEN_SECRET = getEnvVariable("JWT_TOKEN_SECRET");

  const decodedToken = jsonwebtoken.verify(
    token,
    JWT_TOKEN_SECRET
  ) as DecodedJwtToken;

  return decodedToken;
};

const checkUserPassword = (user: User, password: string) => {
  const isPasswordCorrect = bcrypt.compareSync(password, user.passwordHash);

  if (!isPasswordCorrect) {
    logger.error(
      `User with email ${user.email} has entered an incorrect password`
    );
    throw makeError(
      StatusCodes.NOT_FOUND,
      stringsConfig.ERRORS.EMAIL_PASSWORD_NOT_FOUND
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
