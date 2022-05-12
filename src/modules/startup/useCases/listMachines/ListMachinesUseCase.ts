import { Machine } from "@modules/startup/entities/Machine";
import { IMachinesRepository } from "@modules/startup/repositories/IMachinesRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class ListMachinesUseCase {
  constructor(
    @inject("MachinesRepositoryInPrisma")
    private machinesRepositoryInPrisma: IMachinesRepository,
  ) {}
  async execute(): Promise<Machine[]> {
    const machines = await this.machinesRepositoryInPrisma.listMachines();

    if (!machines) {
      throw new AppError("Does not exists any machine registered");
    }

    return machines;
  }
}
