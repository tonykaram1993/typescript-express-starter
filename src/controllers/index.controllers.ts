import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

// Utils
import logger from "../utils/logger.util";

// Services
import userServices from "../services/user.services";

// Types
import indexPostType from "../validation/types/index/post.type";

const getUser: RequestHandler = async (request, response) => {
  const { email = "testing@email.com" } = request.body;

  const user = userServices.getUserByEmail(email);

  response.status(StatusCodes.OK).json(user);
};

const get: RequestHandler = async (request, response) => {
  response.status(StatusCodes.NO_CONTENT).end();
};

const post: RequestHandler = async (request, response) => {
  const { body, query, params }: indexPostType = request.validatedData;

  logger.info("body", body);
  logger.info("query", query);
  logger.info("params", params);

  response.sendStatus(StatusCodes.CREATED).json({ body, params, query });
};

export default {
  get,
  post,
  getUser,
};
