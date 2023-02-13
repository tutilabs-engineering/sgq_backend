import findProductByCodeController from "@modules/productAnalysis/useCases/findProductByCode/";
import { Router } from "express";
import { EnsureAuthenticated } from "@shared/middlewares/ensureAuthenticate";

const sapProductRoutes = Router();

sapProductRoutes.use(EnsureAuthenticated);
sapProductRoutes.get("/:code_product", (request, response) => {
  return findProductByCodeController().handle(request, response);
});

export { sapProductRoutes };
