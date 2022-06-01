import { UsersRepositoryInPrisma } from "@modules/accounts/repositories/implementations/UsersRepositoryInPrisma";
import { NextFunction, Request, Response } from "express";

export async function EnsureFills(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const {
    user: { id },
  } = request;

  const usersRepositoryInPrisma = new UsersRepositoryInPrisma();

  const user = await usersRepositoryInPrisma.findById(id);

  if (
    user.role.id === 1 ||
    user.role.description === "admin" ||
    user.role.id === 2 ||
    user.role.description === "gestor" ||
    user.role.id === 3 ||
    user.role.description === "analista" ||
    user.role.id === 4 ||
    user.role.description === "metrologista" ||
    user.role.id === 5 ||
    user.role.description === "inspetor"
  ) {
    return next();
  }

  return response
    .status(401)
    .json({
      message:
        "Access denied, must be an 'inspector', 'metrologist' or 'analyst'",
    })
    .end();
}
