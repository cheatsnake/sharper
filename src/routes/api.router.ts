import { ImageController } from "./../controllers/image.controller";
import { Router } from "express";

const imageController = new ImageController();
const apiRouter = Router();

apiRouter.post("/metadata", imageController.getMetadata);
apiRouter.post("/resize", imageController.resizeImage);
apiRouter.post("/compress", imageController.compressImage);
apiRouter.post("/crop", imageController.cropImage);
apiRouter.post("/grayscale", imageController.grayscaleImage);
apiRouter.post("/blur", imageController.blurImage);
apiRouter.post("/compose", imageController.composeImages);
apiRouter.post("/text", imageController.addTextToImage);

export default apiRouter;
