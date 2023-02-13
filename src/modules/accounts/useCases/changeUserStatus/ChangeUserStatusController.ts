import { Request, Response } from "express";
import { container } from "tsyringe";
import { ChangeUserStatusUseCase } from "./ChangeUserStatusUseCase";

class ChangeUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, is_enabled } = request.body;
    const changeUserStatusUseCase = container.resolve(ChangeUserStatusUseCase);

    await changeUserStatusUseCase.execute({ id, is_enabled });
    return response.status(200).json({ message: "Status updated" });
  }
}

export { ChangeUserController };
