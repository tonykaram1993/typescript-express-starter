import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

const get: RequestHandler = async (request, response) => {
  response.status(StatusCodes.NO_CONTENT).end();
};

export default {
  get,
};
