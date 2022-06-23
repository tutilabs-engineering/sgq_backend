interface IFindMetrologyByStartup {
  id: string;
  fk_startup: string;
  cavity: number;
  metrology: boolean;
  value: number;
  variable: {
    id: string;
    description: string;
    cota: number;
    max: number;
    min: number;
    file?: string;
  };
  startup: {
    id: string;
    op: {
      code_op: number;
      client: string;
      code_client: string;
      code_product: string;
      desc_product: string;
      cavity: string;
    };
  };
  metrologyHistory: {
    id: string;
    user: {
      id: string;
      name: string;
    };
    startDate: Date;
    endDate: Date;
  };
}

export { IFindMetrologyByStartup };
