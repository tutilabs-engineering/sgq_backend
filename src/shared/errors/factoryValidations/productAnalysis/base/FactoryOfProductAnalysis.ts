import { AttributeRepositoryInPrisma } from "@modules/productAnalysis/repositories/implementations/AttributeRepositoryInPrisma";
import { ProductRepositoryInPrisma } from "@modules/productAnalysis/repositories/implementations/ProductRepositoryInPrisma";
import { VariablesRepositoryInPrisma } from "@modules/productAnalysis/repositories/implementations/VariablesRepositoryInPrisma";
const attributeRepositoryInPrisma = new AttributeRepositoryInPrisma();
const variablesRepositoryInPrisma = new VariablesRepositoryInPrisma();
const productRepoistoryInPrisma = new ProductRepositoryInPrisma();

function FactoryOfProductAnalysisValidations() {
  async function ProductAlreadyExists(code: string): Promise<boolean> {
    const response = await productRepoistoryInPrisma.findByProduct(code);
    if (response) {
      return true;
    }
    return false;
  }
  async function VariableExistInProduct(
    description: string,
    code_product: string,
  ): Promise<boolean> {
    const response = await variablesRepositoryInPrisma.findByVariableInProduct(
      code_product,
      description,
    );

    if (response) {
      return true;
    }
    return false;
  }

  async function VariableAlreadyExists(id: string): Promise<boolean> {
    const response = await variablesRepositoryInPrisma.findByVariable(id);

    if (response) {
      return true;
    }
    return false;
  }

  async function AttributeAlreadyExist(id: string): Promise<boolean> {
    const response = await attributeRepositoryInPrisma.findByAttribute(id);
    if (response) {
      return true;
    }
    return false;
  }

  async function AttributeExistInProduct(
    code_product: string,
    question: string,
  ): Promise<boolean> {
    const response = await attributeRepositoryInPrisma.findByAttributeInProduct(
      code_product,
      question,
    );

    if (response) {
      return true;
    }

    return false;
  }

  return {
    AttributeExistInProduct,
    VariableExistInProduct,
    ProductAlreadyExists,
    VariableAlreadyExists,
    AttributeAlreadyExist,
  };
}

export { FactoryOfProductAnalysisValidations };
