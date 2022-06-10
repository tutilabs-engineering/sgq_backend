// interface IDataToFillDefaultQuestion {
//   description: string;
//   file: string;
//   fk_default_question_id: string;
//   fk_startup: string;
//   status: string;
// }

import { IFindMetrologyByStartup } from "@modules/metrology/dtos/IFindMetrologyByStartup";

interface IDataToFillDefaultQuestion {
  description: string;
  file: string;
  fk_default_question: string;
  status: number;
}

interface IDataToFillSpecificQuestion {
  description: string;
  file: string;
  fk_specific_question: string;
  status: number;
}

interface IDefaultQuestionsDisapprovedDTO {
  id_startup: string;
  id_default_question: string;
}

interface IFillReportStartupToDatabaseDTO {
  idFillReportStartup?: string;
  default_questions: string;
  specific_questions?: string;
  fk_startup: string;
  user_id: string;
  final_time: Date;
  img_1?: string;
  img_2?: string;
  img_3?: string;
  statusReportStartup: {
    status: number;
    description: string;
  };
  open: boolean;
  filled?: boolean;
}

interface IFillReportStartupToUseCaseDTO {
  metrology?: IFindMetrologyByStartup[];
  default_questions?: IDataToFillDefaultQuestion[];
  specific_questions?: IDataToFillSpecificQuestion[];
  fk_startup?: string;
  code_product?: string;
  user_id?: string;
  files?: any;
}

export {
  IDataToFillDefaultQuestion,
  IDataToFillSpecificQuestion,
  IFillReportStartupToDatabaseDTO,
  IFillReportStartupToUseCaseDTO,
  IDefaultQuestionsDisapprovedDTO,
};
