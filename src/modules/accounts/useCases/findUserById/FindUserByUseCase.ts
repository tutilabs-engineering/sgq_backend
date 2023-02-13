import { IListUserDTO } from "@modules/accounts/dtos/IListUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { UserValidations } from "@shared/errors/factoryValidations/account/validations/UserValidations";

@injectable()
class FindUserByIdUseCase {
  constructor(
    @inject("UsersRepositoryInPrisma")
    private usersRepositoryInPrisma: IUsersRepository,
  ) {}

  async execute(id: string): Promise<IListUserDTO> {
    const { UserExistsValidations } = UserValidations();

    const userExistsValidations = await UserExistsValidations(id);

    if (!userExistsValidations.status) {
      throw new AppError(
        userExistsValidations.message,
        userExistsValidations.statusCode,
      );
    }

    const user = await this.usersRepositoryInPrisma.findById(id);
    return user;
  }
}

export { FindUserByIdUseCase };
