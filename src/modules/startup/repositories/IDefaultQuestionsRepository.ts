import { DefaultQuestionIdentification } from "../entities/DefaultQuestionIdentification";

interface IDefaultQuestionsRepository {
  list(): Promise<DefaultQuestionIdentification[]>;
  findById(id: string): Promise<DefaultQuestionIdentification>;
}

export { IDefaultQuestionsRepository };
