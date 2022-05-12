import { IDataToFormatDTO } from "@modules/metrology/dtos/DataToFormatDTO";
import { IMetrologyDTO } from "@modules/metrology/dtos/IMetrologyDTO";
import { VariablesRepositoryInPrisma } from "@modules/productAnalysis/repositories/implementations/VariablesRepositoryInPrisma";
import { AppError } from "@shared/errors/AppError";
const variablesRepositoryInPrisma = new VariablesRepositoryInPrisma();

async function FormatDataMetrologyProvider({
  cavity,
  code_product,
}: IDataToFormatDTO): Promise<IMetrologyDTO[]> {
  const variables = await variablesRepositoryInPrisma.listVariablesInProduct(
    code_product,
  );

  if (!variables) {
    throw new AppError("Not found variables in this product", 404);
  }

  if (variables.length <= 0) {
    throw new AppError("Does not exists variables in this product");
  }

  if (cavity <= 0 || !cavity) {
    throw new AppError("At least one cavity is required");
  }

  const metrology: IMetrologyDTO[] = [];
  let i = 1;

  // eslint-disable-next-line array-callback-return
  variables.map((item) => {
    while (i <= cavity) {
      metrology.push({ fk_variable: item.id, cavity: i, value: 0 });
      i += 1;
    }
    i = 1;
  });

  return metrology;
}

export { FormatDataMetrologyProvider };
