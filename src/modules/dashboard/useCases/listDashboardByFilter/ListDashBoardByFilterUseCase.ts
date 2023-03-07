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
    workShift,
  }: IListAllDataFilter): Promise<any> {
    let hourEnd = "";
    let hourStart = "";
    let dataQuery = ""
    switch (workShift) {
      case 1:
        hourStart = "06:00:00";
        hourEnd = "13:59:00";
        break;

      case 2:
        hourStart = "14:00:00";
        hourEnd = "21:59:00";
        break;

      case 3:
        hourStart = "22:00:00";
        hourEnd = "23:59:00";
        dataQuery = "or cast(rs.start_time as time) BETWEEN '00:00:00' and '05:59:00'"

        break;

      default:
        hourStart = "00:00:00";
        hourEnd = "24:00:00";
        break;
    }

    const dayEnd = dayjs(day).add(6, "day").format("YYYY-MM-DD");

    const data =
      await this.dashboardRepositoryInPrisma.listAllDataFilterByStartup({
        machine,
        code_product,
        code_client,
        day,
        dayEnd,
        hourEnd,
        hourStart,
        dataQuery
      });


    const dataMetrology =
      await this.dashboardRepositoryInPrisma.listAllDataFilterByMetrology({
        day,
        dayEnd,
        hourEnd,
        hourStart,
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
