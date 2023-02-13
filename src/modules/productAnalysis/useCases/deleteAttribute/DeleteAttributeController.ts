import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteAttributeUseCase } from "./DeleteAttributeUseCase";

class DeleteAttributeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteAttributeUseCase = container.resolve(DeleteAttributeUseCase);
    await deleteAttributeUseCase.execute(id);
    return response.status(200).json({ message: "Deleted" });
  }
}

export { DeleteAttributeController };
