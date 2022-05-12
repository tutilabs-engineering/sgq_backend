interface IComponents {
  description: string;
  item_number: string;
  planned: string;
  um: string;
}

interface IDataOp {
  cavity: string;
  client: string;
  code_client: string;
  code_product: string;
  cycle: string;
  desc_product: string;
  machine: string;
  product_mold: string;
  quantity: string;
  components: IComponents[];
}

interface IInsertOpInStartupDTO {
  newCodeOp: number;
  idReportStartup?: string;
  dataOp?: IDataOp;
}

interface IDataToInsertOpControllerDTO {
  code_op: number;
  machine: string;
  product_mold: string;
  client: string;
  code_client: string;
  components: IComponents[];
}

export { IInsertOpInStartupDTO, IDataToInsertOpControllerDTO };
