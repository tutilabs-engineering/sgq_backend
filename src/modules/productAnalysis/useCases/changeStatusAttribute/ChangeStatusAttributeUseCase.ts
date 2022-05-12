import { IAttributeRepository } from "@modules/productAnalysis/repositories/IAttributeRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { AttributeValidation } from "@shared/errors/factoryValidations/productAnalysis/validations/AttributeValidation";

@injectable()
class ChangeStatusAttributeUseCase {
  constructor(
    @inject("AttributeRepositoryInPrisma")
    private attributeRepositoryInPrisma: IAttributeRepository,
  ) {}
  async execute(id: string, state: boolean): Promise<void> {
    const { AttributeIdValidation, ChangeStateAttributeValidation } =
      AttributeValidation();
    const attributeIdValidation = await AttributeIdValidation(id);
    const changeStateAttributeValidation = await ChangeStateAttributeValidation(
      { id, attention: state },
    );

    if (!changeStateAttributeValidation.status) {
      throw new AppError(changeStateAttributeValidation.message);
    }
    if (!attributeIdValidation.status) {
      throw new AppError(attributeIdValidation.message);
    }
    await this.attributeRepositoryInPrisma.updateStatus(id, state);
  }
}

export { ChangeStatusAttributeUseCase };
