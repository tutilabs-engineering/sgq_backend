import { ProductionOrdersInMemory } from "@modules/startup/repositories/inMemory/ProductionOrdersInMemory";
import { FindDataByCodeOpController } from "./FindDataByCodeOpController";
import { FindDataByCodeOpUseCase } from "./FindDataByCodeOpUseCase";

export default (): FindDataByCodeOpController => {
  const productionOrdersInMemory = new ProductionOrdersInMemory();
  const findDataByCodeOpUseCase = new FindDataByCodeOpUseCase(
    productionOrdersInMemory,
  );
  const findDataByCodeOpController = new FindDataByCodeOpController(
    findDataByCodeOpUseCase,
  );

  return findDataByCodeOpController;
};
