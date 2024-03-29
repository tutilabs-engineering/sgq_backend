import { Router } from "express";
import { authenticateRoutes } from "./accounts/authenticate.routes";
import { officeHoursRoutes } from "./accounts/officeHours.routes";
import { rolesRoutes } from "./accounts/roles.routes";
import { unitsRoutes } from "./accounts/units.routes.routes";
import { usersRoutes } from "./accounts/users.routes";
import { dashboardRoutes } from "./dashboard/dashboard.routes";
import { metrologyRoutes } from "./metrology/metrology.routes";
import { attributeRoutes } from "./productAnalysis/attributes.routes";
import { ProductRoutes } from "./productAnalysis/product.routes";
import { sapProductRoutes } from "./productAnalysis/sapproduct.routes";
import { variableRoutes } from "./productAnalysis/variables.routes";
import { startupsRoutes } from "./startup/startups.routes";
import { closeStartupsRoutes } from "./closeStartup/closeStartup.routes";
import { pointToPointRouter } from "./productAnalysis/pointToPoint.routes";

const router = Router();
router.use(authenticateRoutes);
router.use("/roles", rolesRoutes);
router.use("/units", unitsRoutes);
router.use("/officeHours", officeHoursRoutes);
router.use("/users", usersRoutes);
router.use("/variable", variableRoutes);
router.use("/attribute", attributeRoutes);
router.use("/metrology", metrologyRoutes);
router.use("/product/sap", sapProductRoutes);
router.use("/product-internal", ProductRoutes);
router.use("/reportStartup", startupsRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/closeStartup",closeStartupsRoutes)
router.use("/pointToPoint",pointToPointRouter)

export { router };
