import { Request, Response } from "express";
import { container } from "tsyringe";
import { FillReportStartupUseCase } from "./FillReportStartupUseCase";
import { FindReportStartupByIdUseCase } from "../findReportStartupById/FindReportStartupByIdUseCase";
import { executeCreatePiq } from "@utils/piq/create-piq-service";
import { CreateCard, CreateRepproval, createCard } from "@shared/infra/api/qualiboard/services/create-card";

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
        console.log(res.report_startup_fill.default_questions_responses.default_questions)
        const repproval:CreateRepproval[] = []
        res.report_startup_fill.default_questions_responses.default_questions.forEach((default_question)=>{
          if(Number(default_question.status) == 2 || Number(default_question.status)  == 3){
            repproval.push({description: default_question.title,status: Number(default_question.status),comment: default_question.description, imagePath: default_question.file })
          }
        })
        res.report_startup_fill.specific_questions_responses.specific_questions.forEach((specific_question)=>{
          if(Number(specific_question.status) == 2 || Number(specific_question.status) == 3){
            repproval.push({description: specific_question.question,status: Number(specific_question.status),comment: specific_question.description, imagePath: specific_question.file})
          }
        })
        console.log(repproval)
        const card: CreateCard = {startupId: fk_startup, status: res.status.id, machine: {code: res.op.machine.trim() }, product: {code: res.op.code_product},repproval}
        createCard(card)
    
      })
    })

    return response.status(200).json({ message: "Report Startup filled" });
  }
}

const fillReportStartupController = new FillReportStartupController();

export { fillReportStartupController };
