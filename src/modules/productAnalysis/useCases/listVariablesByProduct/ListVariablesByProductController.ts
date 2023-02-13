import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListVariablesByProductUseCase } from "./ListVariablesByProductUseCase";

class ListVariablesByProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { code_product } = request.params;
    const listVariablesByProductUseCase = container.resolve(
      ListVariablesByProductUseCase,
    );
    const list = await listVariablesByProductUseCase.execute(code_product);
    return response.status(200).json({ list });
  }
}

export { ListVariablesByProductController };
