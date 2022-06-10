import { Metrology } from "@modules/metrology/entities/Metrology";

interface IOpData {
  code_op: number;
  code_product: string;
  code_client: string;
  machine: string;
}

interface IRole {
  id: number;
  description: string;
}

interface IUser {
  name: string;
  is_enabled: boolean;
  register: string;
  role: IRole;
}

interface IStatus {
  id: number;
  description: string;
}
interface IListAllStartupsDTO {
  id: string;
  code_startup: number;
  open: boolean;
  status: IStatus;
  op: IOpData;
  day: Date;
  start_time: Date;
  userThatCreate: IUser;
  metrology: Metrology[];
  report_startup_fill: {
    id?: string;
  }[];
}

export { IListAllStartupsDTO };
