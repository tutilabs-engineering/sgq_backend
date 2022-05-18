import { IOfficeHoursRepository } from "@modules/accounts/repositories/IOfficeHoursRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { OfficeHour } from "../../entities/OfficeHour";

@injectable()
export class ListOfficeHoursUseCase {
  constructor(
    @inject("OfficeHoursRepositoryInPrisma")
    private officeHoursRepositoryInPrisma: IOfficeHoursRepository,
  ) {}
  async execute(): Promise<OfficeHour[]> {
    try {
      const officeHours =
        await this.officeHoursRepositoryInPrisma.listOfficeHours();
      return officeHours;
    } catch (error) {
      throw new AppError(error);
    }
  }
}
