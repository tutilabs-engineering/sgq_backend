import { filterQuestionsDisapprovedByDateController } from "@modules/dashboard/useCases/filterQuestionsDisapprovedByDate/FilterQuestionsDisapprovedByDateController";
import { ListDashBoardByFilterController } from "@modules/dashboard/useCases/listDashboardByFilter/ListDashBoardByFilterController";
import { ListDataToFilterController } from "@modules/dashboard/useCases/listDataToFilter/ListDataToFilterController";
import { listDefaultQuestionsDisapprovedController } from "@modules/dashboard/useCases/listDefaultQuestionsDisapproved/ListDefaultQuestionsDisapprovedController";
import { Router } from "express";
// import { EnsureAuthenticated } from "@shared/middlewares/ensureAuthenticate";

const dashboardRoutes = Router();

const listDashBoardByFilterController = new ListDashBoardByFilterController();
const listDataToFilterUseCase = new ListDataToFilterController();
// dashboardRoutes.use(EnsureAuthenticated);
dashboardRoutes.post("/time", listDashBoardByFilterController.handle);
dashboardRoutes.get("/data-filter", listDataToFilterUseCase.handle);
dashboardRoutes.get(
  "/defaultQuestionsDisapproved",
  listDefaultQuestionsDisapprovedController.handle,
);
dashboardRoutes.post(
  "/defaultQuestionsDisapproved/filter",
  filterQuestionsDisapprovedByDateController.handle,
);

export { dashboardRoutes };
