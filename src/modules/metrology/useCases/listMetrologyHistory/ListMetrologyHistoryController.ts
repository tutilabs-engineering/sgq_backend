import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListMetrologyHistoryUseCase } from "./ListMetrologyHistoryUseCase";

class ListMetrologyHistoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listMetrologyHistoryUseCase = container.resolve(
      ListMetrologyHistoryUseCase,
    );
    const list = await listMetrologyHistoryUseCase.execute();
    return response.status(200).json({ list });
  }
}

export { ListMetrologyHistoryController };
