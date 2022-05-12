interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  cpf: string;
  register: string;
  fk_role: number;
  fk_unity: number;
}

export { ICreateUserDTO };
