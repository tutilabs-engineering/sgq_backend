import { Request, Response } from "express";
import { container } from "tsyringe";
import { ChangeStatusVariableUseCase } from "./ChangeStatusVariableUseCase";

class ChangeStatusVariableController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, state } = request.body;
    const changeStatusVariableUseCase = container.resolve(
      ChangeStatusVariableUseCase,
    );
    await changeStatusVariableUseCase.execute(id, state);
    return response.status(200).json({ message: "updated" });
  }
}

export { ChangeStatusVariableController };
