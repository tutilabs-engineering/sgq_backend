import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteVariableUseCase } from "./DeleteVariableUseCase";

class DeleteVariableController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteVariableUseCase = container.resolve(DeleteVariableUseCase);
    await deleteVariableUseCase.execute(id);
    return response.status(200).json({ message: "Deleted" });
  }
}

export { DeleteVariableController };
