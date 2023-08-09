import { ChangeStatusVariableController } from "@modules/productAnalysis/useCases/changeStatusVariable/ChangeStatusVariableController";
import { CreateVariableController } from "@modules/productAnalysis/useCases/createVariable/CreateVariableController";
import { DeleteVariableController } from "@modules/productAnalysis/useCases/deleteVariable/DeleteVariableController";
import { ListVariablesByProductController } from "@modules/productAnalysis/useCases/listVariablesByProduct/ListVariablesByProductController";
import { Router } from "express";
import multer from "multer";
import path from "path"; 
import { EnsureAuthenticated } from "@shared/middlewares/ensureAuthenticate";
import { UploadFile } from "@shared/middlewares/MulterFileMiddleware";
import { UpdateVariableController } from "@modules/productAnalysis/useCases/updateVariable/UpdateVariableController";

const uploadFile = new UploadFile(path.resolve(process.cwd(), 'uploads','variables'));
const variableRoutes = Router();
const createVariableController = new CreateVariableController();
const listVariablesByProductController = new ListVariablesByProductController();
const deleteVariableController = new DeleteVariableController();
const changeStatusVariableController = new ChangeStatusVariableController();
const updateVariableController = new UpdateVariableController();
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
variableRoutes.put("/:id", upload.single("file"),updateVariableController.handle)
export { variableRoutes };
