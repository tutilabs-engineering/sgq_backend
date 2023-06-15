import { httpPIQ } from "../piq_config"

interface CreatePIQ {
  id: string,
  number_startup: number,
  number_op: number,
  code_product: string,
  description_product: string,
  mold: string,
  machine: string,
  description_client: string,
  code_client: string,
  attributeQuestionJSON: object[]
  variablesQuestionJSON: object[]
  status: number,
  nqa: number,
  PIQ: string,
  level: string
}

export default {

  createPIQ: async (data: CreatePIQ, token: string) => {
    console.log({token});
    
    await httpPIQ.post('/startup', {
      id: data.id,
      number_startup: data.number_startup,
      number_op: data.number_op,
      code_product: data.code_product,
      description_product: data.description_product,
      mold: data.mold,
      machine: data.machine,
      description_client: data.description_client,
      code_client: data.code_client,
      attributeQuestionJSON: data.attributeQuestionJSON,
      variablesQuestionJSON: data.variablesQuestionJSON,
      status: data.status,
      nqa: data.nqa,
      PIQ: data.PIQ,
      level: data.level
    }, {
      headers: {
        Authorization: token
      }
    }).then((result) => {
      return result
    }).catch((e) => {
      console.log(e);

    })
  }


}