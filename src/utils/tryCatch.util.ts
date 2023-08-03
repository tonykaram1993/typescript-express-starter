import { RequestHandler } from "express";

/**
 * The `tryCatch` function is a TypeScript higher order function that wraps a callback function and handles any
 * errors that occur within it.
 *
 * @param {RequestHandler} callback - The `callback` parameter is a function that takes in three
 * parameters: `request`, `response`, and `next`. It is a request handler function or a middleware that will be
 * executed when a request is made to the server.
 */
const tryCatch =
  (callback: RequestHandler): RequestHandler =>
  (request, response, next) =>
    Promise.resolve(callback(request, response, next)).catch(next);

export default tryCatch;
