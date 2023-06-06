interface IListMetrologyHistory {
  id: string;
  sendToMetrology: Date;
  fk_startup: string;
  metrologyHistory: {
    startDate: Date;
    endDate: Date;
  };
  startup: {
    op: {
      code_op: number;
      code_product: string;
      desc_product: string;
    };
  };
}

export { IListMetrologyHistory };
