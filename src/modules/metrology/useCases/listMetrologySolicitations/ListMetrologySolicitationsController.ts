import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListMetrologySolicitationsUseCase } from "./ListMetrologySolicitationsUseCase";

class ListMetrologySolicitationsController {
  async handle(request: Request, response: Response) {
    const listMetrologyController = container.resolve(
      ListMetrologySolicitationsUseCase,
    );
    const list = await listMetrologyController.execute();
    return response.status(200).json({ list });
  }
}

export { ListMetrologySolicitationsController };
