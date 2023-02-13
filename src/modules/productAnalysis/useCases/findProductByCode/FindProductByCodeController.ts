import { Request, Response } from "express";
import { FindProductByCodeUseCase } from "./FindProductByCodeUseCase";

export class FindProductByCodeController {
  constructor(private findProductByCodeUseCase: FindProductByCodeUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { code_product } = request.params;

    const dataProduct = await this.findProductByCodeUseCase.execute(
      code_product,
    );

    return response.status(200).json(dataProduct);
  }
}
