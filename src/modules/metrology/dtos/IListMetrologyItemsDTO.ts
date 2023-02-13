interface IListMetrologyItemsDTO {
  header: {
    code_op: number;
    client: string;
    code_client: string;
    code_product: string;
    desc_product: string;
    cavity: string;
    user: {
      id: string;
      name: string;
      startDate: Date;
      endDate: Date;
    };
  };
  metrology_items: {
    metrology_id: string;
    position_cavity: number;
    value: number;
    variable_id: string;
  }[];
}

export { IListMetrologyItemsDTO };
