import { MetrologyHistory } from "@modules/metrology/entities/MetrologyHistory";
import { IMetrologyRepository } from "@modules/metrology/repositories/IMetrologyRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListMetrologyHistoryUseCase {
  constructor(
    @inject("MetrologyRepositoryInPrisma")
    private metrologyRepositoryInPrisma: IMetrologyRepository,
  ) {}

  async execute(): Promise<MetrologyHistory[]> {
    const list =
      await this.metrologyRepositoryInPrisma.listMetrologyHistoryOfStartup();
    return list;
  }
}

export { ListMetrologyHistoryUseCase };
