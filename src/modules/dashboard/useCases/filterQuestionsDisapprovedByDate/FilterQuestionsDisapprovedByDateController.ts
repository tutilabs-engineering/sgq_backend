import { Request, Response } from "express";
import { container } from "tsyringe";
import { FilterQuestionsDisapprovedByDateUseCase } from "./FilterQuestionsDisapprovedByDateUseCase";

class FilterQuestionsDisapprovedByDateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { date_start, date_end } = request.body;

    const filterQuestionsDisapprovedByDateUseCase = container.resolve(
      FilterQuestionsDisapprovedByDateUseCase,
    );

    const defaultQuestionsDisapproved =
      await filterQuestionsDisapprovedByDateUseCase.execute({
        date_end,
        date_start,
      });

    return response.status(200).json(defaultQuestionsDisapproved);
  }
}

const filterQuestionsDisapprovedByDateController =
  new FilterQuestionsDisapprovedByDateController();

export { filterQuestionsDisapprovedByDateController };
