import { IAttributeRepository } from "@modules/productAnalysis/repositories/IAttributeRepository";
import { IPointToPointRepository } from "@modules/productAnalysis/repositories/IPointToPointRepository";
import { IProductRepository } from "@modules/productAnalysis/repositories/IProductRepository";
import { IListReportStartupByIdFormatted } from "@modules/startup/dtos/IListAllDataStartupByIdDTO";
import { IReportStartupRepository } from "@modules/startup/repositories/IReportStartupRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindReportStartupByIdUseCase {
  constructor(
    @inject("ReportStartupsInPrisma")
    private reportStartupsInPrisma: IReportStartupRepository,
    @inject("AttributeRepositoryInPrisma")
    private attributeRepositoryInPrisma: IAttributeRepository,
    @inject("ProductRepositoryInPrisma")
    private productRepositoryInPrisma: IProductRepository,
    @inject("PointToPointRepositoryInPrisma")
    private pointToPointRepositoryInPrisma: IPointToPointRepository,
  ) {}
  async execute(startup_id: string): Promise<IListReportStartupByIdFormatted> {
    const reportStartup =
      await this.reportStartupsInPrisma.findAllDataStartupById(startup_id);

    const product = await this.productRepositoryInPrisma.findByProduct(
      reportStartup.op.code_product,
    );
    let pointToPoint = null;
    if (product) {
      pointToPoint = await this.pointToPointRepositoryInPrisma.findByProductId(
        product.id,
      );
    }

    const reportStartupFill = reportStartup.report_startup_fill[0];
    const { op } = reportStartup;

    const specificQuestionsList =
      await this.attributeRepositoryInPrisma.listAttributesInProduct(
        reportStartup.op.code_product,
      );

    const specificQuestionsEnabled = [];

    specificQuestionsList.forEach((question) => {
      if (question.is_enabled) {
        specificQuestionsEnabled.push(question);
      }
    });

    const metrology_items = [];

    const separate_variables = [];
    reportStartup.metrology.map((item) => {
      if (!separate_variables.includes(item.variable.description)) {
        separate_variables.push(item.variable.description);
      }
    });

    separate_variables.forEach((variable) => {
      // eslint-disable-next-line consistent-return
      const listMetrologyByVariable = reportStartup.metrology.map((item) => {
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

    metrology_items.sort((a, b) => a.variable.localeCompare(b.variable));

    // Se as o status do preenchimento for falso ele retorna apenas informações basicas do startup
    if (!reportStartupFill) {
      const reportStartupFormatted: IListReportStartupByIdFormatted = {
        id: reportStartup.id,
        code_startup: reportStartup.code_startup,
        code_op: reportStartup.fk_op,
        open: reportStartup.open,
        filled: reportStartup.filled,
        piq: reportStartup.piq,
        nqa: reportStartup.nqa,
        level: reportStartup.level,
        stop_code: reportStartup.stop_code,
        pointToPoint: pointToPoint
          ? {
              file: pointToPoint.file,
              quantity: pointToPoint.quantity,
            }
          : null,
        status: {
          id: reportStartup.status.id,
          description: reportStartup.status.description,
        },
        img_1: reportStartup.img_1,
        img_2: reportStartup.img_2,
        img_3: reportStartup.img_3,
        day: reportStartup.day,
        start_time: reportStartup.start_time,
        final_time: reportStartup.final_time,
        created_at: reportStartup.createdAt,
        updated_at: reportStartup.updatedAt,
        op: {
          code_op: op.code_op,
          cavity: op.cavity,
          cycle: op.cycle,
          client: op.client,
          code_client: op.code_client,
          code_product: op.code_product,
          desc_product: op.desc_product,
          product_mold: op.product_mold,
          machine: op.machine,
          components: op.components,
          created_at: op.createdAt,
          updatedAt: op.updatedAt,
        },
        metrology_items,
        metrology: reportStartup.metrology,
        userWhoCreate: reportStartup.userThatCreate,
        userWhoFill: reportStartup.userThatFill,
        specific_questions_in_product: specificQuestionsEnabled,
      };

      return reportStartupFormatted;
    }

    const defaultQuestionFormatted = JSON.parse(
      reportStartupFill.default_questions_responses[0].default_questions,
    );

    const specificQuestionFormatted = JSON.parse(
      reportStartupFill.specific_questions_responses.specific_questions,
    );

    const ops = await this.reportStartupsInPrisma.listAllOpByIdStartup(
      startup_id,
    );

    const reportStartupFormatted: IListReportStartupByIdFormatted = {
      id: reportStartup.id,
      code_startup: reportStartup.code_startup,
      code_op: reportStartup.fk_op,
      open: reportStartup.open,
      filled: reportStartup.filled,
      piq: reportStartup.piq,
      nqa: reportStartup.nqa,
      level: reportStartup.level,
      stop_code: reportStartup.stop_code,
      pointToPoint: pointToPoint
        ? {
            file: pointToPoint.file,
            quantity: pointToPoint.quantity,
          }
        : null,
      status: {
        id: reportStartup.status.id,
        description: reportStartup.status.description,
      },
      img_1: reportStartup.img_1,
      img_2: reportStartup.img_2,
      img_3: reportStartup.img_3,
      day: reportStartup.day,
      start_time: reportStartup.start_time,
      final_time: reportStartup.final_time,
      created_at: reportStartup.createdAt,
      updated_at: reportStartup.updatedAt,
      report_startup_fill: {
        id: reportStartupFill.id,
        default_questions_responses: {
          id: reportStartupFill.default_questions_responses[0].id,
          default_questions: defaultQuestionFormatted,
          created_at:
            reportStartupFill.default_questions_responses[0].created_at,
          updated_at:
            reportStartupFill.default_questions_responses[0].updated_at,
        },
        specific_questions_responses: {
          id: reportStartupFill.specific_questions_responses.id,
          specific_questions: specificQuestionFormatted,
          created_at: reportStartupFill.specific_questions_responses.created_at,
          updated_at: reportStartupFill.specific_questions_responses.updated_at,
        },
        created_at: reportStartupFill.created_at,
      },
      op: {
        code_op: op.code_op,
        added_op: ops,
        cavity: op.cavity,
        cycle: op.cycle,
        client: op.client,
        code_client: op.code_client,
        code_product: op.code_product,
        desc_product: op.desc_product,
        product_mold: op.product_mold,
        machine: op.machine,
        components: op.components,
        created_at: op.createdAt,
        updatedAt: op.updatedAt,
      },
      metrology_items,
      metrology: reportStartup.metrology,
      userWhoCreate: reportStartup.userThatCreate,
      userWhoFill: reportStartup.userThatFill,
    };

    return reportStartupFormatted;
  }
}

export { FindReportStartupByIdUseCase };
