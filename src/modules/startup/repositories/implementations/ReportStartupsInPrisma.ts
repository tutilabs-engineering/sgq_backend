import { IMetrologyDTO } from "@modules/metrology/dtos/IMetrologyDTO";
import { ICreateStartupDTO } from "@modules/startup/dtos/ICreateStartupDTO";
import {
  IDefaultQuestionsDisapprovedDTO,
  IFillReportStartupToDatabaseDTO,
} from "@modules/startup/dtos/IFillReportStartupDTO";
import { IReportStartupByIdDTO } from "@modules/startup/dtos/IFindReportStartupByIdDTO";
import { IFindStartupByMachineDTO } from "@modules/startup/dtos/IFindStartupByMachineDTO";
import { IInsertOpInStartupDTO } from "@modules/startup/dtos/IInsertOpInStartupDTO";
import { IListAllDataStartupByIdDTO } from "@modules/startup/dtos/IListAllDataStartupByIdDTO";
// import { IDataToFillDefaultQuestion } from "@modules/startup/dtos/IFillReportStartupDTO";
import { IListAllStartupsDTO } from "@modules/startup/dtos/IListAllStartupsDTO";
import { ITakeProductCodeDTO } from "@modules/startup/dtos/ITakeProductCodeDTO";
import { ReportStartup } from "@modules/startup/entities/ReportStartup";
import { ReportStartupFill } from "@modules/startup/entities/ReportStartupFill";
// import { stringify } from "uuid";
import { prismaAgent } from "../../../../shared/database/prismaAgent";
import { IReportStartupRepository } from "../IReportStartupRepository";
import { StructureStartupListInPrisma } from "./structureReturn/StructureStartupListInPrisma";

class ReportStartupsInPrisma implements IReportStartupRepository {
  async insertDefaultQuestionsDisapproved(
    default_questions_disapproved: IDefaultQuestionsDisapprovedDTO[],
  ): Promise<void> {
    await prismaAgent.defaultQuestionsDisapproved.createMany({
      data: default_questions_disapproved,
    });
  }

  async closeReportStartup(id_startup: string): Promise<void> {
    await prismaAgent.reportStartup.update({
      where: { id: id_startup },
      data: {
        open: false,
      },
    });
  }

  async findStartupsByMachine(
    code_machine: string,
  ): Promise<IFindStartupByMachineDTO[]> {
    return prismaAgent.reportStartup.findMany({
      where: {
        op: {
          machine: code_machine,
        },
      },
      select: {
        id: true,
        open: true,
        filled: true,
        op: {
          select: {
            machine: true,
            product_mold: true,
          },
        },
      },
    });
  }

  async listAllOpByIdStartup(startup_id: string): Promise<number[]> {
    const reportStartupOp = await prismaAgent.reportStartupOp.findMany({
      where: {
        fk_report_startup: startup_id,
      },
    });

    const ops = [];

    reportStartupOp.forEach((e) => {
      ops.push(e.id_op);
    });

    return ops;
  }

  async insertOpInStartup({
    newCodeOp,
    idReportStartup,
    dataOp: {
      cavity,
      client,
      code_client,
      code_product,
      cycle,
      desc_product,
      machine,
      product_mold,
      quantity,
      components,
    },
  }: IInsertOpInStartupDTO): Promise<void> {
    await prismaAgent.reportStartupOp.create({
      data: {
        report_startup: {
          connect: {
            id: idReportStartup,
          },
        },
        op: {
          connectOrCreate: {
            where: {
              code_op: newCodeOp,
            },
            create: {
              code_op: newCodeOp,
              cavity,
              client,
              code_client,
              code_product,
              cycle,
              desc_product,
              machine,
              product_mold,
              quantity,
              components: {
                createMany: {
                  data: components,
                },
              },
            },
          },
        },
      },
    });
  }

  async findAllDataStartupById(
    startup_id: string,
  ): Promise<IListAllDataStartupByIdDTO> {
    const reportStartup = await prismaAgent.reportStartup.findFirst({
      where: { id: startup_id },
      include: {
        report_startup_fill: {
          include: {
            default_questions_responses: true,
            specific_questions_responses: true,
          },
        },
        status: true,
        metrology: true,
        op: {
          include: {
            components: true,
          },
        },
        userThatCreate: {
          select: {
            id: true,
            name: true,
            email: true,
            register: true,
            is_enabled: true,
            role: {
              select: {
                id: true,
                description: true,
              },
            },
          },
        },
        userThatFill: {
          select: {
            id: true,
            name: true,
            email: true,
            register: true,
            is_enabled: true,
            role: {
              select: {
                id: true,
                description: true,
              },
            },
          },
        },
      },
    });

    return reportStartup;
  }
  async takeProductCodeByCodeOp(code_op: number): Promise<ITakeProductCodeDTO> {
    const productCode = await prismaAgent.op.findUnique({
      where: { code_op },
      select: {
        code_product: true,
      },
    });

    return productCode;
  }
  async findFillByReportStartupId(
    startup_id: string,
  ): Promise<ReportStartupFill> {
    const dataStartup = await prismaAgent.reportStartupFill.findFirst({
      where: { fk_startup: startup_id },
    });

    return dataStartup;
  }

  async findReportStartupById(
    startup_id: string,
  ): Promise<IReportStartupByIdDTO> {
    const reportStartup = prismaAgent.reportStartup.findUnique({
      where: {
        id: startup_id,
      },
    });
    return reportStartup;
  }

  async findStartupByCodeOp(code_op: number): Promise<ReportStartup> {
    return prismaAgent.reportStartup.findFirst({
      where: {
        fk_op: code_op,
      },
    });
  }

  async fillReportStartup({
    fk_startup,
    default_questions,
    specific_questions,
    user_id,
    final_time,
    statusReportStartup,
    open,
    img_1,
    img_2,
    img_3,
  }: IFillReportStartupToDatabaseDTO): Promise<void> {
    await prismaAgent.reportStartupFill
      .create({
        data: {
          fk_startup,
          default_questions_responses: {
            create: {
              default_questions,
            },
          },
          specific_questions_responses: {
            create: {
              specific_questions,
            },
          },
        },
      })
      .then(async () => {
        await prismaAgent.reportStartup.update({
          where: { id: fk_startup },
          data: {
            fk_user_filled: user_id,
            final_time,
            fk_status: statusReportStartup.status,
            open,
            img_1,
            img_2,
            img_3,
            filled: true,
          },
        });
      })
      .catch((error) => {
        return error;
      });

    if (statusReportStartup.status === 2) {
      await prismaAgent.metrology.deleteMany({
        where: {
          fk_startup,
        },
      });
    }
  }

  async create(
    {
      code_op,
      user_id,
      header: {
        client,
        code_client,
        code_product,
        desc_product,
        product_mold,
        quantity,
        machine,
        day,
        start_time,
      },
      techniqueData: { cavity, cycle },
      components,
    }: ICreateStartupDTO,
    metrology: IMetrologyDTO[],
  ): Promise<ReportStartup> {
    const startupCreated = await prismaAgent.reportStartup.create({
      data: {
        day,
        start_time,
        userThatCreate: {
          connect: {
            id: user_id,
          },
        },
        op: {
          connectOrCreate: {
            where: {
              code_op: Number(code_op),
            },
            create: {
              code_op: Number(code_op),
              client,
              code_client,
              code_product,
              desc_product,
              machine,
              product_mold,
              quantity,
              cavity,
              cycle,
              components: {
                createMany: {
                  data: components,
                },
              },
            },
          },
        },
        metrology: {
          createMany: {
            data: metrology,
          },
        },
      },
    });

    return startupCreated;
  }

  async findAll(): Promise<IListAllStartupsDTO[]> {
    const allStartups = await prismaAgent.reportStartup.findMany(
      StructureStartupListInPrisma,
    );

    return allStartups;
  }
}

export { ReportStartupsInPrisma };
