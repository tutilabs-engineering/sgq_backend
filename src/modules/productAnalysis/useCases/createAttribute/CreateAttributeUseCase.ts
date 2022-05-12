import { IAttributeRepository } from "@modules/productAnalysis/repositories/IAttributeRepository";
import { IProductRepository } from "@modules/productAnalysis/repositories/IProductRepository";
import { ISAPProductRepository } from "@modules/productAnalysis/repositories/ISAPProductRepository";
import { FindProductByCodeInSAP } from "@utils/sap/FindProductByCode";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { FactoryOfProductAnalysisValidations } from "@shared/errors/factoryValidations/productAnalysis/base/FactoryOfProductAnalysis";
import { AttributeValidation } from "@shared/errors/factoryValidations/productAnalysis/validations/AttributeValidation";

interface IRequest {
  cod_product: string;
  question: string;
}

@injectable()
class CreateAttributeUseCase {
  constructor(
    @inject("AttributeRepositoryInPrisma")
    private attributeRepositoryInPrisma: IAttributeRepository,
    @inject("ProductRepositoryInPrisma")
    private productRepositoryInPrisma: IProductRepository,
    @inject("SAPProductRepositoryInMemory")
    private sapProductRepositoryInMemory: ISAPProductRepository,
  ) {}

  async execute({ cod_product, question }: IRequest): Promise<void> {
    const {
      AttributeDataValidation,
      ProductDataValidation,
      AttributeIdInProductValidation,
    } = AttributeValidation();
    const { ProductAlreadyExists } = FactoryOfProductAnalysisValidations();

    // [X] - Primeiro passo verificar se produto existe no SAP
    // const sap_product =
    //   await this.sapProductRepositoryInMemory.findBySAPProduct(cod_product);
    const sap_product = await FindProductByCodeInSAP(cod_product);

    if (!sap_product.status) {
      throw new AppError("Product doesn't exists", 404);
      return;
    }
    // if (!sap_product) {
    //   throw new AppError("Product doesn't exists");
    //   return;
    // }

    // Obs: Passando dados obtidos do sap para constantes
    const desc_product = sap_product.product.name_product;
    const cod_client = "XXX";
    const desc_client = "XXX";
    // [X] - Segundo passo verificar se o atributo existe dentro da tabela produto do DB do SGQ
    const attributeIdInProductValidation = await AttributeIdInProductValidation(
      cod_product,
      question,
    );
    // [X] - Terceiro passo verificar se os campos do produto estão vazios

    const productDataValidation = await ProductDataValidation({
      cod_product,
      desc_product,
      cod_client,
      desc_client,
    });
    // [X] - Quarto passo verificar se os campos do atributo estão vazios
    const attributeDataValidation = await AttributeDataValidation({
      question,
    });

    // OBS: FK usada para caso não exista produto criado no banco de dados do sgq
    let fk_product_ana = "notfound";

    if (!productDataValidation.status) {
      throw new AppError(productDataValidation.message);
    }
    if (!attributeDataValidation.status) {
      throw new AppError(attributeDataValidation.message);
    }
    if (!attributeIdInProductValidation.status) {
      throw new AppError(attributeIdInProductValidation.message);
    }

    //  [X] - Quinto passo Verificar se Produto existe na tabela produto do  banco de dados do SQG
    const productAlreadyExists = await ProductAlreadyExists(cod_product);

    // Obs: Caso exista ele ira passar o ID da foreign key pra constante fk_product_ana, se não ele ira salvar
    //  o produto junto ao atributo com os dados obtidos do produto do SAP no banco do SGQ

    if (productAlreadyExists) {
      const product = await this.productRepositoryInPrisma.findByProduct(
        cod_product,
      );
      fk_product_ana = product.id;
    }

    const attribute = {
      cod_product,
      desc_product,
      cod_client,
      desc_client,
      question,
      fk_product_ana,
    };

    await this.attributeRepositoryInPrisma.createAttribute(attribute);
  }
}

export { CreateAttributeUseCase };
