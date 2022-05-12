import { IFindProductByCodeDTO } from "@modules/productAnalysis/dtos/IFindProductByCodeDTO";
import axios from "axios";

async function FindProductByCodeInSAP(code_product: string) {
  const response = await axios.get(
    `http://185.209.179.253:3000/api/v1/sap/tutilabs/boms/${code_product}`,
  );

  if (!response.data.result) {
    return { status: false };
  }

  const dataProduct = response.data.result;

  const product: IFindProductByCodeDTO = {
    code_product: dataProduct.Code,
    name_product: dataProduct.Name,
  };

  return { status: true, product };
}

export { FindProductByCodeInSAP };
