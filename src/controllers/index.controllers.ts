import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

// Utils
import userServices from "../services/user.services";

const getUser = async (request: Request, response: Response) => {
  const { email = "testing@email.com" } = request.body;

  const user = userServices.getUserByEmail(email);

  response.status(StatusCodes.OK).json(user);
};

const get = async (request: Request, response: Response) => {
  response.status(StatusCodes.NO_CONTENT).end();
};

export default {
  get,
  getUser,
};
