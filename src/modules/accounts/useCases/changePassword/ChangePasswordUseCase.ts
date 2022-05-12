import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { compare, hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

interface IResquest {
  id: string;
  currentPassword?: string;
  newPassword?: string;
}

@injectable()
class ChangePasswordUseCase {
  constructor(
    @inject("UsersRepositoryInPrisma")
    private usersRepositoryInPrisma: IUsersRepository,
  ) {}
  async execute({
    id,
    currentPassword,
    newPassword,
  }: IResquest): Promise<void> {
    const user = await this.usersRepositoryInPrisma.showPassword(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const passwordMatch = await compare(currentPassword, user.password);

    if (!passwordMatch) {
      throw new AppError("Password Incorrect");
    }

    const newPasswordHash = await hash(newPassword, 8);

    await this.usersRepositoryInPrisma.changePassword({
      id,
      newPassword: newPasswordHash,
    });
  }
}

export { ChangePasswordUseCase };
