import { IProductRepository } from "@modules/productAnalysis/repositories/IProductRepository";
import { ISAPProductRepository } from "@modules/productAnalysis/repositories/ISAPProductRepository";
import { IVariablesRepository } from "@modules/productAnalysis/repositories/IVariablesRepository";
import { FindProductByCodeInSAP } from "@utils/sap/FindProductByCode";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { FactoryOfProductAnalysisValidations } from "@shared/errors/factoryValidations/productAnalysis/base/FactoryOfProductAnalysis";
import { VariableValidation } from "@shared/errors/factoryValidations/productAnalysis/validations/VariableValidation";

interface IRequest {
  cod_product: string;
  description: string;
  cota: number;
  max: number;
  min: number;
  file?: string;
}
@injectable()
class CreateVariableUseCase {
  constructor(
    @inject("VariablesRepositoryInPrisma")
    private variablesRepositoryInPrisma: IVariablesRepository,
    @inject("ProductRepositoryInPrisma")
    private productRepositoryInPrisma: IProductRepository,
    @inject("SAPProductRepositoryInMemory")
    private sapProductRepositoryInMemory: ISAPProductRepository,
  ) {}

  async execute({
    cod_product,
    description,
    cota,
    max,
    min,
    file,
  }: IRequest): Promise<void> {
    let fk_product_ana = "notFound";
    const {
      ProductDataValidation,
      VariableDataValidation,
      VariableIdInProductValidation,
    } = VariableValidation();
    const { ProductAlreadyExists } = FactoryOfProductAnalysisValidations();

    // [X] - Primeiro passo verificar se produto existe no SAP
    // const sap_product =
    //   await this.sapProductRepositoryInMemory.findBySAPProduct(cod_product);
    const sap_product = await FindProductByCodeInSAP(cod_product);

    if (!sap_product.status) {
      throw new AppError("Product doesn't exists", 404);
    }

    // Obs: Passando dados obtidos do sap para constantes
    const desc_product = sap_product.product.name_product;
    const cod_client = "XXX";
    const desc_client = "XXX";
    const cotaRef = Number(cota);
    const maxRef = Number(max);
    const minRef = Number(min);
    // [X] - Segundo passo verificando os dados do produto
    const productDataValidation = await ProductDataValidation({
      cod_client,
      desc_client,
      cod_product,
      desc_product,
    });

    // [X] - Terceiro passo Verificando dados de Variavel
    const variableDataValidation = await VariableDataValidation({
      description,
      cota: cotaRef,
      max: maxRef,
      min: minRef,
    });

    // [X] - Quarto passo Verificando se Existe a mesma descrição de variavel na tabela produto do SGQ
    const variableIdInProductValidation = await VariableIdInProductValidation(
      description,
      cod_product,
    );

    if (!variableDataValidation.status) {
      throw new AppError(variableDataValidation.message);
    }

    if (!productDataValidation.status) {
      throw new AppError(productDataValidation.message);
    }

    if (!variableIdInProductValidation.status) {
      throw new AppError(variableIdInProductValidation.message);
    }

    // Verificando Existencia do Produto
    // OBSS: Verificando existencia de produto no banco do SGQ, caso sim, ele retornara o calor para a constante
    // fk_product
    const productAlreadyExists = await ProductAlreadyExists(cod_product);
    if (productAlreadyExists) {
      const fk_product = await this.productRepositoryInPrisma.findByProduct(
        cod_product,
      );
      fk_product_ana = fk_product.id;
    }

    const variable = {
      cod_client,
      desc_client,
      cod_product,
      desc_product,
      description,
      cota: cotaRef,
      max: maxRef,
      min: minRef,
      file,
      fk_product_ana,
    };
    await this.variablesRepositoryInPrisma.createdVariable(variable);
  }
}

export { CreateVariableUseCase };
