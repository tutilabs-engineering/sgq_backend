interface IListAllDataFilter {
  machine?: string;
  code_product?: string;
  code_client?: string;
  workShift?: number;
  day?: Date;
  dayEnd?: string;
  hourStart?: string;
  hourEnd?: string;
}

export { IListAllDataFilter };
