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
  async execute(
    skip?: number,
    take?: number,
    fk_op?: number,
    status?: number,
  ): Promise<IListAllStartupsDTO[]> {
    let condition: any = {
      OR: [
        {
          open: true,
          filled: false,
        },
        {
          open: true,
          filled: true,
        },
      ],
    };
    if (status === 1) {
      condition = {
        open: false,
        filled: true,
      };
    }

    try {
      const data = await this.reportStartupsInPrisma.findAll(
        skip,
        take,
        fk_op || undefined,
        condition,
      );

      return {
        all: data.all._all,
        all_open_startup: data.all_open_startup._all,
        all_reproved: data.all_reproved._all,
        all_closed: data.all_closed._all,
        all_approved_with_condition: data.all_approved_with_condition._all,
        all_approved: data.all_approved._all,
        list: data.allStartups,
      };
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export { ListAllStartupsUseCase };
