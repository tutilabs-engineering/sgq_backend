interface IListMetrologyOfStartup {
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
    op: {
      code_op: number;
      client: string;
      code_client: string;
      code_product: string;
      desc_product: string;
    };
  };
}

export { IListMetrologyOfStartup };
