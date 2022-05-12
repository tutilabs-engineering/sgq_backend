import { Product } from "@modules/productAnalysis/entities/Product";
import { prismaAgent } from "@shared/database/prismaAgent";
import { IProductRepository } from "../IProductRepository";

class ProductRepositoryInPrisma implements IProductRepository {
  async listAllProduct(): Promise<Product[]> {
    const product = await prismaAgent.productAnalysis.findMany();
    return product;
  }
  async findByProduct(cod_product: string): Promise<Product> {
    const product = await prismaAgent.productAnalysis.findFirst({
      where: { cod_product },
    });
    return product;
  }
}

export { ProductRepositoryInPrisma };
