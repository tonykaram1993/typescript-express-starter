import { RequestHandler } from "express";

const tryCatch =
  (callback: RequestHandler): RequestHandler =>
  (request, response, next) =>
    Promise.resolve(callback(request, response, next)).catch(next);

export default tryCatch;
