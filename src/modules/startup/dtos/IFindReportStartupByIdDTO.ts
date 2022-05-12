interface IReportStartupByIdDTO {
  id: string;
  code_startup: number;
  fk_op: number;
  open: boolean;
  fk_user_create: string;
  fk_user_filled: string;
  fk_status: number;
  img_1: string;
  img_2: string;
  img_3: string;
  day: Date;
  start_time: Date;
  final_time: Date;
  createdAt: Date;
  updatedAt: Date;
}

export { IReportStartupByIdDTO };
