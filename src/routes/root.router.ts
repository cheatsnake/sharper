import RootController from "./../controllers/root.controller";
import { Router } from "express";

const rootRouter = Router();
const rootController = new RootController();

rootRouter.get("/*", rootController.redirectToDocs);

export default rootRouter;
