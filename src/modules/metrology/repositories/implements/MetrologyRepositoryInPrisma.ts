import { IFindMetrology } from "@modules/metrology/dtos/IFindMetrology";
import { IFindMetrologyByStartup } from "@modules/metrology/dtos/IFindMetrologyByStartup";
import { IJoinUserInMetrology } from "@modules/metrology/dtos/IJoinUserInMetrology";
import { IListMetrologyHistory } from "@modules/metrology/dtos/IListMetrologyHistory";
import { IListMetrologyOfStartup } from "@modules/metrology/dtos/IListMetrologyOfStartup";
import { IStatusMetrologyDTO } from "@modules/metrology/dtos/IStatusMetrologyDTO";
import { prismaAgent } from "@shared/database/prismaAgent";
import { IMetrologyRepository } from "../IMetrologyRepository";

class MetrologyRepositoryInPrisma implements IMetrologyRepository {
  async findMetrologyStatusByStartupId(
    startup_id: string,
  ): Promise<IStatusMetrologyDTO[]> {
    const metrology = await prismaAgent.metrology.findMany({
      distinct: ["fk_startup"],
      select: {
        fk_startup: true,
        metrology: true,
      },
      where: {
        fk_startup: startup_id,
      },
      orderBy: {
        sendToMetrology: "desc",
      },
    });

    return metrology;
  }
  async findByMetrologyAllVariables(
    startup: string,
  ): Promise<IFindMetrologyByStartup[]> {
    const metrology = await prismaAgent.metrology.findMany({
      select: {
        id: true,
        fk_startup: true,
        metrology: true,
        cavity: true,
        value: true,
        variable: {
          select: {
            id: true,
            description: true,
            cota: true,
            max: true,
            min: true,
            file: true,
          },
        },
        startup: {
          select: {
            id: true,
            op: {
              select: {
                code_op: true,
                client: true,
                code_client: true,
                code_product: true,
                desc_product: true,
                cavity: true,
              },
            },
          },
        },
        metrologyHistory: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
            startDate: true,
            endDate: true,
          },
        },
      },
      where: {
        fk_startup: startup,
      },
    });

    return metrology;
  }
  async listMetrologyHistoryOfStartup(fk_unity: number, skip: number, limit: number): Promise<any> {
    // console.log({fk_unity});
    const list = await prismaAgent.$queryRawUnsafe(`SELECT distinct(m.fk_startup), mh."startDate" ,mh."endDate", o.code_op , o.code_product , o.desc_product, to_timestamp(cast(m."sendToMetrology" as TEXT),
    'YYYY-MM-DD HH24:MI:SS') as sendToMetrology FROM metrology m join "metrologyHistory" mh on mh.id = m."fk_metrologyHistory" join report_startup rs on rs.id = m.fk_startup join op o ON o.code_op = rs.fk_op where m.metrology = false and rs.fk_unity = ${fk_unity} order by sendToMetrology DESC LIMIT ${limit}  OFFSET ${skip}`)
    return list;
  }

  async updateToJoinMetrology({
    startup,
    fk_metrologyHistory,
  }: IJoinUserInMetrology): Promise<void> {
    await prismaAgent.metrology.updateMany({
      where: {
        startup: {
          id: startup,
        },
      },
      data: {
        fk_metrologyHistory,
      },
    });
  }

  async updateMetrology(value: number, id: string): Promise<void> {
    await prismaAgent.metrology.update({
      data: {
        value,
      },
      where: { id },
    });
  }
  async findByMetrology(id: string): Promise<IFindMetrology> {
    const metrology = await prismaAgent.metrology.findUnique({
      select: {
        id: true,
        fk_startup: true,
        // cavity: true,
        // value: true,
        variable: {
          select: {
            id: true,
            description: true,
            cota: true,
            max: true,
            min: true,
          },
        },
      },
      where: {
        id,
      },
    });
    return metrology;
  }

  async listMetrologyOfStartup(fk_unity: number): Promise<IListMetrologyOfStartup[]> {
    const list = await prismaAgent.metrology.findMany({
      distinct: ["fk_startup"],
      select: {
        id: true,
        fk_startup: true,
        sendToMetrology: true,
        metrologyHistory: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
            startDate: true,
            endDate: true,
          },
        },
        startup: {
          select: {
            id: true,
            code_startup: true,
            op: {
              select: {
                code_op: true,
                client: true,
                code_client: true,
                code_product: true,
                desc_product: true,
              },
            },
          },
        },
      },
      where: {
        metrology: true,
        startup:{
          fk_unity,
        }
      },
      orderBy: {
        sendToMetrology: "desc",
      },
    });

    return list;
  }
  async updateToFinalizeMetrology(startup: string): Promise<void> {
    await prismaAgent.metrology.updateMany({
      where: {
        fk_startup: startup,
      },
      data: {
        metrology: false,
      },
    });
  }
}

export { MetrologyRepositoryInPrisma };
