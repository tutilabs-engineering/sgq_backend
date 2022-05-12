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
class UpdateToFinalizeMetrologyUseCase {
  constructor(
    @inject("MetrologyRepositoryInPrisma")
    private metrologyRepositoryInPrisma: IMetrologyRepository,
    @inject("MetrologyHistoryRepositoryInPrisma")
    private metrologyHistoryRepositoryInPrisma: IMetrologyHistoryRepository,
  ) {}

  async execute({ startup, user }: IRequest): Promise<void> {
    const { UserExistsValidations } = UserValidations();
    // Verify all ready exist user
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

    // Verify if Startup does have anyone joined
    if (!allMetrology[0].metrologyHistory) {
      throw new AppError("Startup does not have anyone joined", 401);
    }
    // Verify status of edit metrology
    if (!allMetrology[0].metrology) {
      throw new AppError(
        "Startup metrology has already been performed by a user",
        401,
      );
    }
    // Verify if user associated user is equals user finalized
    if (user !== allMetrology[0].metrologyHistory.user.id) {
      throw new AppError(
        "The startup metrology can only be finalized by the associated user",
        401,
      );
    }
    // Verify if Startup has values that exceed the limits of variables
    allMetrology.map((item) => {
      if (item.value < item.variable.min || item.value > item.variable.max) {
        throw new AppError(
          "The Startup metrology has values that exceed the limits",
          401,
        );
      }
      return null;
    });

    const { id } = allMetrology[0].metrologyHistory;
    await this.metrologyHistoryRepositoryInPrisma.finish(id);
    await this.metrologyRepositoryInPrisma.updateToFinalizeMetrology(startup);
  }
}

export { UpdateToFinalizeMetrologyUseCase };
