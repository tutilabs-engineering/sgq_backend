import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListMachinesUseCase } from "./ListMachinesUseCase";

class ListMachinesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listMachinesUseCase = container.resolve(ListMachinesUseCase);

    const machines = await listMachinesUseCase.execute();

    return response.status(200).json(machines);
  }
}

const listMachinesController = new ListMachinesController();
export { listMachinesController };
