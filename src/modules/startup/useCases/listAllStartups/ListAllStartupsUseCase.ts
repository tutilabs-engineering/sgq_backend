import { IListAllStartupsDTO } from "@modules/startup/dtos/IListAllStartupsDTO";
import { IReportStartupRepository } from "@modules/startup/repositories/IReportStartupRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListAllStartupsUseCase {
  constructor(
    @inject("ReportStartupsInPrisma")
    private reportStartupsInPrisma: IReportStartupRepository,
  ) {}
  async execute(): Promise<IListAllStartupsDTO[]> {
    try {
      const allStartups = await this.reportStartupsInPrisma.findAll();
      return allStartups;
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export { ListAllStartupsUseCase };
