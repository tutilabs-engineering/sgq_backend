interface IListMetrologyHistory {
  id: string;
  sendToMetrology: Date;
  fk_startup: string;
  metrologyHistory: {
    user: {
      name: string;
    };
    startDate: Date;
    endDate: Date;
  };
  startup: {
    id: string;
    code_startup: number;
    op: {
      code_op: number;
      client: string;
      code_client: string;
      code_product: string;
      desc_product: string;
    };
  };
}

export { IListMetrologyHistory };
