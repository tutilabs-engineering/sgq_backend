export interface ICreatePointToPointDTO{
    quantity: number,
    file: string,
    code_product: string,
    userThatCreate: string,
    createdAt?: Date,
    desc_product?: string;
    cod_client?: string;
    desc_client?: string;
    fk_product_ana?: string,
}