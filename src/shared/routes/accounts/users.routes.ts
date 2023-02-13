import { ChangePasswordUController } from "@modules/accounts/useCases/changePassword/ChangePasswordController";
import { ChangeUserController } from "@modules/accounts/useCases/changeUserStatus/ChangeUserStatusController";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { DeleteUserController } from "@modules/accounts/useCases/deleteUser/DeleteUserController";
import { FindUserByIdController } from "@modules/accounts/useCases/findUserById/FindUserByIdController";
import { ListUsersController } from "@modules/accounts/useCases/listUsers/ListUsersController";
import { UpdateUserController } from "@modules/accounts/useCases/updateUser/UpdateUserController";
import { Router } from "express";
import { EnsureAdmin } from "@shared/middlewares/ensureAdmin";
import { EnsureAuthenticated } from "@shared/middlewares/ensureAuthenticate";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const deleteUserController = new DeleteUserController();
const changeUserController = new ChangeUserController();
const findUserByIdController = new FindUserByIdController();
const updateUserController = new UpdateUserController();
const changePasswordController = new ChangePasswordUController();

usersRoutes.use(EnsureAuthenticated);
usersRoutes.post("/", EnsureAdmin, createUserController.handle);
usersRoutes.get("/", EnsureAdmin, listUsersController.handle);
usersRoutes.get("/:id", findUserByIdController.handle);
usersRoutes.patch("/", EnsureAdmin, changeUserController.handle);
usersRoutes.put("/", EnsureAdmin, updateUserController.handle);
usersRoutes.delete("/:id", EnsureAdmin, deleteUserController.handle);
usersRoutes.patch("/changePassword/:id", changePasswordController.handle);
export { usersRoutes };
