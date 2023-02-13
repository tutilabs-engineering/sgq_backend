import { Unity } from "@modules/accounts/entities/Unity";
import { prismaAgent } from "@shared/database/prismaAgent";
import { IUnitsRepository } from "../IUnityRepository";

class UnitsRepositoryInPrisma implements IUnitsRepository {
  async listAllUnits(): Promise<Unity[]> {
    return prismaAgent.unity.findMany();
  }

  async findById(id: number): Promise<Unity> {
    return prismaAgent.unity.findUnique({
      where: {
        id,
      },
    });
  }
}

export { UnitsRepositoryInPrisma };
