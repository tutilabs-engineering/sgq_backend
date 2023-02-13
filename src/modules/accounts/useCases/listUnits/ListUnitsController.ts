import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUnitsUseCase } from "./ListUnitsUseCase";

class ListUnitsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listUnitsUseCase = container.resolve(ListUnitsUseCase);
    const allUnits = await listUnitsUseCase.execute();
    return response.status(200).json({ units: allUnits });
  }
}

const listUnitsController = new ListUnitsController();

export { listUnitsController };
