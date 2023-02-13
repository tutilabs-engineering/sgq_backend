import { IAttributeRepository } from "@modules/productAnalysis/repositories/IAttributeRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { AttributeValidation } from "@shared/errors/factoryValidations/productAnalysis/validations/AttributeValidation";

@injectable()
class DeleteAttributeUseCase {
  constructor(
    @inject("AttributeRepositoryInPrisma")
    private attributeRepositoryInPrisma: IAttributeRepository,
  ) {}
  async execute(id: string): Promise<void> {
    const { AttributeIdValidation } = AttributeValidation();
    const attributeIdValidation = await AttributeIdValidation(id);
    if (!attributeIdValidation.status) {
      throw new AppError(
        attributeIdValidation.message,
        attributeIdValidation.statusCode,
      );
    }
    // Não posso deletar pq o pablo botou dentro de um JSON no banco :O
    // await this.attributeRepositoryInPrisma.deleteAttribute(id);
    await this.attributeRepositoryInPrisma.updateStatus(id, false);
  }
}

export { DeleteAttributeUseCase };
