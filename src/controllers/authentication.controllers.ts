import { RequestHandler } from "express";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";

// Schemas
import authenticationSigninSchema from "../validation/schemas/authentication/signin.schema";
import authenticationSignupSchema from "../validation/schemas/authentication/signup.schema";
import authenticationRefreshSchema from "../validation/schemas/authentication/refresh.schema";

// Types
import DecodedJwtToken from "../validation/types/authentication/DecodedJwtToken.type";

// Services
import userServices from "../services/user.services";
import authenticationServices from "../services/authentication.services";

const signin: RequestHandler = async (request, response) => {
  const {
    body: { email, password },
  } = request as z.infer<typeof authenticationSigninSchema>;

  const user = await userServices.verifyUserByEmail(email);

  authenticationServices.checkUserPassword(user, password);

  const safeUser = authenticationServices.getSafeUserData(user);
  const jwtToken = authenticationServices.generateJwtToken(user);
  const refreshToken = await authenticationServices.generateRefreshToken(user);

  response
    .status(StatusCodes.OK)
    .json({ user: safeUser, jwtToken, refreshToken });
};

const signout: RequestHandler = async (request, response) => {
  const user = request.user as DecodedJwtToken;

  await authenticationServices.deleteRefreshToken(user);

  response.status(StatusCodes.NO_CONTENT);
};

const signup: RequestHandler = async (request, response) => {
  const {
    body: { email, password },
  } = request as z.infer<typeof authenticationSignupSchema>;

  userServices.checkEmailUniqueness(email);

  const user = await userServices.addUser(email, password);

  const safeUser = authenticationServices.getSafeUserData(user);
  const jwtToken = authenticationServices.generateJwtToken(user);
  const refreshToken = await authenticationServices.generateRefreshToken(user);

  response
    .status(StatusCodes.OK)
    .json({ user: safeUser, jwtToken, refreshToken });
};

const refresh: RequestHandler = async (request, response) => {
  const {
    body: { refreshToken },
  } = request as z.infer<typeof authenticationRefreshSchema>;

  const user = await userServices.verifyUserByRefreshToken(refreshToken);

  const safeUser = authenticationServices.getSafeUserData(user);
  const jwtToken = authenticationServices.generateJwtToken(user);
  const newRefreshToken = await authenticationServices.generateRefreshToken(
    user
  );

  response
    .status(StatusCodes.OK)
    .json({ user: safeUser, jwtToken, refreshToken: newRefreshToken });
};

export default {
  signin,
  signup,
  signout,
  refresh,
};
