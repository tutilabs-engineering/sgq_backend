import { listOfficeHoursController } from "@modules/accounts/useCases/listOfficeHours/ListOfficeHoursController";
import { Router } from "express";
import { EnsureAuthenticated } from "@shared/middlewares/ensureAuthenticate";

const officeHoursRoutes = Router();

officeHoursRoutes.use(EnsureAuthenticated);
officeHoursRoutes.get("/", listOfficeHoursController.handle);

export { officeHoursRoutes };
