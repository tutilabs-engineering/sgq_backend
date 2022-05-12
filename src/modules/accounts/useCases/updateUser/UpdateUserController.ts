import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUseUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, name, email, cpf, register, fk_role, fk_unity } = request.body;
    const updateUserUseCase = container.resolve(UpdateUseUseCase);

    await updateUserUseCase.execute({
      id,
      name,
      email,
      cpf,
      register,
      fk_role,
      fk_unity,
    });
    return response.status(200).json({ message: "User updated" });
  }
}

export { UpdateUserController };
