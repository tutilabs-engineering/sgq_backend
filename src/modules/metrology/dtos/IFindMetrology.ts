interface IFindMetrology {
  id: string;
  fk_startup: string;
  variable: {
    id: string;
    description: string;
    cota: number;
    max: number;
    min: number;
  };
}

export { IFindMetrology };
