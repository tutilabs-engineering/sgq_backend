import { Request, Response } from "express";
import { container } from "tsyringe";
import { ChangeAttentionAttributeUseCase } from "./ChangeAttentionAttributeUseCase";

class ChangeAttentionAttributeController {
  async handle(request: Request, response: Response) {
    const { id, state } = request.body;
    const changeAttentionAttributeUseCase = container.resolve(
      ChangeAttentionAttributeUseCase,
    );
    await changeAttentionAttributeUseCase.execute(id, state);
    return response.status(200).json({ message: "Updated" });
  }
}

export { ChangeAttentionAttributeController };
