import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateAttributeUseCase } from "./CreateAttributeUseCase";

class CreateAttributeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cod_product, question } = request.body;

    const createAttributeUseCase = container.resolve(CreateAttributeUseCase);
    await createAttributeUseCase.execute({
      cod_product,
      question,
    });
    return response.status(201).json({ message: "Created" });
  }
}

export { CreateAttributeController };
