import { IVariablesRepository } from "@modules/productAnalysis/repositories/IVariablesRepository";
import fs from "fs";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { VariableValidation } from "@shared/errors/factoryValidations/productAnalysis/validations/VariableValidation";

@injectable()
class DeleteVariableUseCase {
  constructor(
    @inject("VariablesRepositoryInPrisma")
    private variableRepositoryInPrisma: IVariablesRepository,
  ) {}
  async execute(id: string): Promise<void> {
    const { VariableIdValidation } = VariableValidation();
    const variableIdValidation = await VariableIdValidation(id);
    if (!variableIdValidation.status) {
      throw new AppError(
        variableIdValidation.message,
        variableIdValidation.statusCode,
      );
    }
    const variable = await this.variableRepositoryInPrisma.findByVariable(id);

    if (variable.file !== "") {
      fs.unlinkSync(`uploads/variables/${variable.file}`);
    }

    try {
      await this.variableRepositoryInPrisma.deleteVariable(id);
    } catch {
      throw new AppError(
        "variable cannot be deleted because it is being used",
        401,
      );
    }
  }
}

export { DeleteVariableUseCase };
