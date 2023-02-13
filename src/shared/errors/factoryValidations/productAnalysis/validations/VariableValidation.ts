import { Product } from "@modules/productAnalysis/entities/Product";
import { Variable } from "@modules/productAnalysis/entities/Variable";
import { FactoryOfGeneralValidations } from "@shared/errors/factoryValidations/FactoryOfGeneralValidations";
import { IResponseValidation } from "@shared/errors/factoryValidations/interfaces/IResponseValidation";
import { FactoryOfProductAnalysisValidations } from "../base/FactoryOfProductAnalysis";

function VariableValidation() {
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

  async function VariableIdValidation(
    id: string,
  ): Promise<IResponseValidation> {
    const { IsEmpty } = FactoryOfGeneralValidations();

    const { VariableAlreadyExists } = FactoryOfProductAnalysisValidations();
    const isEmpty = await IsEmpty(id);

    const variableAlreadyExists = await VariableAlreadyExists(id);

    if (variableAlreadyExists && isEmpty === false) {
      return { status: true };
    }
    if (isEmpty) {
      return { status: false, message: "Param is required" };
    }
    return { status: false, message: "Variable not found", statusCode: 404 };
  }

  async function VariableIdInProductValidation(
    description: string,
    code_product: string,
  ): Promise<IResponseValidation> {
    const { IsEmpty } = FactoryOfGeneralValidations();
    const { VariableExistInProduct } = FactoryOfProductAnalysisValidations();
    const isEmptyDesc = await IsEmpty(description);
    const isEmptyCodeProduct = await IsEmpty(code_product);
    const variableExistInProduct = await VariableExistInProduct(
      description,
      code_product,
    );
    if (isEmptyDesc) {
      return { status: false, message: "Description Variable required" };
    }

    if (isEmptyCodeProduct) {
      return { status: false, message: "Cod Product required" };
    }

    if (variableExistInProduct) {
      return { status: false, message: "Variable Exist in Product" };
    }

    return { status: true, message: "" };
  }

  async function VariableDataValidation({
    description,
    cota,
    max,
    min,
  }: Variable): Promise<IResponseValidation> {
    const { IsEmpty } = FactoryOfGeneralValidations();

    const isEmptyDescription = await IsEmpty(description);

    if (isEmptyDescription) {
      return { status: false, message: "Description is required" };
    }
    // if (IsEmpty(String(cota))) {
    //   return { status: false, message: "Cota is required" };
    // }

    // if (IsEmpty(String(max))) {
    //   return { status: false, message: "Max is required" };
    // }
    // if (IsEmpty(String(min))) {
    //   return { status: false, message: "Min is required" };
    // }

    return { status: true };
  }

  async function ChangeStateVariableValidation({
    id,
    state,
  }): Promise<IResponseValidation> {
    const { IsEmpty, IsBoolean } = FactoryOfGeneralValidations();

    const isEmptyId = await IsEmpty(id);
    const isEmptyStatus = await IsEmpty(state.toString());
    const isBoolean = await IsBoolean(state.toString());

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
    VariableIdInProductValidation,
    ProductDataValidation,
    VariableIdValidation,
    VariableDataValidation,
    ChangeStateVariableValidation,
  };
}

export { VariableValidation };
