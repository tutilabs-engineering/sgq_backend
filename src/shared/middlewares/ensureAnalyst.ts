import { UsersRepositoryInPrisma } from "@modules/accounts/repositories/implementations/UsersRepositoryInPrisma";
import { NextFunction, Request, Response } from "express";

export async function EnsureAnalyst(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const {
    user: { id },
  } = request;

  const usersRepositoryInPrisma = new UsersRepositoryInPrisma();

  const user = await usersRepositoryInPrisma.findById(id);

  if (user.role.id === 3 || user.role.description === "analista") {
    return next();
  }

  return response
    .status(401)
    .json({ message: "Access denied, must be an analyst" })
    .end();
}
