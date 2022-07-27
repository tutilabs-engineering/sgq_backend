import { createReportStartupController } from "@modules/startup/useCases/createReportStartup/CreateReportStartupController";
import { fillReportStartupController } from "@modules/startup/useCases/fillReportStartup/FillReportStartupController";
import findDataByCodeOpController from "@modules/startup/useCases/findDataByCodeOp";
import { findReportStartupByIdController } from "@modules/startup/useCases/findReportStartupById/FindReportStartupByIdController";
import { insertOpInStartupController } from "@modules/startup/useCases/insertOpInStartup/InsertOpInStartupController";
import { listAllStartupsController } from "@modules/startup/useCases/listAllStartups/ListAllStartupsController";
import { listDefaultQuestionsController } from "@modules/startup/useCases/listDefaultQuestions/ListDefaultQuestionsController";
import { listMachinesController } from "@modules/startup/useCases/listMachines/ListMachinesController";
import { listMoldsController } from "@modules/startup/useCases/listMolds/ListMoldsController";
import { listStartupCountByStatusController } from "@modules/startup/useCases/listStartupCountByStatus/ListStartupCountByStatusController";
import { listStartupFilterCountController } from "@modules/startup/useCases/listStartupFilterCount/ListStartupFilterCountController";
import { Router } from "express";
// import { ListDefaultQuestionByStartupId } from "firstTest/listDefaultQuestions";
import multer from "multer";
import { EnsureAuthenticated } from "@shared/middlewares/ensureAuthenticate";
import { EnsureFills } from "@shared/middlewares/ensureFills";
import uploadConfig from "@shared/middlewares/uploadFileOfQuestionsMiddleware";

const startupsRoutes = Router();

const questionsUploads = multer(
  uploadConfig.upload("../uploads/startup/questionsUploads"),
);

// startupsRoutes.use(EnsureAuthenticated);
startupsRoutes.get("/dataOp/:code_op", (request, response) => {
  return findDataByCodeOpController().handle(request, response);
});
startupsRoutes.get("/defaultQuestions", listDefaultQuestionsController.handle);
startupsRoutes.post("/", EnsureFills, createReportStartupController.handle);
startupsRoutes.get("/", listAllStartupsController.handle);
startupsRoutes.get("/:id_startup", findReportStartupByIdController.handle);
startupsRoutes.post(
  "/fill/:id_startup",
  EnsureFills,
  questionsUploads.any(), // archives upload in specific and default questions
  fillReportStartupController.handle,
);
startupsRoutes.get(
  "/management/count",
  listStartupCountByStatusController.handle,
);
startupsRoutes.post(
  "/management/count_filter",
  listStartupFilterCountController.handle,
);
startupsRoutes.post("/addOp/:id_startup", insertOpInStartupController.handle);
startupsRoutes.get("/machines/list", listMachinesController.handle);
startupsRoutes.get("/molds/list", listMoldsController.handle);

export { startupsRoutes };
