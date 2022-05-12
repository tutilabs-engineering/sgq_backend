import axios from "axios";

interface IReturnResponses {
  status: boolean;
  data?: {
    DocNum: number;
    U_EP_Cav: string;
    U_EP_CIC: string;
    U_Cliente: string;
    CardName: string;
    U_CodCliente: string;
    ItemCode: string;
    ProdName: string;
    PlannedQty: string;
  };
}

async function FindDataByOpCode(codeOp: number): Promise<IReturnResponses> {
  const response = await axios.get(
    `http://185.209.179.253:3000/api/v1/sap/tutilabs/ops/${codeOp}`,
  );

  if (response.data.results.length <= 0) {
    return { status: false };
  }

  const op = response.data.results[0];

  return { status: true, data: op };
}

export { FindDataByOpCode };
