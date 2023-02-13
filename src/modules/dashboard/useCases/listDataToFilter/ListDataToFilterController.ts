import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListDataToFilterUseCase } from "./ListDataToFilterUseCase";

class ListDataToFilterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listDataToFilterUseCase = container.resolve(ListDataToFilterUseCase);
    return response
      .status(200)
      .json({ list: await listDataToFilterUseCase.execute() });
  }
}
export { ListDataToFilterController };
