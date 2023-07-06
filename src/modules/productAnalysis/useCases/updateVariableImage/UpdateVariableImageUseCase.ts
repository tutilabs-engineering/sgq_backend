import { IVariablesRepository } from "@modules/productAnalysis/repositories/IVariablesRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  filename: string;
}

@injectable()
class UpdateVariableImageUseCase {
  constructor(
    @inject("VariablesRepositoryInPrisma")
    private variablesRepositoryInPrisma: IVariablesRepository,
  ) {}

  async execute({ id, filename }: IRequest): Promise<void> {
    return await this.variablesRepositoryInPrisma.updateVariableImage(
      id,
      filename,
    );
  }
}

export { UpdateVariableImageUseCase };
