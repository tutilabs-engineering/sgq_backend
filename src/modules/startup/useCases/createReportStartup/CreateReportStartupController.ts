import { ICreateStartupDTO } from "@modules/startup/dtos/ICreateStartupDTO";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateReportStartupUseCase } from "./CreateReportStartupUseCase";

class CreateReportStartupController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      code_op,
      user_id,
      header: {
        client,
        code_client,
        code_product,
        desc_product,
        product_mold,
        machine,
        day,
        start_time,
        quantity,
      },
      techniqueData: { cavity, cycle },
      components,
    }: ICreateStartupDTO = request.body;

    const createReportStartupUseCase = container.resolve(
      CreateReportStartupUseCase,
    );

    const startupCreated = await createReportStartupUseCase.execute({
      code_op,
      user_id,
      header: {
        client,
        code_client,
        code_product,
        desc_product,
        product_mold,
        machine,
        quantity,
        day,
        start_time,
      },
      techniqueData: {
        cavity,
        cycle,
      },
      components,
      user: request.user,

    });

    return response
      .status(201)
      .json({ message: "Created", startup: startupCreated });
  }
}

const createReportStartupController = new CreateReportStartupController();

export { createReportStartupController };
