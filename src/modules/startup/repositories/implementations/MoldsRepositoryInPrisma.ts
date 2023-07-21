import { Mold } from "@modules/startup/entities/Mold";
import { prismaAgent } from "@shared/database/prismaAgent";
import { IMoldsRepository } from "../IMoldsRepository";

export class MoldsRepositoryInPrisma implements IMoldsRepository {
  async createMold(description: string, is_family: boolean): Promise<void> {
    await prismaAgent.mold.create({
      data: {
        description,
        is_family
      },
    });
  }
  async findMoldByDescription(description: string): Promise<Mold> {
    return prismaAgent.mold.findFirst({
      where: {
        description,
      },
    });
  }
  async listMold(): Promise<Mold[]> {
    return prismaAgent.mold.findMany();
  }
}
