import { IProductDTO } from "@modules/productAnalysis/dtos/IProductDTO";
import { IProductRepository } from "@modules/productAnalysis/repositories/IProductRepository";
import { inject, injectable } from "tsyringe";
@injectable()
class ListProductUseCase {
  constructor(
    @inject("ProductRepositoryInPrisma")
    private productRepositoryInPrisma: IProductRepository,
  ) {}
  async execute(): Promise<IProductDTO[]> {
    const list = await this.productRepositoryInPrisma.listAllProduct();

    const listFormat = list.map((item) => {
      return {
        code_product: item.cod_product,
        name_product: item.desc_product,
        code_client: item.cod_client,
        name_client: item.desc_client,
      };
    });

    return listFormat;
  }
}

export { ListProductUseCase };
