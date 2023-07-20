import { Request, Response } from "express";
import { container } from "tsyringe";
import { CloseStartupByOpUseCase } from "./CloseStartupUseCase";
import { IOpsToCloseData } from "@modules/startup/dtos/ICloseStartupDTO";

class CloseStartupByOpController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data: IOpsToCloseData[] = request.body;

    const closeStartupByOpUseCase = container.resolve(
        CloseStartupByOpUseCase,
    );

    await closeStartupByOpUseCase.execute(data)
    return response
      .status(200)
      .json({ message: "Startups fechadas!"});
  }
}

const closeStartupByOpController = new CloseStartupByOpController();

export { closeStartupByOpController };
