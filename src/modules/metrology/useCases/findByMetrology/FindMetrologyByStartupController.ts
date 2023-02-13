import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindMetrologyByStartupUseCase } from "./FindMetrologyByStartupUseCase";

class FindMetrologyByStartupController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { startup } = request.params;
    const findMetrologyByStartupUseCase = container.resolve(
      FindMetrologyByStartupUseCase,
    );
    const list = await findMetrologyByStartupUseCase.handle({ startup });
    return response.status(200).json({ list });
  }
}

export { FindMetrologyByStartupController };
