import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListDefaultQuestionsUseCase } from "./ListDefaultQuestionsUseCase";

class ListDefaultQuestionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllDefaultQuestions = container.resolve(
      ListDefaultQuestionsUseCase,
    );
    const defaultQuestions = await listAllDefaultQuestions.execute();
    return response.status(200).json({ defaultQuestions });
  }
}

const listDefaultQuestionsController = new ListDefaultQuestionsController();

export { listDefaultQuestionsController };
