import indexController from "../controllers/index.controllers";
import router from "../routers/unauthenticated.routers";

router.get("/", indexController.get);

export default router;
