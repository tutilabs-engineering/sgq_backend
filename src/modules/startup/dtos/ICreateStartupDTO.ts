interface IHeader {
  client: string;
  code_client: string;
  code_product: string;
  desc_product: string;
  machine: string;
  product_mold: string;
  quantity: string;
  day?: Date;
  start_time?: Date;
  nqa: number
}

interface ITechniqueData {
  cavity: string;
  cycle: string;
}

interface IComponents {
  description: string;
  item_number: string;
  planned: string;
  um: string;
  fk_op: number;
}

interface ICreateStartupDTO {
  code_op: string;
  user_id: string;
  header: IHeader;
  techniqueData: ITechniqueData;
  components: IComponents[];
  user?:{
    id: string,
    unity?:{
      id: number,
      name: string
    }
  }
}

interface IDataToInsertOpInStartup {
  data_op: {
    code_op: number;
    client: string;
    code_client: string;
    code_product: string;
    desc_product: string;
    machine: string;
    product_mold: string;
    quantity: string;
    cavity: string;
    cycle: string;
    components: {
      item_number: string;
      description: string;
      um: string;
      planned: string;
      fk_op?: number;
    }[];
  };
}

export { ICreateStartupDTO, IDataToInsertOpInStartup };
