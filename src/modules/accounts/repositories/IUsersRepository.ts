import { IChangeStatusDTO } from "../dtos/IChangeStatusDTO";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IListUserDTO } from "../dtos/IListUserDTO";
import { INewPasswordDTO } from "../dtos/INewPasswordDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { IUserPasswordDTO } from "../dtos/IUserPasswordDTO";
import { User } from "../entities/User";

interface IUsersRepository {
  createUser(data: ICreateUserDTO): Promise<void>;
  listAllUsers(): Promise<IListUserDTO[]>;
  findById(id: string): Promise<IListUserDTO>;
  findByEmail(email: string): Promise<User>;
  findByRegister(register: string): Promise<User>;
  findByCpf(cpf: string): Promise<User>;
  changeStatus(data: IChangeStatusDTO): Promise<void>;
  findByName(name: string): Promise<User>;
  deleteUser(id: string): Promise<void>;
  updateUser(data: IUpdateUserDTO): Promise<void>;
  changePassword(data: INewPasswordDTO): Promise<void>;
  showPassword(id: string): Promise<IUserPasswordDTO>;
}

export { IUsersRepository };
