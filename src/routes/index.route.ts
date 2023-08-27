// Controllers
import indexControllers from "../controllers/index.controllers";

// Routers
import unauthenticatedRouter from "../routers/unauthenticated.router";

unauthenticatedRouter.get("/", indexControllers.get);

export default unauthenticatedRouter;
