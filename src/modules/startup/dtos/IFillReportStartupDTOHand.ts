import { IMetrology } from "@modules/metrology/dtos/IListReportStartupDTO";

export interface IDataToFillSpecificQuestion {
  question: string;
  description: string;
  file: string;
  fk_specific_question: string;
  status: number;
}

export interface IDataToFillDefaultQuestion {
  title: string;
  description: string;
  file: string;
  fk_default_question: string;
  status: number;
}

export interface IFillReportStartupDTO {
  metrology?: IMetrology[];
  default_questions?: IDataToFillDefaultQuestion[];
  specific_questions?: IDataToFillSpecificQuestion[];
  fk_startup?: string;
  code_product?: string;
  user_id?: string;
  files?: any;
}
