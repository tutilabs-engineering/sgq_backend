import { SAPProduct } from "@modules/productAnalysis/entities/SAPProduct";
import api from "../../../../utils/product.json";
import { ISAPProductRepository } from "../ISAPProductRepository";

class SAPProductRepositoryInMemory implements ISAPProductRepository {
  private data: SAPProduct[];
  constructor() {
    this.data = api.results;
  }
  async findBySAPProduct(code: string): Promise<SAPProduct> {
    const response = this.data.find(
      (element) => element.codigo_produto === code,
    );
    return response;
  }
  async listSAPProduct(): Promise<SAPProduct[]> {
    return this.data;
  }
}

export { SAPProductRepositoryInMemory };
