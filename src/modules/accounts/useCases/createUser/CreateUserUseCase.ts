import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { UserValidations } from "@shared/errors/factoryValidations/account/validations/UserValidations";

interface IRequest {
  name: string;
  email: string;
  cpf: string;
  register: string;
  fk_role: number;
  fk_unity: number;
  fk_office_hour: number;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepositoryInPrisma")
    private usersRepositoryInPrisma: IUsersRepository,
  ) {}

  async execute({
    name,
    email,
    cpf,
    register,
    fk_role,
    fk_unity,
    fk_office_hour,
  }: IRequest): Promise<void> {
    const {
      CpfValidations,
      RegisterValidations,
      NameValidations,
      RoleValidations,
      UnityValidations,
      OfficeHourValidations,
    } = UserValidations();

    const cpfValidations = await CpfValidations(cpf);
    const registerValidations = await RegisterValidations(register);
    const nameValidations = await NameValidations(name);
    const roleValidations = await RoleValidations(fk_role);
    const unityValidations = await UnityValidations(fk_unity);
    const officeHourValidations = await OfficeHourValidations(fk_office_hour);

    if (!nameValidations.status) {
      throw new AppError(nameValidations.message);
    }
    if (!cpfValidations.status) {
      throw new AppError(cpfValidations.message);
    }
    if (!registerValidations.status) {
      throw new AppError(registerValidations.message);
    }
    if (!roleValidations.status) {
      throw new AppError(roleValidations.message, roleValidations.statusCode);
    }
    if (!unityValidations.status) {
      throw new AppError(unityValidations.message, unityValidations.statusCode);
    }
    if (!officeHourValidations.status) {
      throw new AppError(
        officeHourValidations.message,
        officeHourValidations.statusCode,
      );
    }

    // const acceptName = name.normalize("NFD").replace(/[^a-zA-Zs]/, "");

    const defaultPassword = `${name.split(" ")[0].toUpperCase()}@${register}`;

    const passwordHash = await hash(defaultPassword, 8);

    const user = {
      name,
      email,
      password: passwordHash,
      cpf,
      register,
      fk_role: parseInt(fk_role.toString(), 10),
      fk_unity: parseInt(fk_unity.toString(), 10),
      fk_office_hour: parseInt(fk_office_hour.toString(), 10),
    };

    await this.usersRepositoryInPrisma.createUser(user);
  }
}

export { CreateUserUseCase };
