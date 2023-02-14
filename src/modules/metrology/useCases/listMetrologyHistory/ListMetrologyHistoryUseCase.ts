import { MetrologyHistory } from "@modules/metrology/entities/MetrologyHistory";
import { IMetrologyRepository } from "@modules/metrology/repositories/IMetrologyRepository";
import { inject, injectable } from "tsyringe";
interface IRequest {
  user:{
    id: string,
    unity?:{
      id: number,
      name: string
    }
  }
}
@injectable()
class ListMetrologyHistoryUseCase {
  constructor(
    @inject("MetrologyRepositoryInPrisma")
    private metrologyRepositoryInPrisma: IMetrologyRepository,
  ) {}

  async execute({user}:IRequest): Promise<MetrologyHistory[]> {
    const list =
      await this.metrologyRepositoryInPrisma.listMetrologyHistoryOfStartup(user.unity.id);
    return list;
  }
}

export { ListMetrologyHistoryUseCase };
