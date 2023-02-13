import { IVariablesRepository } from "@modules/productAnalysis/repositories/IVariablesRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { VariableValidation } from "@shared/errors/factoryValidations/productAnalysis/validations/VariableValidation";

@injectable()
class ChangeStatusVariableUseCase {
  constructor(
    @inject("VariablesRepositoryInPrisma")
    private variablesRepositoryInPrisma: IVariablesRepository,
  ) {}
  async execute(id: string, state: boolean): Promise<void> {
    const { VariableIdValidation, ChangeStateVariableValidation } =
      VariableValidation();

    const variableIdValidation = await VariableIdValidation(id);
    const changeStateVariableValidation = await ChangeStateVariableValidation({
      id,
      state,
    });

    if (!changeStateVariableValidation.status) {
      throw new AppError(changeStateVariableValidation.message);
    }
    if (!variableIdValidation.status) {
      throw new AppError(variableIdValidation.message);
    }
    await this.variablesRepositoryInPrisma.updateStatus(id, state);
  }
}

export { ChangeStatusVariableUseCase };
