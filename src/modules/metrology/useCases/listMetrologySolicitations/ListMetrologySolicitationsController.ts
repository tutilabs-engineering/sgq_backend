import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListMetrologySolicitationsUseCase } from "./ListMetrologySolicitationsUseCase";

class ListMetrologySolicitationsController {
  async handle(request: Request, response: Response) {
    const listMetrologyController = container.resolve(
      ListMetrologySolicitationsUseCase,
    );
    const list = await listMetrologyController.execute({user: request.user});
    return response.status(200).json({ list });
  }
}

export { ListMetrologySolicitationsController };
