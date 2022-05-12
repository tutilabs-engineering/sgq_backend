interface IListMetrologyHistory {
  id?: string;
  sendToMetrology: Date;
  fk_startup: string;
  metrologyHistory: {
    user: {
      name: string;
    };
    startDate: Date;
    endDate: Date;
  };
}

export { IListMetrologyHistory };
