import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListMetrologyHistoryUseCase } from "./ListMetrologyHistoryUseCase";

class ListMetrologyHistoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listMetrologyHistoryUseCase = container.resolve(
      ListMetrologyHistoryUseCase,
    );

    // console.log({testeuser: request.user});
    
    const list = await listMetrologyHistoryUseCase.execute({user: request.user});
    return response.status(200).json({ list });
  }
}

export { ListMetrologyHistoryController };
