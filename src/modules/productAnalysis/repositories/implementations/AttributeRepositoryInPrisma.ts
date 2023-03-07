import { ICreateAttributeDTO } from "@modules/productAnalysis/dtos/ICreateAttributeDTO";
import { Attribute } from "@modules/productAnalysis/entities/Attribute";
import { prismaAgent } from "@shared/database/prismaAgent";
import { IAttributeRepository } from "../IAttributeRepository";

class AttributeRepositoryInPrisma implements IAttributeRepository {
  async createAttribute({
    cod_product,
    desc_product,
    cod_client,
    desc_client,
    question,
    fk_product_ana,
  }: ICreateAttributeDTO): Promise<void> {
    await prismaAgent.productAttribute.create({
      data: {
        attention: false,
        question,
        is_enabled: true,
        product_ana: {
          connectOrCreate: {
            where: {
              id: fk_product_ana,
            },
            create: {
              cod_product,
              desc_product,
              cod_client,
              desc_client,
            },
          },
        },
      },
    });
  }
  async listAttributesInProduct(code_product: string): Promise<Attribute[]> {
    const response = await prismaAgent.productAttribute.findMany({
      where: {
        product_ana: {
          cod_product: code_product,
        },
        is_enabled: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return response;
  }
  async findByAttributeInProduct(
    code_product: string,
    question: string,
  ): Promise<Attribute> {
    const response = await prismaAgent.productAttribute.findFirst({
      where: {
        question,
        product_ana: {
          cod_product: code_product,
        },
         is_enabled: true
      },
    });

    return response;
  }
  async findByAttribute(id: string): Promise<Attribute> {
    const response = await prismaAgent.productAttribute.findUnique({
      where: {
        id,
      },
    });
    return response;
  }
  async deleteAttribute(id: string): Promise<void> {
    await prismaAgent.productAttribute.delete({
      where: {
        id,
      },
    });
  }

  async updateAttention(id: string, state: boolean): Promise<void> {
    await prismaAgent.productAttribute.update({
      data: {
        attention: state,
      },
      where: {
        id,
      },
    });
  }

  async updateStatus(id: string, state: boolean): Promise<void> {
    await prismaAgent.productAttribute.update({
      data: {
        is_enabled: state,
      },
      where: {
        id,
      },
    });
  }
}

export { AttributeRepositoryInPrisma };
