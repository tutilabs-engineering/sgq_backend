import { Variable } from "@modules/productAnalysis/entities/Variable";
import { ISAPProductRepository } from "@modules/productAnalysis/repositories/ISAPProductRepository";
import { IVariablesRepository } from "@modules/productAnalysis/repositories/IVariablesRepository";
import { FindProductByCodeInSAP } from "@utils/sap/FindProductByCode";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListVariablesByProductUseCase {
  constructor(
    @inject("VariablesRepositoryInPrisma")
    private variablesRepositoryInPrisma: IVariablesRepository,
    @inject("SAPProductRepositoryInMemory")
    private sapProductRepositoryInMemory: ISAPProductRepository,
  ) {}

  async execute(code_product: string): Promise<Variable[]> {
    // const sap_product =
    //   await this.sapProductRepositoryInMemory.findBySAPProduct(code_product);

    // if (!sap_product) {
    //   throw new AppError("Product doesn't exists", 404);
    // }
    const sap_product = await FindProductByCodeInSAP(code_product);

    if (!sap_product.status) {
      throw new AppError("Product doesn't exists", 404);
    }

    const list = await this.variablesRepositoryInPrisma.listVariablesInProduct(
      code_product,
    );
    return list;
  }
}

export { ListVariablesByProductUseCase };
