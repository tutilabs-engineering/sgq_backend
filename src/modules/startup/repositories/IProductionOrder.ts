import { ProductionOrder } from "../entities/ProductionOrder";

interface IProductionOrders {
  findDataByCodeOp(code_op: number): Promise<ProductionOrder>;
}

export { IProductionOrders };
