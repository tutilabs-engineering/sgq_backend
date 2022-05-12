import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListStartupCountByStatusUseCase } from "./ListStartupCountByStatusUseCase";

class ListStartupCountByStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listStartupCountByStatusUseCase = container.resolve(
      ListStartupCountByStatusUseCase,
    );

    const list = await listStartupCountByStatusUseCase.execute();
    return response.status(200).json(list);
  }
}

const listStartupCountByStatusController =
  new ListStartupCountByStatusController();

export { listStartupCountByStatusController };
