import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllRolesUseCase } from "./ListAllRolesUseCase";

class ListAllRolesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllRolesUseCase = container.resolve(ListAllRolesUseCase);
    const allRoles = await listAllRolesUseCase.execute();
    return response.status(200).json({ roles: allRoles });
  }
}

export { ListAllRolesController };
