import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListProductUseCase } from "./ListProductUseCase";

class ListProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listProductUseCase = container.resolve(ListProductUseCase);
    const list = await listProductUseCase.execute();
    return response.status(200).json({ list });
  }
}

export { ListProductController };
