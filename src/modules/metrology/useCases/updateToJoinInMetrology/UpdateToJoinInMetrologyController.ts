import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateToJoinInMetrologyUseCase } from "./UpdateToJoinInMetrologyUseCase";

class UpdateToJoinInMetrologyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request.body;
    const { startup } = request.params;
    const updateToJoinInMetrologyUseCase = container.resolve(
      UpdateToJoinInMetrologyUseCase,
    );
    await updateToJoinInMetrologyUseCase.execute({ startup, user });
    return response.status(200).json({ message: "Metrology joined" });
  }
}

export { UpdateToJoinInMetrologyController };
