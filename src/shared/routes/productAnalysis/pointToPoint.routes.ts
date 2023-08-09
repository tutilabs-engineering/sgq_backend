import { CreatePointToPointController } from "@modules/productAnalysis/useCases/createPointToPoint/CreatePointToPointController";
import { UploadFile } from "@shared/middlewares/MulterFileMiddleware";
import { EnsureAnalyst } from "@shared/middlewares/ensureAnalyst";
import { EnsureAuthenticated } from "@shared/middlewares/ensureAuthenticate";
import { Router } from "express";
import multer from "multer";
import path from "path"; 

const createPointToPointController = new CreatePointToPointController();
const pointToPointRouter = Router()
const uploadFile = new UploadFile(path.resolve(process.cwd(), 'uploads','pointToPoint'));
const upload = multer(uploadFile.getConfig)

pointToPointRouter.use(EnsureAuthenticated)
pointToPointRouter.use(EnsureAnalyst)

pointToPointRouter.post("/",upload.single("file"),createPointToPointController.handle)

export { pointToPointRouter }