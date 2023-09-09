// Controllers
import indexControllers from "../controllers/index.controllers";

// Routers
import unauthenticatedRouter from "../routers/unauthenticated.router";

// Unauthenticated Routes
unauthenticatedRouter.get("/", indexControllers.get);

const indexRoutes = {
    unauthenticatedRouter,
};

export default indexRoutes;
