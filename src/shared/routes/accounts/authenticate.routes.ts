import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { Router } from "express";
import { ValidateToken } from "@shared/middlewares/validateToken";
// import { ValidateToken } from "@shared/middlewares/validateToken";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.get("/validateToken", ValidateToken);
authenticateRoutes.post("/sessions", authenticateUserController.handle);

export { authenticateRoutes };
