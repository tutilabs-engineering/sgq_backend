import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { UserValidations } from "@shared/errors/factoryValidations/account/validations/UserValidations";

interface IRequest {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  register: string;
  fk_role: number;
  fk_unity: number;
}

@injectable()
class UpdateUseUseCase {
  constructor(
    @inject("UsersRepositoryInPrisma")
    private usersRepositoryInPrisma: IUsersRepository,
  ) {}

  async execute({
    id,
    name,
    email,
    cpf,
    register,
    fk_role,
    fk_unity,
  }: IRequest): Promise<void> {
    const userUpdated = {
      id,
      name,
      email,
      cpf,
      register,
      fk_role: parseInt(fk_role.toString(), 10),
      fk_unity: parseInt(fk_unity.toString(), 10),
    };

    const { UpdateUserFieldsValidations, CompareDataForUpdateValidations } =
      UserValidations();

    const updateUserFieldsValidations = await UpdateUserFieldsValidations(
      userUpdated,
    );

    const compareDataForUpdateValidations =
      await CompareDataForUpdateValidations({ id, name, email, cpf, register });

    if (!updateUserFieldsValidations.status) {
      throw new AppError(updateUserFieldsValidations.message);
    }

    if (!compareDataForUpdateValidations.status) {
      throw new AppError(compareDataForUpdateValidations.message);
    }

    await this.usersRepositoryInPrisma.updateUser(userUpdated);
  }
}

export { UpdateUseUseCase };
