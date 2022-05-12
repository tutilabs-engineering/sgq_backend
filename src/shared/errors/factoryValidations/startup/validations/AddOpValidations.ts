import { ReportStartupsInPrisma } from "@modules/startup/repositories/implementations/ReportStartupsInPrisma";
import { FindDataByOpCode } from "@utils/sap/FindDataByOpCode";
import { FactoryOfGeneralValidations } from "../../FactoryOfGeneralValidations";
import { IResponseValidation } from "../../interfaces/IResponseValidation";

interface IDataForValidationInAddOp {
  newCodeOp: number;
  idReportStartup: string;
  dataOp: {
    product_mold: string;
    machine: string;
    client: string;
    code_client: string;
    components: {
      description: string;
      item_number: string;
      planned: string;
      um: string;
    }[];
  };
}

const reportStartupsInPrisma = new ReportStartupsInPrisma();

function AddOpValidations() {
  async function FieldValidations({
    newCodeOp,
    idReportStartup,
    dataOp: { client, code_client, components, machine, product_mold },
  }: IDataForValidationInAddOp): Promise<IResponseValidation> {
    const dataOpFromSAP = await FindDataByOpCode(newCodeOp);
    const reportStartup = await reportStartupsInPrisma.findReportStartupById(
      idReportStartup,
    );

    if (!dataOpFromSAP.status) {
      return {
        status: false,
        message: `Op '${newCodeOp}' not found in SAP`,
        statusCode: 404,
      };
    }
    if (!reportStartup) {
      return {
        status: false,
        message: `Report startup not found`,
        statusCode: 404,
      };
    }

    const { IsNumeric } = FactoryOfGeneralValidations();

    const codeOpIsNumeric = await IsNumeric({
      nameField: "code_op",
      data: newCodeOp.toString(),
    });

    if (!codeOpIsNumeric.status) {
      return { status: false, message: codeOpIsNumeric.message };
    }
    if (!client) {
      return { status: false, message: "client is required" };
    }
    if (!code_client) {
      return { status: false, message: "code_client is required" };
    }
    if (!components) {
      return { status: false, message: "components is required" };
    }
    if (!machine) {
      return { status: false, message: "machine is required" };
    }
    if (!product_mold) {
      return { status: false, message: "product_mold is required" };
    }

    return { status: true };
  }

  return { FieldValidations };
}

export { AddOpValidations };
