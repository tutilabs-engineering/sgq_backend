import { Request, Response } from "express";
import { container } from "tsyringe";
import { FillReportStartupUseCase } from "./FillReportStartupUseCase";
import { FindReportStartupByIdUseCase } from "../findReportStartupById/FindReportStartupByIdUseCase";
import { executeCreatePiq } from "@utils/piq/create-piq-service";

class FillReportStartupController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_startup: fk_startup } = request.params;
    const authHeader = request.headers.authorization;


    const { default_questions, specific_questions } = request.body;
    const { id } = request.user;
    const { files } = request;
    const fillReportStartupUseCase = container.resolve(
      FillReportStartupUseCase,
    );

    const findReportStartupByIdUseCase = container.resolve(
      FindReportStartupByIdUseCase
    );

    await fillReportStartupUseCase.execute({
      default_questions: JSON.parse(default_questions),
      specific_questions: JSON.parse(specific_questions),
      fk_startup,
      user_id: id,
      files,
    }).then(async ()=>{
      await findReportStartupByIdUseCase.execute(fk_startup).then(async (res)=>{
        if(res.status.id == 1 || res.status.id == 3){
          await executeCreatePiq(res, authHeader)
        }
      })
    })

    return response.status(200).json({ message: "Report Startup filled" });
  }
}

const fillReportStartupController = new FillReportStartupController();

export { fillReportStartupController };
