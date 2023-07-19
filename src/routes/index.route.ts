// Controllers
import indexControllers from "../controllers/index.controllers";

// Middlewares
import validateRequestMiddleware from "../middlewares/validateRequest.middleware";

// Routers
import unauthenticatedRouter from "../routers/unauthenticated.router";

// Utils
import tryCatch from "../utils/tryCatch.util";

// Schemas
import indexPostSchema from "../validation/schemas/index/post.schema";

unauthenticatedRouter.get("/", indexControllers.get);

unauthenticatedRouter.post(
  "/",
  tryCatch(validateRequestMiddleware(indexPostSchema)),
  tryCatch(indexControllers.post)
);

export default unauthenticatedRouter;
