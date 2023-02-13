import { SAPProduct } from "../entities/SAPProduct";

interface ISAPProductRepository {
  findBySAPProduct(code: string): Promise<SAPProduct>;
  listSAPProduct(): Promise<SAPProduct[]>;
}

export { ISAPProductRepository };
