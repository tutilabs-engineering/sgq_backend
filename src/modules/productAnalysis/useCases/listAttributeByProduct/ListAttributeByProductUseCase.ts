import { Attribute } from "@modules/productAnalysis/entities/Attribute";
import { IAttributeRepository } from "@modules/productAnalysis/repositories/IAttributeRepository";
import { ISAPProductRepository } from "@modules/productAnalysis/repositories/ISAPProductRepository";
import { FindProductByCodeInSAP } from "@utils/sap/FindProductByCode";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListAttributeByProductUseCase {
  constructor(
    @inject("AttributeRepositoryInPrisma")
    private attributeRepositoryInPrisma: IAttributeRepository,
    @inject("SAPProductRepositoryInMemory")
    private sapProductRepositoryInMemory: ISAPProductRepository,
  ) {}

  async execute(code_product: string): Promise<Attribute[]> {
    // const sap_product =
    //   await this.sapProductRepositoryInMemory.findBySAPProduct(code_product);

    // if (!sap_product) {
    //   throw new AppError("Product doesn't exists", 404);
    // }

    const sap_product = await FindProductByCodeInSAP(code_product);

    if (!sap_product.status) {
      throw new AppError("Product doesn't exists", 404);
    }

    const list = await this.attributeRepositoryInPrisma.listAttributesInProduct(
      code_product,
    );

    return list;
  }
}

export { ListAttributeByProductUseCase };
