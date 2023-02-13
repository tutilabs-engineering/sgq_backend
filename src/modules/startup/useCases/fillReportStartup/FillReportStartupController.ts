import { Request, Response } from "express";
import { container } from "tsyringe";
import { FillReportStartupUseCase } from "./FillReportStartupUseCase";

class FillReportStartupController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_startup: fk_startup } = request.params;
    const { default_questions, specific_questions } = request.body;
    const { id } = request.user;
    const { files } = request;
    const fillReportStartupUseCase = container.resolve(
      FillReportStartupUseCase,
    );

    await fillReportStartupUseCase.execute({
      default_questions: JSON.parse(default_questions),
      specific_questions: JSON.parse(specific_questions),
      fk_startup,
      user_id: id,
      files,
    });

    return response.status(200).json({ message: "Report Startup filled" });
  }
}

const fillReportStartupController = new FillReportStartupController();

export { fillReportStartupController };
