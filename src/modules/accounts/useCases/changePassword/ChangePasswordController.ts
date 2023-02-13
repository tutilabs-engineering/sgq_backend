import { Request, Response } from "express";
import { container } from "tsyringe";
import { ChangePasswordUseCase } from "./ChangePasswordUseCase";

class ChangePasswordUController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { currentPassword, newPassword } = request.body;

    const changePasswordUseCase = container.resolve(ChangePasswordUseCase);

    await changePasswordUseCase.execute({ id, currentPassword, newPassword });

    return response.status(200).json({ message: "Password Updated" });
  }
}

export { ChangePasswordUController };
