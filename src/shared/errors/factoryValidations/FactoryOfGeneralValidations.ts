import validator from "validator";
import { IDataField } from "./interfaces/IDataField";
import { IDataLength } from "./interfaces/IDataLength";
import { IResponseValidation } from "./interfaces/IResponseValidation";

function FactoryOfGeneralValidations() {
  async function IsEmpty(data: string) {
    const response = validator.isEmpty(data);
    return response;
  }

  async function IsNumeric({
    nameField,
    data,
  }: IDataField): Promise<IResponseValidation> {
    const dataInt = parseInt(data, 10);
    if (dataInt <= 0) {
      return { status: false, message: `${nameField} must be larger 0` };
    }
    const response = validator.isNumeric(data);
    if (response) {
      return { status: true };
    }
    return { status: false, message: `${nameField} must be numeric` };
  }

  async function IsByteLength(
    { nameField, data }: IDataField,
    { min, max }: IDataLength,
  ): Promise<IResponseValidation> {
    const response = validator.isByteLength(data, { min, max });
    if (response) {
      return { status: true };
    }
    return { status: false, message: `${nameField} must be 11 characters` };
  }

  async function IsBoolean(data: string) {
    const response = validator.isBoolean(data);
    return response;
  }

  return { IsEmpty, IsNumeric, IsByteLength, IsBoolean };
}

export { FactoryOfGeneralValidations };
