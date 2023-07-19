import { StatusCodes } from "http-status-codes";

// Configs
import stringsConfig from "../configs/strings.config";
import { RequestHandler } from "express";

// Services
import authenticationServices from "../services/authentication.services";

const authenticationMiddleware: RequestHandler = (request, response, next) => {
  const { authorization: authorizationHeader } = request.headers;

  if (authorizationHeader === undefined) {
    return response.status(StatusCodes.UNAUTHORIZED).json({
      message: stringsConfig.ERRORS.UNAUTHORIZED,
    });
  }

  const authorizationToken =
    authenticationServices.getTokenFromAuthorizationHeader(authorizationHeader);

  const decodedAuthorizationToken =
    authenticationServices.decodeToken(authorizationToken);

  request.user = decodedAuthorizationToken;

  next();
};

export default authenticationMiddleware;
