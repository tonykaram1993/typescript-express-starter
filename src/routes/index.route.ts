// Controllers
import indexControllers from "../controllers/index.controllers";

// Routers
import router from "../routers/unauthenticated.router";

router.get("/", indexControllers.get);

export default router;
