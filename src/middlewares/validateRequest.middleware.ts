import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { AnyZodObject } from "zod";

// Configs
import stringsConfig from "../configs/strings.config";

/**
 * The `validateRequestMiddleware` function is a TypeScript middleware that validates the request body,
 * query parameters, and route parameters against a given schema and returns an error response if the
 * validation fails.
 *
 * In the code snippet, if the validation is not successful, a response with a status code of
 * 400 (Bad Request) is returned. The response includes a JSON object with a message and errors
 * property. If the validation is successful, the `next()` function is called to proceed to the next
 * middleware or route handler.
 *
 * @param {AnyZodObject} schema - The `schema` parameter is an object that represents the validation
 * rules for the request data. It is created using the Zod library, which provides a way to define and
 * validate data schemas in TypeScript. The `schema` object is used to validate the`body`, `query`, and
 * `params`.
 */
const validateRequestMiddleware =
    (schema: AnyZodObject): RequestHandler =>
    (request, response, next) => {
        const { body, query, params } = request;

        const validation = schema.safeParse({ body, query, params });

        if (!validation.success) {
            return response.status(StatusCodes.BAD_REQUEST).json({
                message: stringsConfig.ERRORS.VALIDATION,
                errors: validation.error,
            });
        }

        request.validatedData = validation.data;

        next();
    };

export default validateRequestMiddleware;
