interface IUpdateUserDTO {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  register: string;
  fk_role: number;
  fk_unity: number;
}

export { IUpdateUserDTO };
