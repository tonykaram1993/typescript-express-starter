import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Document } from "mongoose";

// Models
import UserModel, { User } from "../models/User.models";

// Utils
import logger from "../utils/logger";

const getUser = async () => {
  const user = (await UserModel.findOne({
    email: "asd3@asd3.com",
  })) as User & Document;

  logger.info(`🔥 - file: index.controllers.ts:16 - user %o`, user.email);
};

const get = async (req: Request, res: Response) => {
  res.status(StatusCodes.NO_CONTENT).end();
};

export default {
  get,
  getUser,
};
