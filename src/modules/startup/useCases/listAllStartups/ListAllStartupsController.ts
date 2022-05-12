import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllStartupsUseCase } from "./ListAllStartupsUseCase";

class ListAllStartupsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllStartupsUseCase = container.resolve(ListAllStartupsUseCase);
    const allStartups = await listAllStartupsUseCase.execute();
    return response.status(200).json(allStartups);
  }
}

const listAllStartupsController = new ListAllStartupsController();

export { listAllStartupsController };
