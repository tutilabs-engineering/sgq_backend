import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  register: string;
  password: string;
}

interface IResponse {
  token: string;
  user: {
    id: string;
    name: string;
    register: string;
    role: number;
    unity: number;
  };
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepositoryInPrisma")
    private usersRepositoryInPrisma: IUsersRepository,
  ) {}

  async execute({ register, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepositoryInPrisma.findByRegister(register);

    if (!user) {
      throw new AppError("register or password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!user.is_enabled) {
      throw new AppError("User is disabled");
    }
    if (!passwordMatch) {
      throw new AppError("register or password incorrect");
    }

   const token = sign({
      id: user.id,
      name: user.name,
      emai: user.email,
      register: user.register,
      fk_role: user.fk_role,
      fk_unity: user.fk_unity,
    }, process.env.SECRET, {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        id: user.id,
        name: user.name,
        register: user.register,
        role: user.fk_role,
        unity: user.fk_unity,
      },
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
