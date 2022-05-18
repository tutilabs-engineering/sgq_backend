interface IUpdateFields {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  register: string;
  fk_role: number;
  fk_unity: number;
  fk_office_hour: number;
}

export { IUpdateFields };
