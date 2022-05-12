import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRoleUseCase } from "./CreateRoleUseCase";

class CreateRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { description } = request.body;
    const createRoleUseCase = container.resolve(CreateRoleUseCase);

    await createRoleUseCase.execute({ description });
    return response.status(201).json({ message: "Created" });
  }
}

export { CreateRoleController };
