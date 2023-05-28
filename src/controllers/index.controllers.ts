import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

// Utils
import userServices from "../services/user.services";

const getUser = async (req: Request, res: Response) => {
  const { email = "testing@email.com" } = req.body;

  const user = userServices.getUserByEmail(email);

  res.status(StatusCodes.OK).json(user);
};

const get = async (req: Request, res: Response) => {
  res.status(StatusCodes.NO_CONTENT).end();
};

export default {
  get,
  getUser,
};
