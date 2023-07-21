import { ICreateVariableDTO } from "@modules/productAnalysis/dtos/ICreateVariableDTO";
import { IFindVariablesDTO } from "@modules/productAnalysis/dtos/IFindVariablesDTO";
import { Variable } from "@modules/productAnalysis/entities/Variable";
import { prismaAgent } from "@shared/database/prismaAgent";
import { IVariablesRepository } from "../IVariablesRepository";
import { IUpdateVariableDTO } from "@modules/productAnalysis/dtos/IUpdateVariableDTO";

class VariablesRepositoryInPrisma implements IVariablesRepository {
  async findByVariablesAlreadyExists(
    variables: IFindVariablesDTO[],
  ): Promise<Variable[]> {
    const result = await prismaAgent.productVariable.findMany({
      where: {
        OR: variables,
      },
    });
    return result;
  }
  async createdVariable({
    cod_client,
    desc_client,
    cod_product,
    desc_product,
    description,
    cota,
    max,
    min,
    file,
    fk_product_ana,
  }: ICreateVariableDTO): Promise<void> {
    await prismaAgent.productVariable.create({
      data: {
        description,
        cota,
        max,
        min,
        file,
        is_enabled: true,
        product_ana: {
          connectOrCreate: {
            where: {
              id: fk_product_ana,
            },
            create: {
              cod_client,
              desc_client,
              cod_product,
              desc_product,
            },
          },
        },
      },
    });
  }

  async updateVariable({ id, file }: IUpdateVariableDTO): Promise<void> {
    await prismaAgent.productVariable.update({
      data: {
        file
      },
      where: {
        id
      }
    })
  }
  
  async listVariablesInProduct(code: string): Promise<Variable[]> {
    const variables = await prismaAgent.productVariable.findMany({
      where: {
        product_ana: {
          cod_product: code,
        },
        is_enabled: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return variables;
  }

  async findByVariableInProduct(
    code_product: string,
    description: string,
  ): Promise<Variable> {
    const response = await prismaAgent.productVariable.findFirst({
      where: {
        description,
        product_ana: {
          cod_product: code_product,
        },
      },
    });

    return response;
  }

  async findByVariable(id: string): Promise<Variable> {
    const variable = await prismaAgent.productVariable.findUnique({
      where: {
        id,
      },
    });
    return variable;
  }
  async deleteVariable(id: string): Promise<void> {
    await prismaAgent.productVariable.delete({
      where: { id },
    });
  }

  async updateStatus(id: string, state: boolean): Promise<void> {
    await prismaAgent.productVariable.update({
      data: {
        is_enabled: state,
      },
      where: {
        id,
      },
    });
  }
}

export { VariablesRepositoryInPrisma };
