import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListDefaultQuestionsDisapprovedUseCase } from "./ListDefaultQuestionsDisapprovedUseCase";

class ListDefaultQuestionsDisapprovedController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listDefaultQuestionsDisapprovedUseCase = container.resolve(
      ListDefaultQuestionsDisapprovedUseCase,
    );

    const list = await listDefaultQuestionsDisapprovedUseCase.execute();

    return response.status(200).json(list);
  }
}

const listDefaultQuestionsDisapprovedController =
  new ListDefaultQuestionsDisapprovedController();
export { listDefaultQuestionsDisapprovedController };
