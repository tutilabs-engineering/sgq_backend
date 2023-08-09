import { ICreatePointToPointDTO } from "../dtos/ICreatePointToPointDTO";

export interface IPointToPointRepository{
    createPointToPoint(data: ICreatePointToPointDTO):Promise<void>
    findByProductId(fk_product_ana: string):Promise<PointToPoint>
}