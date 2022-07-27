import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListStartupFilterCountUseCase } from "./ListStartupFilterCountUseCase";

class ListStartupFilterCountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { start_time, end_time } = request.body;
    const listStartupFilterCountUseCase = container.resolve(
      ListStartupFilterCountUseCase,
    );

    const list = await listStartupFilterCountUseCase.execute({
      start_time,
      end_time,
    });
    return response.status(200).json(list);
  }
}

const listStartupFilterCountController = new ListStartupFilterCountController();

export { listStartupFilterCountController };
