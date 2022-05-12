/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { IListAllDataFilter } from "@modules/dashboard/dtos/IListAllDataFilter";
import { IDashboardRepository } from "@modules/dashboard/repositories/IDashboardRepository";
import { IMetrologyRepository } from "@modules/metrology/repositories/IMetrologyRepository";
import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

@injectable()
class ListDashBoardByFilterUseCase {
  constructor(
    @inject("DashboardRepositoryInPrisma")
    private dashboardRepositoryInPrisma: IDashboardRepository,
    @inject("MetrologyRepositoryInPrisma")
    private metrologyRepositoryInPrisma: IMetrologyRepository,
  ) {}

  async execute({
    machine = "",
    code_product = "",
    code_client = "",
    day,
  }: IListAllDataFilter): Promise<any> {
    const dayEnd = dayjs(day).add(6, "day").format("YYYY-MM-DD");
    const data =
      await this.dashboardRepositoryInPrisma.listAllDataFilterByStartup({
        machine,
        code_product,
        code_client,
        day,
        dayEnd,
      });

    const dataMetrology =
      await this.dashboardRepositoryInPrisma.listAllDataFilterByMetrology({
        day,
        dayEnd,
      });

    const period = [];
    let indexDate = dayjs(day).format("YYYY-MM-DD");

    // Start-up
    while (indexDate <= dayEnd) {
      // eslint-disable-next-line no-loop-func
      const dataFind = data.find((item) => {
        const data = dayjs(item.start_time);
        if (data.format("YYYY-MM-DD") === indexDate) {
          return item;
        }
      });

      // eslint-disable-next-line no-loop-func
      const dataFindMetrology = dataMetrology.find((item) => {
        const data = dayjs(item.date);
        if (data.format("YYYY-MM-DD") === indexDate) {
          return item;
        }
      });

      period.push({
        date: indexDate,
        startup: dataFind || { quantitystartup: 0, time: 0, start_time: 0 },
        metrology: dataFindMetrology || {
          quantitymetrology: 0,
          time: 0,
          date: 0,
        },
      });

      indexDate = dayjs(indexDate).add(1, "day").format("YYYY-MM-DD");
    }

    return period;
  }
}

export { ListDashBoardByFilterUseCase };
