import { MetrologySolicitation } from "@modules/metrology/entities/MetrologySolicitation";
import { IMetrologyRepository } from "@modules/metrology/repositories/IMetrologyRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListMetrologySolicitationsUseCase {
  constructor(
    @inject("MetrologyRepositoryInPrisma")
    private metrologyRepositoryInPrisma: IMetrologyRepository,
  ) {}

  async execute(): Promise<MetrologySolicitation[]> {
    const list =
      await this.metrologyRepositoryInPrisma.listMetrologyOfStartup();
    return list;
  }
}

export { ListMetrologySolicitationsUseCase };
