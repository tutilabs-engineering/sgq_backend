import { IMetrologyRepository } from "@modules/metrology/repositories/IMetrologyRepository";
import { IFillReportStartupToUseCaseDTO } from "@modules/startup/dtos/IFillReportStartupDTO";
import { IReportStartupRepository } from "@modules/startup/repositories/IReportStartupRepository";
import { FinalResultOfStatus } from "@utils/determineReportStartupStatus";
import { injectable, inject } from "tsyringe";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { StartupValidations } from "@shared/errors/factoryValidations/startup/validations/StartupValidations";

@injectable()
class FillReportStartupUseCase {
  constructor(
    @inject("ReportStartupsInPrisma")
    private reportStartupsInPrisma: IReportStartupRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("MetrologyRepositoryInPrisma")
    private metrologyRepositoryInPrisma: IMetrologyRepository,
  ) {}

  async execute({
    fk_startup,
    default_questions,
    specific_questions,
    user_id,
    files,
  }: IFillReportStartupToUseCaseDTO): Promise<void> {
    const {
      DefaultQuestionsValidations,
      SpecificQuestionsValidations,
      BasicValidationsOfFillReportStartup,
    } = StartupValidations();

    const startup = await this.reportStartupsInPrisma.findReportStartupById(
      fk_startup,
    );

    if (!startup) {
      throw new AppError("Startup not found", 404);
    }

    const basicValidationsOfFillReportStartup =
      await BasicValidationsOfFillReportStartup({
        fk_startup,
        default_questions,
        specific_questions,
        user_id,
      });

    const codeOp = startup.fk_op;

    const productCode =
      await this.reportStartupsInPrisma.takeProductCodeByCodeOp(codeOp);

    const defaultQuestionsValidation = await DefaultQuestionsValidations({
      default_questions,
      fk_startup,
      specific_questions,
    });

    const specificQuestionsValidation = await SpecificQuestionsValidations({
      specific_questions,
      code_product: productCode.code_product,
    });

    if (!basicValidationsOfFillReportStartup.status) {
      throw new AppError(
        basicValidationsOfFillReportStartup.message,
        basicValidationsOfFillReportStartup.statusCode,
      );
    }

    if (!defaultQuestionsValidation.status) {
      throw new AppError(
        defaultQuestionsValidation.message,
        defaultQuestionsValidation.statusCode,
      );
    }

    let specificQuestions = specific_questions;

    if (!specificQuestionsValidation.status) {
      throw new AppError(
        specificQuestionsValidation.message,
        specificQuestionsValidation.statusCode,
      );
    }

    if (
      specificQuestionsValidation.status &&
      specificQuestionsValidation.specificQuestions
    ) {
      specificQuestions = null;
    }

    let img_1: string;
    let img_2: string;
    let img_3: string;
    // eslint-disable-next-line array-callback-return
    await files.map((element) => {
      // eslint-disable-next-line array-callback-return
      default_questions.map((item) => {
        if (element.fieldname === item.fk_default_question) {
          // eslint-disable-next-line no-param-reassign
          item.file = element.filename;
        }
      });
      if (specificQuestions) {
        // eslint-disable-next-line array-callback-return
        specificQuestions.map((item) => {
          if (element.fieldname === item.fk_specific_question) {
            // eslint-disable-next-line no-param-reassign
            item.file = element.filename;
          }
        });
      }

      if (element.fieldname === "img_1") {
        img_1 = element.filename;
      }
      if (element.fieldname === "img_2") {
        img_2 = element.filename;
      }
      if (element.fieldname === "img_3") {
        img_3 = element.filename;
      }
    });

    const defaultQuestionsDisapproved = [];
    // Contabilizando as peguntas Reprovadas das startups
    default_questions.forEach((question) => {
      if (Number(question.status) === 2) {
        defaultQuestionsDisapproved.push({
          id_startup: fk_startup,
          id_default_question: question.fk_default_question,
        });
      }
    });

    let open = true;
    let filled = false;

    const final_time = this.dateProvider.dateNow();
    const verifyMetrology =
      await this.metrologyRepositoryInPrisma.findMetrologyStatusByStartupId(
        fk_startup,
      );
    // Se não existe metrologia o startup pode ser fechado direto
    // Fechar Start-up
    if (verifyMetrology.length <= 0) {
      filled = true;
    }
    // Fechar Start-up
    if (verifyMetrology.length > 0) {
      if (!verifyMetrology[0].metrology) {
        filled = true;
      }
    }
    // Definir defult
    let determineStatusReportStartup = {
      status: 5,
      description: "undefined",
    };
    // Verificar se o fechamento é positivo
    if (filled) {
      // Pego os dados da metrologia pra conferir o status das
      const getDataMetrologyCheckStatus =
        await this.metrologyRepositoryInPrisma.findByMetrologyAllVariables(
          fk_startup,
        );

      // Verifico pra qual status vou camaminhar a Startup através Analise de perguntas
      determineStatusReportStartup = await FinalResultOfStatus({
        default_questions,
        specific_questions: specificQuestions,
        metrology: getDataMetrologyCheckStatus,
      });

      // Se o Start-Up
      if (determineStatusReportStartup.status === 2) {
        open = false;
      }

      // Verifico se existe perguntas reporvadas
      await this.reportStartupsInPrisma.insertDefaultQuestionsDisapproved(
        defaultQuestionsDisapproved,
      );
    }

    await this.reportStartupsInPrisma.deleteFillReportStartup(fk_startup);

    await this.reportStartupsInPrisma.fillReportStartup({
      fk_startup,
      default_questions: JSON.stringify(default_questions),
      specific_questions: JSON.stringify(specificQuestions),
      user_id,
      final_time,
      statusReportStartup: determineStatusReportStartup,
      open,
      img_1,
      img_2,
      img_3,
      filled,
    });
  }
}

export { FillReportStartupUseCase };
