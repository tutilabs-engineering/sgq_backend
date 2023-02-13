import { Request, Response } from "express";
import { container } from "tsyringe";
import { ChangeStatusAttributeUseCase } from "./ChangeStatusAttributeUseCase";

class ChangeStatusAttributeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, state } = request.body;
    const changeStatusAttributeUseCase = container.resolve(
      ChangeStatusAttributeUseCase,
    );
    await changeStatusAttributeUseCase.execute(id, state);
    return response.status(200).json({ message: "updated" });
  }
}

export { ChangeStatusAttributeController };
