import { CreateRoleController } from "@modules/accounts/useCases/createRole/CreateRoleController";
import { ListAllRolesController } from "@modules/accounts/useCases/listRoles/ListAllRolesController";
import { Router } from "express";
import { EnsureAdmin } from "@shared/middlewares/ensureAdmin";
import { EnsureAuthenticated } from "@shared/middlewares/ensureAuthenticate";

const rolesRoutes = Router();

const createRoleController = new CreateRoleController();
const listAllRolesController = new ListAllRolesController();

rolesRoutes.use(EnsureAuthenticated);
rolesRoutes.post("/", EnsureAdmin, createRoleController.handle);
rolesRoutes.get("/", listAllRolesController.handle);

export { rolesRoutes };
