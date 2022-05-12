import { listUnitsController } from "@modules/accounts/useCases/listUnits/ListUnitsController";
import { Router } from "express";
import { EnsureAuthenticated } from "@shared/middlewares/ensureAuthenticate";

const unitsRoutes = Router();

unitsRoutes.use(EnsureAuthenticated);
unitsRoutes.get("/", listUnitsController.handle);

export { unitsRoutes };
