import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListMoldsUseCase } from "./ListMoldsUseCase";

class ListMoldsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listMoldsUseCase = container.resolve(ListMoldsUseCase);

    const molds = await listMoldsUseCase.execute();

    return response.status(200).json(molds);
  }
}

const listMoldsController = new ListMoldsController();
export { listMoldsController };
