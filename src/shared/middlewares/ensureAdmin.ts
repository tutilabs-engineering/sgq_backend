import { UsersRepositoryInPrisma } from "@modules/accounts/repositories/implementations/UsersRepositoryInPrisma";
import { NextFunction, Request, Response } from "express";

export async function EnsureAdmin(
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
    user.role.description === "gestor"
  ) {
    return next();
  }

  return response.status(401).json({ message: "Access denied" }).end();
}
