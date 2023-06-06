import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListMetrologyHistoryUseCase } from "./ListMetrologyHistoryUseCase";

class ListMetrologyHistoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listMetrologyHistoryUseCase = container.resolve(
      ListMetrologyHistoryUseCase,
    );
    const {skip = 0, limit = 10} = request.headers
    const list = await listMetrologyHistoryUseCase.execute({user: request.user}, Number(skip),Number(limit));
    return response.status(200).json({ list });
  }
}

export { ListMetrologyHistoryController };
