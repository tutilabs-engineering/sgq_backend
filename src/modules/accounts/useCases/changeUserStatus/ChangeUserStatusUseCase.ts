import { IChangeStatusDTO } from "@modules/accounts/dtos/IChangeStatusDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { injectable, inject } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { UserValidations } from "@shared/errors/factoryValidations/account/validations/UserValidations";

@injectable()
class ChangeUserStatusUseCase {
  constructor(
    @inject("UsersRepositoryInPrisma")
    private usersRepositoryInPrisma: IUsersRepository,
  ) {}

  async execute({ id, is_enabled }: IChangeStatusDTO): Promise<void> {
    const { ChangeStatusUserValidations, UserExistsValidations } =
      UserValidations();

    const user = {
      id,
      is_enabled,
    };

    const changeStatusUserValidations = await ChangeStatusUserValidations(user);
    const userExistsValidations = await UserExistsValidations(user.id);

    if (!changeStatusUserValidations.status) {
      throw new AppError(changeStatusUserValidations.message);
    }
    if (!userExistsValidations.status) {
      throw new AppError(
        userExistsValidations.message,
        userExistsValidations.statusCode,
      );
    }

    await this.usersRepositoryInPrisma.changeStatus(user);
  }
}

export { ChangeUserStatusUseCase };
