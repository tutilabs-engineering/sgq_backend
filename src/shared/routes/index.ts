import { Router } from "express";
import { authenticateRoutes } from "./accounts/authenticate.routes";
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

const router = Router();
router.use(authenticateRoutes);
router.use("/roles", rolesRoutes);
router.use("/units", unitsRoutes);
router.use("/users", usersRoutes);
router.use("/variable", variableRoutes);
router.use("/attribute", attributeRoutes);
router.use("/metrology", metrologyRoutes);
router.use("/product/sap", sapProductRoutes);
router.use("/product-internal", ProductRoutes);
router.use("/reportStartup", startupsRoutes);
router.use("/dashboard", dashboardRoutes);

export { router };
