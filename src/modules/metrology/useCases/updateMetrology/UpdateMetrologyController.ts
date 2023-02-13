import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateMetrologyUseCase } from "./UpdateMetrologyUseCase";

class UpdateMetrologyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { startup } = request.params;
    const { metrology, user } = request.body;
    const updateMetrologyUseCase = container.resolve(UpdateMetrologyUseCase);
    const messageMetrology = await updateMetrologyUseCase.execute({
      metrology,
      startup,
      user,
    });
    return response.status(200).json({ message: messageMetrology });
  }
}

export { UpdateMetrologyController };
