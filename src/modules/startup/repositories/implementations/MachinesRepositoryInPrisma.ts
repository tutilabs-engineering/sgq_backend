import { Machine } from "@modules/startup/entities/Machine";
import { prismaAgent } from "@shared/database/prismaAgent";
import { IMachinesRepository } from "../IMachinesRepository";

export class MachinesRepositoryInPrisma implements IMachinesRepository {
  async createMachine(description: string): Promise<void> {
    await prismaAgent.machines.create({
      data: {
        description,
      },
    });
  }
  async findMachineByDescription(description: string): Promise<Machine> {
    return prismaAgent.machines.findFirst({
      where: {
        description,
      },
    });
  }
  async listMachines(): Promise<Machine[]> {
    return prismaAgent.machines.findMany();
  }
}
