import { ProductionOrder } from "@modules/startup/entities/ProductionOrder";
import api from "../../../../utils/productionOrder.json";
import { IProductionOrders } from "../IProductionOrder";

class ProductionOrdersInMemory implements IProductionOrders {
  async findDataByCodeOp(code_op: number): Promise<ProductionOrder> {
    const dataOp = api.results.find((c) => c.DocNum === code_op);

    if (!dataOp) {
      return undefined;
    }

    const data = [];

    dataOp.Itens.forEach((item) => {
      data.push(item);
    });

    const op: ProductionOrder = {
      code_op: dataOp.DocNum,
      data_op: {
        client: dataOp.U_Cliente,
        code_client: dataOp.U_CodCliente,
        product: dataOp.ProdName,
        code_product: dataOp.ItemCode,
        cavity: dataOp.U_EP_Cav,
        cycle: dataOp.U_EP_CIC,
        components: data,
      },
    };
    return op;
  }
}

export { ProductionOrdersInMemory };
