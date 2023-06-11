// Controllers
import indexControllers from "../controllers/index.controllers";

// Middlewares
import validateRequestMiddleware from "../middlewares/validateRequest.middleware";

// Routers
import router from "../routers/unauthenticated.router";

// Utils
import tryCatch from "../utils/tryCatch.util";

// Schemas
import indexPostSchema from "../validation/schemas/index/post.schema";

router.get("/", indexControllers.get);

router.post(
  "/",
  tryCatch(validateRequestMiddleware(indexPostSchema)),
  tryCatch(indexControllers.post)
);

export default router;
