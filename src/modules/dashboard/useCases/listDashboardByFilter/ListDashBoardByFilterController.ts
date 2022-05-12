import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListDashBoardByFilterUseCase } from "./ListDashBoardByFilterUseCase";

class ListDashBoardByFilterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listDashBoardByFilterUseCase = container.resolve(
      ListDashBoardByFilterUseCase,
    );
    const { machine, code_product, code_client, day } = request.body;
    const list = await listDashBoardByFilterUseCase.execute({
      machine,
      code_product,
      code_client,
      day,
    });

    return response.status(200).json({ list });
  }
}

export { ListDashBoardByFilterController };
