import { DefaultQuestionIdentification } from "@modules/startup/entities/DefaultQuestionIdentification";
import { IDefaultQuestionsRepository } from "@modules/startup/repositories/IDefaultQuestionsRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListDefaultQuestionsUseCase {
  constructor(
    @inject("DefaultQuestionsInPrisma")
    private defaultQuestionsInPrisma: IDefaultQuestionsRepository,
  ) {}

  async execute(): Promise<DefaultQuestionIdentification[]> {
    try {
      const defaultQuestions = await this.defaultQuestionsInPrisma.list();
      if (!defaultQuestions) {
        throw new AppError("Not found", 404);
      }
      return defaultQuestions;
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export { ListDefaultQuestionsUseCase };
