import { IDashboardRepository } from "@modules/dashboard/repositories/IDashboardRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListDataToFilterUseCase {
  constructor(
    @inject("DashboardRepositoryInPrisma")
    private dashboardRepositoryInPrisma: IDashboardRepository,
  ) {}

  async execute() {
    const listMachine =
      await this.dashboardRepositoryInPrisma.listAllDataMachine();
    const listProduct =
      await this.dashboardRepositoryInPrisma.listAllDataCodeProduct();
    const listClient =
      await this.dashboardRepositoryInPrisma.listAllDataClient();
    return { listMachine, listProduct, listClient };
  }
}

export { ListDataToFilterUseCase };
