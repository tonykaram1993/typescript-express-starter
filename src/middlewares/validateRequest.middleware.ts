import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { AnyZodObject } from "zod";

// Configs
import stringsConfig from "../configs/strings.config";

const validateRequestMiddleware =
  (schema: AnyZodObject): RequestHandler =>
  (request, response, next) => {
    const { body, query, params } = request;

    const validation = schema.safeParse({ body, query, params });

    if (!validation.success) {
      return response.sendStatus(StatusCodes.BAD_REQUEST).json({
        message: stringsConfig.ERRORS.VALIDATION,
        errors: validation.error,
      });
    }

    request.validatedData = validation.data;

    next();
  };

export default validateRequestMiddleware;
