import { FindProductByCodeController } from "./FindProductByCodeController";
import { FindProductByCodeUseCase } from "./FindProductByCodeUseCase";

export default (): FindProductByCodeController => {
  const findProductByCodeUseCase = new FindProductByCodeUseCase();
  const findProductByCodeController = new FindProductByCodeController(
    findProductByCodeUseCase,
  );

  return findProductByCodeController;
};
