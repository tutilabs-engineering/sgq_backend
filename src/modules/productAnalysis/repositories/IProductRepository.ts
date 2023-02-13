import { Product } from "../entities/Product";

interface IProductRepository {
  findByProduct(cod_product: string): Promise<Product>;
  listAllProduct(): Promise<Product[]>;
}

export { IProductRepository };
