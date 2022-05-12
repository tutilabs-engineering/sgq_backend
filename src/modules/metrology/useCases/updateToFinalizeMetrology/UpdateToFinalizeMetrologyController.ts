import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateToFinalizeMetrologyUseCase } from "./UpdateToFinalizeMetrologyUseCase";

class UpdateToFinalizeMetrologyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { startup } = request.params;
    const { user } = request.body;
    const updateToFinalizeMetrologyUseCase = container.resolve(
      UpdateToFinalizeMetrologyUseCase,
    );

    await updateToFinalizeMetrologyUseCase.execute({ startup, user });
    return response.status(200).json({ message: "Metrology Finish" });
  }
}

export { UpdateToFinalizeMetrologyController };
