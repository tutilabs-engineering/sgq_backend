import { IReportStartupRepository } from "@modules/startup/repositories/IReportStartupRepository";
import { inject, injectable } from "tsyringe";
interface IRequest {
  start_time: Date;
  end_time: Date;
}
@injectable()
class ListStartupFilterCountUseCase {
  constructor(
    @inject("ReportStartupsInPrisma")
    private reportStartupsInPrisma: IReportStartupRepository,
  ) {}
  async execute({ start_time, end_time }: IRequest) {
    const listAllStartups =
      await this.reportStartupsInPrisma.findAllFilterByCount(
        start_time,
        end_time,
      );

    let approvedCount = 0;
    let disapprovedCount = 0;
    let conditionalCount = 0;
    let closedCount = 0;

    listAllStartups.forEach((startup) => {
      if (startup.status.id === 1) {
        approvedCount += 1;
      }
      if (startup.status.id === 2) {
        disapprovedCount += 1;
      }
      if (startup.status.id === 3) {
        conditionalCount += 1;
      }
      if (startup.open === false) {
        closedCount += 1;
      }
    });
    return {
      approved: approvedCount,
      disapproved: disapprovedCount,
      conditional: conditionalCount,
      closed: closedCount,
    };
  }
}

export { ListStartupFilterCountUseCase };
