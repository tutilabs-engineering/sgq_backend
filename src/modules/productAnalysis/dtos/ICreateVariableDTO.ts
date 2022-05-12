interface ICreateVariableDTO {
  cod_product?: string;
  desc_product?: string;
  cod_client?: string;
  desc_client?: string;
  description: string;
  cota: number;
  max: number;
  min: number;
  file: string;
  fk_product_ana?: string;
}

export { ICreateVariableDTO };
