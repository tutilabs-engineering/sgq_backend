export interface IMetrology {
  id: string;
  cavity: number;
  value: number;
  metrology: boolean;
  variable: {
    id: string;
    description: string;
    cota: number;
    max: number;
    min: number;
    file?: string;
  };
  sendToMetrology: Date;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface IDefault_questions_responses {
  id: string;
  fk_report_startup_fill: string;
  default_questions: string;
  created_at: Date;
  updated_at: Date;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ISpecific_questions_responses {
  id: string;
  fk_report_startup_fill: string;
  specific_questions: string;
  created_at: Date;
  updated_at: Date;
}

export interface IListReportStartupDTO {
  open: boolean;
  code_startup: number;
  status?: {
    id: number;
    description: string;
  };
  op: {
    client: string;
    code_op: number;
    code_product: string;
    desc_product: string;
    machine: string;
    product_mold: string;
  };
  userThatFill: {
    name: string;
  };

  start_time: Date;
  final_time?: Date;
  report_startup_fill?: {
    default_questions_responses: IDefault_questions_responses[];
    specific_questions_responses: ISpecific_questions_responses;
  }[];
  metrology?: IMetrology[];
}
