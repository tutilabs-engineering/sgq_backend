import { IFindProductByCodeDTO } from "@modules/productAnalysis/dtos/IFindProductByCodeDTO";
import { FindProductByCodeInSAP } from "@utils/sap/FindProductByCode";
import { AppError } from "@shared/errors/AppError";

export class FindProductByCodeUseCase {
  async execute(code_product: string): Promise<IFindProductByCodeDTO> {
    const product = await FindProductByCodeInSAP(code_product);

    if (!product.status) {
      throw new AppError("Product not found in SAP", 404);
    }

    return product.product;
  }
}
