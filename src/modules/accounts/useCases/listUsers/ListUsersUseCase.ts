import { IListUserDTO } from "@modules/accounts/dtos/IListUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListUsersUseCase {
  constructor(
    @inject("UsersRepositoryInPrisma")
    private usersRepositoryInPrisma: IUsersRepository,
  ) {}
  async execute(): Promise<IListUserDTO[]> {
    try {
      const users = await this.usersRepositoryInPrisma.listAllUsers();
      return users;
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export { ListUsersUseCase };
