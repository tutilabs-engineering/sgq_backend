import { IDataToInsertOpControllerDTO } from "@modules/startup/dtos/IInsertOpInStartupDTO";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { InsertOpInStartupUseCase } from "./InsertOpInStartupUseCase";

class InsertOpInStartupController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_startup } = request.params;
    const {
      code_op,
      components,
      machine,
      product_mold,
      client,
      code_client,
    }: IDataToInsertOpControllerDTO = request.body;

    const insertOpInStartupUseCase = container.resolve(
      InsertOpInStartupUseCase,
    );

    await insertOpInStartupUseCase.execute({
      newCodeOp: code_op,
      dataOp: {
        machine,
        product_mold,
        components,
        client,
        code_client,
      },
      idReportStartup: id_startup,
    });

    return response
      .status(200)
      .json({ message: `added Op '${code_op}' in startup` });
  }
}

const insertOpInStartupController = new InsertOpInStartupController();

export { insertOpInStartupController };
