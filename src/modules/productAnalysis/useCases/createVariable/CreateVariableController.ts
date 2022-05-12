import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateVariableUseCase } from "./CreateVariableUseCase";

class CreateVariableController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cod_product, description, cota, max, min } = request.body;
    let filename = "";
    if (request.file) {
      filename = request.file.filename;
    }
    const createVariableUseCase = container.resolve(CreateVariableUseCase);
    await createVariableUseCase.execute({
      cod_product,
      description,
      cota,
      max,
      min,
      file: filename,
    });

    return response.status(201).json({ message: "Created" });
  }
}

export { CreateVariableController };
