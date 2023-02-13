import { MetrologySolicitation } from "@modules/metrology/entities/MetrologySolicitation";
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
class ListMetrologySolicitationsUseCase {
  constructor(
    @inject("MetrologyRepositoryInPrisma")
    private metrologyRepositoryInPrisma: IMetrologyRepository,
  ) {}

  async execute({user}:IRequest): Promise<MetrologySolicitation[]> {
    const list =
      await this.metrologyRepositoryInPrisma.listMetrologyOfStartup(user.unity.id);
    return list;
  }
}

export { ListMetrologySolicitationsUseCase };
