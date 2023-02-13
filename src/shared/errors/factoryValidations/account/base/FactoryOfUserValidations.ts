import { RolesRepositoryInPrisma } from "@modules/accounts/repositories/implementations/RolesRepositoryInPrisma";
import { UsersRepositoryInPrisma } from "@modules/accounts/repositories/implementations/UsersRepositoryInPrisma";
import validator from "validator";

const usersRepositoryInPrisma = new UsersRepositoryInPrisma();
const rolesRepositoryInPrisma = new RolesRepositoryInPrisma();

interface IDataForUpdate {
  name: string;
  email: string;
  cpf: string;
  register: string;
}

interface ICompareData {
  id: string;

  data: IDataForUpdate;
}

function FactoryOfUserValidations() {
  async function IsEmail(email: string): Promise<boolean> {
    const response = validator.isEmail(email);
    return response;
  }

  async function EmailAlreadyExists(email: string): Promise<boolean> {
    const response = await usersRepositoryInPrisma.findByEmail(email);
    if (response) {
      return true;
    }
    return false;
  }

  async function RegisterAlreadyExists(register: string): Promise<boolean> {
    const response = await usersRepositoryInPrisma.findByRegister(register);
    if (response) {
      return true;
    }
    return false;
  }

  async function CpfAlreadyExits(cpf: string): Promise<boolean> {
    const response = await usersRepositoryInPrisma.findByCpf(cpf);
    if (response) {
      return true;
    }
    return false;
  }

  async function RoleExists(fk_role: number): Promise<boolean> {
    const response = await rolesRepositoryInPrisma.findRoleById(fk_role);
    if (response) {
      return true;
    }
    return false;
  }

  async function NameAlreadyExists(name: string): Promise<boolean> {
    const response = await usersRepositoryInPrisma.findByName(name);
    if (response) {
      return true;
    }
    return false;
  }

  async function VerifyUserExistsById(id: string): Promise<boolean> {
    const response = await usersRepositoryInPrisma.findById(id);
    if (response) {
      return true;
    }
    return false;
  }

  async function VerifyNameForUpdate({
    id,
    data,
  }: ICompareData): Promise<boolean> {
    const user = await usersRepositoryInPrisma.findById(id);

    if (user.name === data.name) {
      return true;
    }

    const userByName = await usersRepositoryInPrisma.findByName(data.name);

    if (userByName) {
      return false;
    }
    return true;
  }

  async function VerifyEmailForUpdate({
    id,
    data,
  }: ICompareData): Promise<boolean> {
    const user = await usersRepositoryInPrisma.findById(id);

    if (user.email === data.email) {
      return true;
    }

    const userByEmail = await usersRepositoryInPrisma.findByEmail(data.email);

    if (userByEmail) {
      return false;
    }
    return true;
  }

  async function VerifyCpfForUpdate({
    id,
    data,
  }: ICompareData): Promise<boolean> {
    const user = await usersRepositoryInPrisma.findById(id);

    if (user.cpf === data.cpf) {
      return true;
    }

    const userByCpf = await usersRepositoryInPrisma.findByCpf(data.cpf);

    if (userByCpf) {
      return false;
    }
    return true;
  }

  async function VerifyRegisterForUpdate({
    id,
    data,
  }: ICompareData): Promise<boolean> {
    const user = await usersRepositoryInPrisma.findById(id);

    if (user.register === data.register) {
      return true;
    }

    const userByRegister = await usersRepositoryInPrisma.findByRegister(
      data.register,
    );

    if (userByRegister) {
      return false;
    }
    return true;
  }

  return {
    IsEmail,
    EmailAlreadyExists,
    RegisterAlreadyExists,
    CpfAlreadyExits,
    RoleExists,
    NameAlreadyExists,
    VerifyUserExistsById,
    VerifyNameForUpdate,
    VerifyEmailForUpdate,
    VerifyCpfForUpdate,
    VerifyRegisterForUpdate,
  };
}

export { FactoryOfUserValidations };
