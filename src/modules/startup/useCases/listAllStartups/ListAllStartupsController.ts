import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllStartupsUseCase } from "./ListAllStartupsUseCase";

class ListAllStartupsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllStartupsUseCase = container.resolve(ListAllStartupsUseCase);
    const { skip, take, fk_op, status, machine } = request.query;
    const allStartups = await listAllStartupsUseCase.execute(
      Number(skip),
      Number(take),
      Number(fk_op),
      Number(status),
      request.user,
      String(machine)
      
    );
    return response.status(200).json(allStartups);
  }
}

const listAllStartupsController = new ListAllStartupsController();

export { listAllStartupsController };
