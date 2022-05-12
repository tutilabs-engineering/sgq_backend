import { IDataToInsertOpInStartup } from "@modules/startup/dtos/ICreateStartupDTO";
import { IReportStartupRepository } from "@modules/startup/repositories/IReportStartupRepository";
import { FindDataByOpCode } from "@utils/sap/FindDataByOpCode";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { AddOpValidations } from "@shared/errors/factoryValidations/startup/validations/AddOpValidations";

interface IRequest {
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

@injectable()
class InsertOpInStartupUseCase {
  constructor(
    @inject("ReportStartupsInPrisma")
    private reportStartupsInPrisma: IReportStartupRepository,
  ) {}

  async execute({
    newCodeOp,
    idReportStartup,
    dataOp: { machine, product_mold, client, code_client, components },
  }: IRequest): Promise<void> {
    const { FieldValidations } = AddOpValidations();

    const fieldValidations = await FieldValidations({
      newCodeOp,
      idReportStartup,
      dataOp: {
        client,
        code_client,
        components,
        machine,
        product_mold,
      },
    });

    if (!fieldValidations.status) {
      throw new AppError(fieldValidations.message, fieldValidations.statusCode);
    }

    const dataOpFromSAP = await FindDataByOpCode(
      parseInt(newCodeOp.toString(), 10),
    );
    const op = dataOpFromSAP.data;

    const data: IDataToInsertOpInStartup = {
      data_op: {
        code_op: op.DocNum,
        cavity: op.U_EP_Cav,
        cycle: op.U_EP_CIC,
        client,
        code_client,
        code_product: op.ItemCode,
        desc_product: op.ProdName,
        product_mold,
        machine,
        quantity: op.PlannedQty,
        components,
      },
    };

    await this.reportStartupsInPrisma.insertOpInStartup({
      newCodeOp: parseInt(newCodeOp.toString(), 10),
      idReportStartup,
      dataOp: {
        cavity: data.data_op.cavity,
        client: data.data_op.client,
        code_client: data.data_op.code_client,
        code_product: data.data_op.code_product,
        cycle: data.data_op.cycle,
        desc_product: data.data_op.desc_product,
        machine: data.data_op.machine,
        product_mold: data.data_op.product_mold,
        quantity: data.data_op.quantity,
        components,
      },
    });
  }
}

export { InsertOpInStartupUseCase };
