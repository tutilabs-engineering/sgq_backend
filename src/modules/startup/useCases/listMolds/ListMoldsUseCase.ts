import { Machine } from "@modules/startup/entities/Machine";
import { IMoldsRepository } from "@modules/startup/repositories/IMoldsRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class ListMoldsUseCase {
  constructor(
    @inject("MoldsRepositoryInPrisma")
    private moldsRepositoryInPrisma: IMoldsRepository,
  ) {}
  async execute(): Promise<Machine[]> {
    const molds = await this.moldsRepositoryInPrisma.listMold();

    if (!molds) {
      throw new AppError("Does not exists any mold registered");
    }

    return molds;
  }
}
