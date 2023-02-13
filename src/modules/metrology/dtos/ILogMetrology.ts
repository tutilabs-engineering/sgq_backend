interface ILogMetrology {
  variableSearch: string;
  variableResult: {
    variable?: {
      id: string;
      description: string;
      cota: number;
      max: number;
      min: number;
    };
    message: string;
  };
}

export { ILogMetrology };
