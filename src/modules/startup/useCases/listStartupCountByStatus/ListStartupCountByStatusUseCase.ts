import { IReportStartupRepository } from "@modules/startup/repositories/IReportStartupRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  skip: number;
  take: number;
  status: number;
}
@injectable()
class ListStartupCountByStatusUseCase {
  constructor(
    @inject("ReportStartupsInPrisma")
    private reportStartupsInPrisma: IReportStartupRepository,
  ) {}
  async execute({ skip, take, status }: IRequest) {
    const data = await this.reportStartupsInPrisma.findAllByStatus(
      skip,
      take,
      status,
    );

    const listAllStartups = data.allStartups;

    // let approvedCount = 0;
    // let disapprovedCount = 0;
    // let conditionalCount = 0;
    // let closedCount = 0;

    // const listOfApproved = [];
    // const listOfDisapproved = [];
    // const listOfConditional = [];
    // const listOfClosed = [];

    // listAllStartups.forEach((startup) => {
    //   if (startup.status.id === 1) {
    //     approvedCount += 1;
    //     listOfApproved.push(startup);
    //   }
    //   if (startup.status.id === 2) {
    //     disapprovedCount += 1;
    //     listOfDisapproved.push(startup);
    //   }
    //   if (startup.status.id === 3) {
    //     conditionalCount += 1;
    //     listOfConditional.push(startup);
    //   }

    //   if (startup.open === false) {
    //     closedCount += 1;
    //     listOfClosed.push(startup);
    //   }
    // });

    // const CountStartupsByStatus = {
    //   approved: approvedCount,
    //   disapproved: disapprovedCount,
    //   conditional: conditionalCount,
    //   closed: closedCount,
    //   reportStartups: {
    //     approved: listOfApproved,
    //     disapproved: listOfDisapproved,
    //     conditional: listOfConditional,
    //     closed: listOfClosed,
    //   },
    // };

    return { all: data.all._all, listAllStartups };
  }
}

export { ListStartupCountByStatusUseCase };
