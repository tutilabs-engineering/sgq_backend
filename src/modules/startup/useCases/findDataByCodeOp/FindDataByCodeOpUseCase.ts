import { ProductionOrder } from "@modules/startup/entities/ProductionOrder";
import { IProductionOrders } from "@modules/startup/repositories/IProductionOrder";
import { AppError } from "@shared/errors/AppError";
// import { injectable, inject } from "tsyringe";

// @injectable()
class FindDataByCodeOpUseCase {
  constructor(
    // @inject("ProductionOrdersInMemory")
    private productionOrdersInMemory: IProductionOrders,
  ) {}

  async execute(code_op: number): Promise<ProductionOrder> {
    const data = await this.productionOrdersInMemory.findDataByCodeOp(code_op);

    if (!data) {
      throw new AppError("Not found", 404);
    }

    return data;
  }
}

export { FindDataByCodeOpUseCase };
