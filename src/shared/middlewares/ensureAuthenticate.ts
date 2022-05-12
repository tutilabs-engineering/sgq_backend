import { UsersRepositoryInPrisma } from "@modules/accounts/repositories/implementations/UsersRepositoryInPrisma";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";

interface IPayLoad {
  sub: string;
}

export async function EnsureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, process.env.SECRET) as IPayLoad;

    const usersRepositoryInPrisma = new UsersRepositoryInPrisma();

    const user = await usersRepositoryInPrisma.findById(sub);

    if (!user || !user.is_enabled) {
      return response.end();
    }

    request.user = {
      id: sub,
    };

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
