import { IReportStartupRepository } from "@modules/startup/repositories/IReportStartupRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListStartupCountByStatusUseCase {
  constructor(
    @inject("ReportStartupsInPrisma")
    private reportStartupsInPrisma: IReportStartupRepository,
  ) {}
  async execute() {
    const listAllStartups = await this.reportStartupsInPrisma.findAll();

    let approvedCount = 0;
    let disapprovedCount = 0;
    let conditionalCount = 0;
    let closedCount = 0;

    const listOfApproved = [];
    const listOfDisapproved = [];
    const listOfConditional = [];
    const listOfClosed = [];

    listAllStartups.forEach((startup) => {
      if (startup.status.id === 1) {
        approvedCount += 1;
        listOfApproved.push(startup);
      }
      if (startup.status.id === 2) {
        disapprovedCount += 1;
        listOfDisapproved.push(startup);
      }
      if (startup.status.id === 3) {
        conditionalCount += 1;
        listOfConditional.push(startup);
      }

      if (startup.open === false) {
        closedCount += 1;
        listOfClosed.push(startup);
      }
    });

    const CountStartupsByStatus = {
      approved: approvedCount,
      disapproved: disapprovedCount,
      conditional: conditionalCount,
      closed: closedCount,
      reportStartups: {
        approved: listOfApproved,
        disapproved: listOfDisapproved,
        conditional: listOfConditional,
        closed: listOfClosed,
      },
    };

    return CountStartupsByStatus;
  }
}

export { ListStartupCountByStatusUseCase };
