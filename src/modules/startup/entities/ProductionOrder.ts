class ProductionOrder {
  code_op: number;
  data_op?: {
    client: string;
    code_client: string;
    code_product: string;
    product: string;
    cavity: string;
    cycle: string;
    components?: any;
  };
}

export { ProductionOrder };
