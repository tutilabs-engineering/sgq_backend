import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindReportStartupByIdUseCase } from "./FindReportStartupByIdUseCase";

class FindReportStartupByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_startup } = request.params;

    const findReportStartupByIdUseCase = container.resolve(
      FindReportStartupByIdUseCase,
    );

    const reportStartup = await findReportStartupByIdUseCase.execute(
      id_startup,
    );

    return response.status(200).json(reportStartup);
  }
}

const findReportStartupByIdController = new FindReportStartupByIdController();

export { findReportStartupByIdController };
