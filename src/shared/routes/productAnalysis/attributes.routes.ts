import { ChangeAttentionAttributeController } from "@modules/productAnalysis/useCases/changeAttentionAttribute/ChangeAttentionAttributeController";
import { ChangeStatusAttributeController } from "@modules/productAnalysis/useCases/changeStatusAttribute/ChangeStatusAttributeController";
import { CreateAttributeController } from "@modules/productAnalysis/useCases/createAttribute/CreateAttributeController";
import { DeleteAttributeController } from "@modules/productAnalysis/useCases/deleteAttribute/DeleteAttributeController";
import { ListAttributeByProductController } from "@modules/productAnalysis/useCases/listAttributeByProduct/ListAttributeByProductController";
import { Router } from "express";
import { EnsureAuthenticated } from "@shared/middlewares/ensureAuthenticate";

const attributeRoutes = Router();
const createAttributeController = new CreateAttributeController();
const listAttributeByProductController = new ListAttributeByProductController();
const deleteAttributeController = new DeleteAttributeController();
const changeAttentionAttributeController =
  new ChangeAttentionAttributeController();
const changeStatusAttributeController = new ChangeStatusAttributeController();

attributeRoutes.use(EnsureAuthenticated);
attributeRoutes.post("/", createAttributeController.handle);
attributeRoutes.get("/:code_product", listAttributeByProductController.handle);
attributeRoutes.delete("/:id", deleteAttributeController.handle);
attributeRoutes.patch("/attention", changeAttentionAttributeController.handle);
attributeRoutes.patch("/status", changeStatusAttributeController.handle);

export { attributeRoutes };
