import { IListReportStartupByIdFormatted } from "@modules/startup/dtos/IListAllDataStartupByIdDTO";
import axios from "axios";
import httpPIQ from "@shared/infra/api/piq/services/create-piq";

async function executeCreatePiq(data: IListReportStartupByIdFormatted, token: string): Promise<void> {
  const piq = {
    id: data.id,
    number_startup: data.code_startup,
    number_op: data.code_op,
    code_product: data.op.code_product,
    description_product: data.op.desc_product,
    mold: data.op.product_mold,
    machine: data.op.machine,
    description_client: data.op.client,
    code_client: data.op.code_client,
    userWhoFill: {
      id: data.userWhoCreate.id,
      name: data.userWhoCreate.name,
      email: data.userWhoCreate.email,
      register: data.userWhoCreate.register,
      is_enabled: true,
      role: {
        id: data.userWhoCreate.role.id,
        description: data.userWhoCreate.role.description,
      },
    },
    attributeQuestionJSON: data.report_startup_fill.specific_questions_responses.specific_questions,
    variablesQuestionJSON: data.metrology_items,
    status: 1,
    nqa: data.nqa,
    PIQ: data.piq,
    level: data.level,
  };
    await httpPIQ.createPIQ(piq, token)

}

export { executeCreatePiq };
