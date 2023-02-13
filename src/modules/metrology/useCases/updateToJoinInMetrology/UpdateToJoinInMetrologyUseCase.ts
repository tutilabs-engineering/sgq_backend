import { IMetrologyHistoryRepository } from "@modules/metrology/repositories/IMetrologyHistoryRepository";
import { IMetrologyRepository } from "@modules/metrology/repositories/IMetrologyRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { UserValidations } from "@shared/errors/factoryValidations/account/validations/UserValidations";
interface IRequest {
  startup: string;
  user: string;
}
@injectable()
class UpdateToJoinInMetrologyUseCase {
  constructor(
    @inject("MetrologyRepositoryInPrisma")
    private metrologyRepositoryInPrisma: IMetrologyRepository,
    @inject("MetrologyHistoryRepositoryInPrisma")
    private metrologyHistoryRepositoryInPrisma: IMetrologyHistoryRepository,
  ) {}
  async execute({ startup, user }: IRequest): Promise<void> {
    const { UserExistsValidations } = UserValidations();
    const userExistsValidations = await UserExistsValidations(user);
    if (!userExistsValidations.status) {
      throw new AppError(
        userExistsValidations.message,
        userExistsValidations.statusCode,
      );
    }

    // Verify exist anymore metrology in startup
    const allMetrology =
      await this.metrologyRepositoryInPrisma.findByMetrologyAllVariables(
        startup,
      );
    if (allMetrology.length <= 0) {
      throw new AppError("Startup Metrology not found", 404);
    }
    // Verify status of edit metrology
    if (!allMetrology[0].metrology) {
      throw new AppError(
        "Startup metrology has already been performed by a user",
        401,
      );
    }

    // Verify if Startup does have anyone joined
    if (allMetrology[0].metrologyHistory) {
      throw new AppError(
        "Metrology already has someone associated with this startup",
        401,
      );
    }

    const metrologyHistory =
      await this.metrologyHistoryRepositoryInPrisma.create(user);

    if (!metrologyHistory) {
      throw new AppError("Metrology History not created", 404);
    }

    await this.metrologyRepositoryInPrisma.updateToJoinMetrology({
      startup,
      fk_metrologyHistory: metrologyHistory.id,
    });
  }
}

export { UpdateToJoinInMetrologyUseCase };
