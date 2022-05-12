import { IListMetrologyHistory } from "@modules/metrology/dtos/IListMetrologyHistory";
import { MetrologyHistory } from "@modules/metrology/entities/MetrologyHistory";
import { prismaAgent } from "@shared/database/prismaAgent";
import { IMetrologyHistoryRepository } from "../IMetrologyHistoryRepository";

class MetrologyHistoryRepositoryInPrisma
  implements IMetrologyHistoryRepository
{
  async finish(id: string): Promise<void> {
    await prismaAgent.metrologyHistory.updateMany({
      where: { id },
      data: { endDate: new Date() },
    });
  }
  async create(fk_user: string): Promise<MetrologyHistory> {
    const result = await prismaAgent.metrologyHistory.create({
      data: {
        fk_user,
        startDate: new Date(),
        endDate: null,
      },
    });

    return result;
  }
}

export { MetrologyHistoryRepositoryInPrisma };
