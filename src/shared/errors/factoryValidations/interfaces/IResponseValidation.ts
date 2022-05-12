interface IResponseValidation {
  status: boolean;
  message?: string;
  data?: string;
  statusCode?: number;
}

export { IResponseValidation };
