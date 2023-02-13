import { Request, Response } from "express";
import { FindDataByCodeOpUseCase } from "./FindDataByCodeOpUseCase";

class FindDataByCodeOpController {
  constructor(private findDataByCodeOpUseCase: FindDataByCodeOpUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { code_op } = request.params;
    const code = Number(code_op);
    const data = await this.findDataByCodeOpUseCase.execute(code);

    return response.status(200).json(data);
  }
}

export { FindDataByCodeOpController };
