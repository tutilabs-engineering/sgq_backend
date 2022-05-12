import { ICreateAttributeDTO } from "@modules/productAnalysis/dtos/ICreateAttributeDTO";
import { Product } from "@modules/productAnalysis/entities/Product";
import { FactoryOfGeneralValidations } from "@shared/errors/factoryValidations/FactoryOfGeneralValidations";
import { IResponseValidation } from "@shared/errors/factoryValidations/interfaces/IResponseValidation";
import { FactoryOfProductAnalysisValidations } from "../base/FactoryOfProductAnalysis";

function AttributeValidation() {
  async function ProductDataValidation({
    cod_product,
    desc_product,
    cod_client,
    desc_client,
  }: Product): Promise<IResponseValidation> {
    const { IsEmpty } = FactoryOfGeneralValidations();
    const isEmptyCodeProduct = await IsEmpty(cod_product);
    const isEmptyDescProduct = await IsEmpty(desc_product);
    const isEmptyCodClient = await IsEmpty(cod_client);
    const isEmptyDescClient = await IsEmpty(desc_client);

    if (isEmptyCodeProduct) {
      return { status: false, message: "Cod Product is required" };
    }
    if (isEmptyDescProduct) {
      return { status: false, message: "Description Product is required" };
    }
    if (isEmptyCodClient) {
      return { status: false, message: " Cod Client is required" };
    }
    if (isEmptyDescClient) {
      return { status: false, message: "Description Client is required" };
    }
    return { status: true };
  }
  async function AttributeDataValidation({
    question,
  }: ICreateAttributeDTO): Promise<IResponseValidation> {
    const { IsEmpty } = FactoryOfGeneralValidations();
    // Attribute
    const isEmptyQuestion = await IsEmpty(question);

    if (isEmptyQuestion) {
      return { status: false, message: "Question is required" };
    }

    return { message: "", status: true };
  }

  async function AttributeIdValidation(
    id: string,
  ): Promise<IResponseValidation> {
    const { IsEmpty } = FactoryOfGeneralValidations();
    const { AttributeAlreadyExist } = FactoryOfProductAnalysisValidations();
    const isEmptyID = await IsEmpty(id);
    const attributeAlreadyExist = await AttributeAlreadyExist(id);
    if (isEmptyID) {
      return { message: "Param required", status: false };
    }

    if (!attributeAlreadyExist) {
      return { message: "Attribute not found", status: false, statusCode: 404 };
    }

    // const {} = FactoryOfProductAnalysisValidations();
    return { message: "", status: true };
  }

  async function AttributeIdInProductValidation(
    code_product: string,
    question: string,
  ): Promise<IResponseValidation> {
    const { IsEmpty } = FactoryOfGeneralValidations();
    const { AttributeExistInProduct } = FactoryOfProductAnalysisValidations();
    const isEmptyDesc = await IsEmpty(question);
    const isEmptyCodeProduct = await IsEmpty(code_product);

    if (isEmptyDesc) {
      return { status: false, message: "Question Attribute required" };
    }

    if (isEmptyCodeProduct) {
      return { status: false, message: "Cod Product required" };
    }

    const attributeExistInProduct = await AttributeExistInProduct(
      code_product,
      question,
    );

    if (attributeExistInProduct) {
      return { status: false, message: "Attribute Exist in Product" };
    }

    return { status: true, message: "" };
  }

  async function ChangeStateAttributeValidation({
    id,
    attention,
  }): Promise<IResponseValidation> {
    const { IsEmpty, IsBoolean } = FactoryOfGeneralValidations();

    const isEmptyId = await IsEmpty(id);
    const isEmptyStatus = await IsEmpty(attention.toString());
    const isBoolean = await IsBoolean(attention.toString());

    if (isEmptyId) {
      return { status: false, message: "id is required" };
    }
    if (isEmptyStatus) {
      return { status: false, message: "new state is required" };
    }
    if (!isBoolean) {
      return { status: false, message: "new state must be boolean" };
    }
    return { status: true };
  }

  return {
    AttributeIdInProductValidation,
    AttributeIdValidation,
    AttributeDataValidation,
    ProductDataValidation,
    ChangeStateAttributeValidation,
  };
}

export { AttributeValidation };
