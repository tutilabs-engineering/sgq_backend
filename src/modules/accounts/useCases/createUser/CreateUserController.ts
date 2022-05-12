import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, cpf, register, fk_role, fk_unity } = request.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      email,
      cpf,
      register,
      fk_role,
      fk_unity,
    });
    return response.status(201).json({ message: "created" });
  }
}

export { CreateUserController };
