import { FindMetrologyByStartupController } from "@modules/metrology/useCases/findByMetrology/FindMetrologyByStartupController";
import { ListMetrologyHistoryController } from "@modules/metrology/useCases/listMetrologyHistory/ListMetrologyHistoryController";
import { ListMetrologySolicitationsController } from "@modules/metrology/useCases/listMetrologySolicitations/ListMetrologySolicitationsController";
import { UpdateMetrologyController } from "@modules/metrology/useCases/updateMetrology/UpdateMetrologyController";
import { UpdateToFinalizeMetrologyController } from "@modules/metrology/useCases/updateToFinalizeMetrology/UpdateToFinalizeMetrologyController";
import { UpdateToJoinInMetrologyController } from "@modules/metrology/useCases/updateToJoinInMetrology/UpdateToJoinInMetrologyController";
import { Router } from "express";
import { EnsureAuthenticated } from "@shared/middlewares/ensureAuthenticate";

const metrologyRoutes = Router();
const listMetrologySolicitationsController =
  new ListMetrologySolicitationsController();
const findMetrologyByStartupController = new FindMetrologyByStartupController();
const updateMetrologyController = new UpdateMetrologyController();
const updateToJoinInMetrologyController =
  new UpdateToJoinInMetrologyController();
const listMetrologyHistoryController = new ListMetrologyHistoryController();
const updateToFinalizeMetrologyController =
  new UpdateToFinalizeMetrologyController();

metrologyRoutes.use(EnsureAuthenticated);
metrologyRoutes.get(
  "/solicitations",
  listMetrologySolicitationsController.handle,
);
metrologyRoutes.get("/history", listMetrologyHistoryController.handle);
metrologyRoutes.get("/:startup", findMetrologyByStartupController.handle);
metrologyRoutes.put("/data/:startup", updateMetrologyController.handle);
metrologyRoutes.patch(
  "/join/:startup",
  updateToJoinInMetrologyController.handle,
);
metrologyRoutes.patch(
  "/finish/:startup",
  updateToFinalizeMetrologyController.handle,
);
export { metrologyRoutes };
