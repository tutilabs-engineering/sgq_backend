interface IListUserDTO {
  id: string;
  name: string;
  email: string;
  cpf: string;
  register: string;
  is_enabled: boolean;
  role: {
    id?: number;
    description: string;
  };
  unity: {
    id: number;
    name: string;
  };
}

export { IListUserDTO };
