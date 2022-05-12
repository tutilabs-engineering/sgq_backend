class Metrology {
  id?: string;
  cavity: number;
  fk_startup: string;
  value: string;
  variable: {
    id?: string;
    description: string;
    cota: number;
    max: number;
    min: number;
  };
}

export { Metrology };
