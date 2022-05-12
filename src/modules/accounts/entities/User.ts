class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  register: string;
  is_enabled?: boolean;
  fk_role: number;
  fk_unity: number;
  created_at?: Date;
  updatedAt?: Date;
}

export { User };
