import { ChangeStatusVariableController } from "@modules/productAnalysis/useCases/changeStatusVariable/ChangeStatusVariableController";
import { CreateVariableController } from "@modules/productAnalysis/useCases/createVariable/CreateVariableController";
import { DeleteVariableController } from "@modules/productAnalysis/useCases/deleteVariable/DeleteVariableController";
import { ListVariablesByProductController } from "@modules/productAnalysis/useCases/listVariablesByProduct/ListVariablesByProductController";
import { Router } from "express";
import multer from "multer";
import { EnsureAuthenticated } from "@shared/middlewares/ensureAuthenticate";
import { UploadFile } from "@shared/middlewares/MulterFileMiddleware";

const uploadFile = new UploadFile();
const variableRoutes = Router();
const createVariableController = new CreateVariableController();
const listVariablesByProductController = new ListVariablesByProductController();
const deleteVariableController = new DeleteVariableController();
const changeStatusVariableController = new ChangeStatusVariableController();
const upload = multer(uploadFile.getConfig);

// variableRoutes.use(EnsureAuthenticated);
variableRoutes.post(
  "/",
  upload.single("file"),
  createVariableController.handle,
);
variableRoutes.get("/:code_product", listVariablesByProductController.handle);
variableRoutes.delete("/:id", deleteVariableController.handle);
variableRoutes.patch("/status", changeStatusVariableController.handle);

export { variableRoutes };
