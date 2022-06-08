/* eslint-disable array-callback-return */
import { IListMetrologyItemsDTO } from "@modules/metrology/dtos/IListMetrologyItemsDTO";
import { IMetrologyRepository } from "@modules/metrology/repositories/IMetrologyRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  startup: string;
}

@injectable()
class FindMetrologyByStartupUseCase {
  constructor(
    @inject("MetrologyRepositoryInPrisma")
    private metrologyRepositoryInPrisma: IMetrologyRepository,
  ) {}
  async handle({ startup }: IRequest): Promise<IListMetrologyItemsDTO> {
    const listDB =
      await this.metrologyRepositoryInPrisma.findByMetrologyAllVariables(
        startup,
      );

    if (!listDB) {
      throw new AppError("This ID is incorrect");
    }

    const header = {
      code_op: listDB[0].startup.op.code_op,
      client: listDB[0].startup.op.client,
      code_client: listDB[0].startup.op.code_client,
      code_product: listDB[0].startup.op.code_product,
      desc_product: listDB[0].startup.op.desc_product,
      cavity: listDB[0].startup.op.cavity,
      user: {
        id: listDB[0].metrologyHistory.user.id,
        name: listDB[0].metrologyHistory.user.name,
        startDate: listDB[0].metrologyHistory.startDate,
        endDate: listDB[0].metrologyHistory.endDate,
      },
    };
    const metrology_items = [];

    const separate_variables = [];
    listDB.map((item) => {
      if (!separate_variables.includes(item.variable.description)) {
        separate_variables.push(item.variable.description);
      }
    });

    separate_variables.forEach((variable) => {
      // eslint-disable-next-line consistent-return
      const listMetrologyByVariable = listDB.map((item) => {
        if (item.variable.description === variable) {
          return {
            metrology_id: item.id,
            position_cavity: item.cavity,
            value: item.value,
            variable_desc: item.variable.description,
            variable: item.variable,
          };
        }
      });
      metrology_items.push({
        variable,
        items: listMetrologyByVariable,
      });
    });

    return { header, metrology_items };
  }
}

export { FindMetrologyByStartupUseCase };
