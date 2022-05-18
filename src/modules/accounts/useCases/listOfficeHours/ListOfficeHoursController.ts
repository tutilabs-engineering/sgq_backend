import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListOfficeHoursUseCase } from "./ListOfficeHoursUseCase";

class ListOfficeHoursController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listOfficeHours = container.resolve(ListOfficeHoursUseCase);
    const allOfficeHours = await listOfficeHours.execute();
    return response.status(200).json(allOfficeHours);
  }
}

const listOfficeHoursController = new ListOfficeHoursController();

export { listOfficeHoursController };
