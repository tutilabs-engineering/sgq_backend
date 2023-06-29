import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListStartupCountByStatusUseCase } from "./ListStartupCountByStatusUseCase";

class ListStartupCountByStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listStartupCountByStatusUseCase = container.resolve(
      ListStartupCountByStatusUseCase,
    );
    const { skip, take, status } = request.query;
    const list = await listStartupCountByStatusUseCase.execute({
      skip: Number(skip),
      take: Number(take),
      status: Number(status),
      user: request.user
    });
    return response.status(200).json(list);
  }
}

const listStartupCountByStatusController =
  new ListStartupCountByStatusController();

export { listStartupCountByStatusController };
