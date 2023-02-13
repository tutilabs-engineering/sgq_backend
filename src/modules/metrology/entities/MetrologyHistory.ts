class MetrologyHistory {
  id?: string;
  fk_user?: string;
  metrologyHistory?: {
    user: {
      name: string;
    };
    startDate: Date;
  };
  startDate?: Date;
  endDate?: Date;
}

export { MetrologyHistory };
