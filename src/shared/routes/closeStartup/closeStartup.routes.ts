import { closeStartupByOpController } from "@modules/startup/useCases/closeStartup/CloseStartupController";
import { Router } from "express";


const closeStartupsRoutes = Router();

closeStartupsRoutes.put("/",closeStartupByOpController.handle)

export { closeStartupsRoutes };
