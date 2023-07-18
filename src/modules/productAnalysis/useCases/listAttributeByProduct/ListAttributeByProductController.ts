import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAttributeByProductUseCase } from "./ListAttributeByProductUseCase";

class ListAttributeByProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { code_product } = request.params;
    const listAttributeByProductUseCase = container.resolve(
      ListAttributeByProductUseCase,
    );
    const list = await listAttributeByProductUseCase.execute(code_product);
    return response.status(200).json({ list });
  }
}

export { ListAttributeByProductController };
