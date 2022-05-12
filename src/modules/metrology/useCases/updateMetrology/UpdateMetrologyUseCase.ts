import { ILogMetrology } from "@modules/metrology/dtos/ILogMetrology";
import { IMetrologyRepository } from "@modules/metrology/repositories/IMetrologyRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { UserValidations } from "@shared/errors/factoryValidations/account/validations/UserValidations";

interface IRequest {
  startup: string;
  user: string;
  metrology: {
    id: string;
    value: number;
  }[];
}

@injectable()
class UpdateMetrologyUseCase {
  constructor(
    @inject("MetrologyRepositoryInPrisma")
    private metrologyRepositoryInPrisma: IMetrologyRepository,
  ) {}

  async execute({
    metrology,
    startup,
    user,
  }: IRequest): Promise<ILogMetrology[]> {
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

    const log = [];

    Promise.all(
      metrology.map((element) => {
        const metrology = allMetrology.find(
          (metrologyDB) => element.id === metrologyDB.id,
        );

        let msg: object;
        if (metrology) {
          if (
            element.value <= metrology.variable.max &&
            element.value >= metrology.variable.min
          ) {
            this.metrologyRepositoryInPrisma.updateMetrology(
              element.value,
              element.id,
            );

            msg = {
              variable: metrology.variable,
              message: "metrology updated",
              status_code: 200,
            };
          } else {
            msg = {
              variable: metrology.variable,
              message: "doesn't meet the min or max",
              status_code: 401,
            };
            // throw new AppError(
            //   `variable '${metrology.variable.description}' doesn't meet the min or max`,
            //   401,
            // );
          }
        } else {
          throw new AppError(
            `variable ${element.id} not exist in startup metrology`,
            404,
          );
        }

        return log.push({
          variableSearch: element.id,
          variableResult: msg,
        });
      }),
    );

    return log;
  }
}

export { UpdateMetrologyUseCase };
