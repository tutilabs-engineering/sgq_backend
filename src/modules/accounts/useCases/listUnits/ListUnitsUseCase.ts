import { Unity } from "@modules/accounts/entities/Unity";
import { IUnitsRepository } from "@modules/accounts/repositories/IUnityRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListUnitsUseCase {
  constructor(
    @inject("UnitsRepositoryInPrisma")
    private unitsRepositoryInPrisma: IUnitsRepository,
  ) {}
  async execute(): Promise<Unity[]> {
    try {
      const units = await this.unitsRepositoryInPrisma.listAllUnits();
      return units;
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export { ListUnitsUseCase };
