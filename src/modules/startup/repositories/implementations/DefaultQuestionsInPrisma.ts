import { DefaultQuestionIdentification } from "@modules/startup/entities/DefaultQuestionIdentification";
import { prismaAgent } from "@shared/database/prismaAgent";
import { IDefaultQuestionsRepository } from "../IDefaultQuestionsRepository";

class DefaultQuestionsInPrisma implements IDefaultQuestionsRepository {
  async findById(id): Promise<DefaultQuestionIdentification> {
    return prismaAgent.defaultQuestionIdentification.findUnique({
      where: { id },
    });
  }
  async list(): Promise<DefaultQuestionIdentification[]> {
    const allDefaultQuestions =
      await prismaAgent.defaultQuestionIdentification.findMany({
        select: {
          id: true,
          description: true,
        },
      });
    return allDefaultQuestions;
  }
}

export { DefaultQuestionsInPrisma };
