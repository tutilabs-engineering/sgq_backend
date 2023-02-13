interface IRole {
  id: number;
  description: string;
}

interface IDataUser {
  id: string;
  name: string;
  email: string;
  register: string;
  is_enabled: boolean;
  role: IRole;
}

interface IHeader {
  code_op: string;
  code_product: string;
  desc_product: string;
  code_client: string;
  machine: string;
  product_mold: string;
  client: string;
  day: Date;
  start_time: Date;
  final_time: Date;
}

interface ITechniqueData {
  cavity: string;
  cycle: string;
}

interface IComponents {
  id: string;
  description: string;
  item_number: string;
  planned: string;
  um: string;
}

interface IDataOp {
  id: string;
  created_at: Date;
  header: IHeader;
  techniqueData: ITechniqueData;
  components: IComponents[];
}

interface IStartupData {
  id: string;
  data_op: IDataOp;
}

interface ISimpleReturnStartupDTO {
  id: string;
  open: boolean;
  user: IDataUser;
  startupData: IStartupData;
}

export { ISimpleReturnStartupDTO };
