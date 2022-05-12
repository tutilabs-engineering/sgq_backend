import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { UserValidations } from "@shared/errors/factoryValidations/account/validations/UserValidations";

interface IRequest {
  id: string;
}

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject("UsersRepositoryInPrisma")
    private usersRepositoryInPrisma: IUsersRepository,
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const { UserExistsValidations } = UserValidations();

    const userExists = await UserExistsValidations(id);

    if (!userExists.status) {
      throw new AppError(userExists.message, userExists.statusCode);
    }

    await this.usersRepositoryInPrisma.deleteUser(id);
  }
}

export { DeleteUserUseCase };
