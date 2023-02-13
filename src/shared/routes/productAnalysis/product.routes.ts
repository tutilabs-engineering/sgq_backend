import { ListProductController } from "@modules/productAnalysis/useCases/listProduct/ListProductController";
import { Router } from "express";
import { EnsureAuthenticated } from "@shared/middlewares/ensureAuthenticate";

const ProductRoutes = Router();

const listProductController = new ListProductController();

ProductRoutes.use(EnsureAuthenticated);
ProductRoutes.get("/", listProductController.handle);

export { ProductRoutes };
