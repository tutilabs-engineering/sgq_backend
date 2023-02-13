import { UsersRepositoryInPrisma } from "@modules/accounts/repositories/implementations/UsersRepositoryInPrisma";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";

interface IPayLoad {
  sub: string;
}

export async function ValidateToken(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader || authHeader === "Bearer undefined") {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  const { sub } = verify(token, process.env.SECRET) as IPayLoad;

  try {
    const usersRepositoryInPrisma = new UsersRepositoryInPrisma();
    const user = await usersRepositoryInPrisma.findById(sub);

    if (!user || user.is_enabled === false) {
      return response.end();
    }
    next();
    return response.json("valid token");
  } catch (error) {
    throw new AppError("Invalid token!", 401);
  }
}
