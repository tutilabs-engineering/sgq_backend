class MetrologySolicitation {
  id: string;
  sendToMetrology: Date;
  startup: {
    id: string;
    op: {
      code_product: string;
      desc_product: string;
      client: string;
      code_client: string;
    };
  };
  metrologyHistory: {
    user: {
      name: string;
    };
    startDate: Date;
  };
}

export { MetrologySolicitation };
