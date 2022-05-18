import { IChangeStatusDTO } from "@modules/accounts/dtos/IChangeStatusDTO";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IListUserDTO } from "@modules/accounts/dtos/IListUserDTO";
import { INewPasswordDTO } from "@modules/accounts/dtos/INewPasswordDTO";
import { IUpdateUserDTO } from "@modules/accounts/dtos/IUpdateUserDTO";
import { IUserPasswordDTO } from "@modules/accounts/dtos/IUserPasswordDTO";
import { User } from "@modules/accounts/entities/User";
import { prismaAgent } from "@shared/database/prismaAgent";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInPrisma implements IUsersRepository {
  async showPassword(id: string): Promise<IUserPasswordDTO> {
    const userPassword = await prismaAgent.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        password: true,
      },
    });

    return userPassword;
  }

  async changePassword({ id, newPassword }: INewPasswordDTO): Promise<void> {
    await prismaAgent.user.update({
      where: { id },
      data: {
        password: newPassword,
      },
    });
  }

  async updateUser({
    id,
    name,
    email,
    register,
    cpf,
    fk_role,
    fk_unity,
    fk_office_hour,
  }: IUpdateUserDTO): Promise<void> {
    await prismaAgent.user.update({
      where: { id },
      data: {
        name,
        email,
        register,
        cpf,
        fk_role,
        fk_unity,
        fk_office_hour,
      },
    });
  }

  async deleteUser(id: string): Promise<void> {
    await prismaAgent.user.delete({ where: { id } });
  }
  async findByName(name: string): Promise<User> {
    const user = await prismaAgent.user.findFirst({ where: { name } });
    return user;
  }
  async findByCpf(cpf: string): Promise<User> {
    const user = await prismaAgent.user.findUnique({ where: { cpf } });
    return user;
  }
  async createUser({
    name,
    email,
    cpf,
    password,
    register,
    fk_role,
    fk_unity,
    fk_office_hour,
  }: ICreateUserDTO): Promise<void> {
    await prismaAgent.user.create({
      data: {
        name,
        email,
        cpf,
        password,
        register,
        role: {
          connect: {
            id: fk_role,
          },
        },
        unity: {
          connect: {
            id: fk_unity,
          },
        },
        office_hour: {
          connect: {
            id: fk_office_hour,
          },
        },
      },
    });
  }

  async listAllUsers(): Promise<IListUserDTO[]> {
    const allUsers = await prismaAgent.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        is_enabled: true,
        cpf: true,
        register: true,
        role: {
          select: {
            id: true,
            description: true,
          },
        },
        unity: {
          select: {
            id: true,
            name: true,
          },
        },
        office_hour: true,
      },
    });
    return allUsers;
  }

  async findById(id: string): Promise<IListUserDTO> {
    const user = await prismaAgent.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        is_enabled: true,
        cpf: true,
        register: true,
        role: {
          select: {
            id: true,
            description: true,
          },
        },
        unity: {
          select: {
            id: true,
            name: true,
          },
        },
        office_hour: true,
      },
    });
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await prismaAgent.user.findUnique({ where: { email } });
    return user;
  }

  async findByRegister(register: string): Promise<User> {
    const user = await prismaAgent.user.findUnique({
      where: { register },
    });
    return user;
  }

  async changeStatus({ id, is_enabled }: IChangeStatusDTO): Promise<void> {
    await prismaAgent.user.update({
      where: { id },
      data: { is_enabled },
    });
  }
}

export { UsersRepositoryInPrisma };
