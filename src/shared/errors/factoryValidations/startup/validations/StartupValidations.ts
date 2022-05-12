import { AttributeRepositoryInPrisma } from "@modules/productAnalysis/repositories/implementations/AttributeRepositoryInPrisma";
import { ICreateStartupDTO } from "@modules/startup/dtos/ICreateStartupDTO";
import { IFillReportStartupToUseCaseDTO } from "@modules/startup/dtos/IFillReportStartupDTO";
import { DefaultQuestionsInPrisma } from "@modules/startup/repositories/implementations/DefaultQuestionsInPrisma";
import { ReportStartupsInPrisma } from "@modules/startup/repositories/implementations/ReportStartupsInPrisma";
import { FactoryOfUserValidations } from "@shared/errors/factoryValidations/account/base/FactoryOfUserValidations";
import { FactoryOfGeneralValidations } from "@shared/errors/factoryValidations/FactoryOfGeneralValidations";
import { IResponseValidation } from "@shared/errors/factoryValidations/interfaces/IResponseValidation";

const reportStartupsInPrisma = new ReportStartupsInPrisma();
const defaultQuestionsInPrisma = new DefaultQuestionsInPrisma();
const attributeRepositoryInPrisma = new AttributeRepositoryInPrisma();

interface IResponseValidationSpecificQuestion {
  status: boolean;
  message?: string;
  statusCode?: number;
  specificQuestions?: object[];
}

function StartupValidations() {
  async function CreateStartupValidations({
    code_op,
    user_id,
    header: {
      client,
      code_client,
      code_product,
      desc_product,
      machine,
      product_mold,
      day,
      start_time,
      quantity,
    },
    techniqueData: { cavity, cycle },
    components,
  }: ICreateStartupDTO): Promise<IResponseValidation> {
    const { IsEmpty } = FactoryOfGeneralValidations();
    const { VerifyUserExistsById } = FactoryOfUserValidations();

    const verifyLastStartup = await reportStartupsInPrisma.findStartupByCodeOp(
      Number(code_op),
    );
    const codeOpIsEmpty = await IsEmpty(code_op);
    const userIdIsEmpty = await IsEmpty(user_id);
    const quantityIsEmpty = await IsEmpty(quantity);
    const userExists = await VerifyUserExistsById(user_id);
    const clientIsEmpty = await IsEmpty(client);
    const codeClientIsEmpty = await IsEmpty(code_client);
    const codeProductIsEmpty = await IsEmpty(code_product);
    const descProductIsEmpty = await IsEmpty(desc_product);
    const machineIsEmpty = await IsEmpty(machine);
    const productMoldIsEmpty = await IsEmpty(product_mold);
    const dayIsEmpty = await IsEmpty(String(day));
    const startTimeIsEmpty = await IsEmpty(String(start_time));
    const cavityIsEmpty = await IsEmpty(cavity);
    const cycleIsEmpty = await IsEmpty(cycle);
    const componentsIsEmpty = await IsEmpty(String(components));

    if (verifyLastStartup && verifyLastStartup.open) {
      return {
        status: false,
        message: "Already exists a startup open with this code_op",
      };
    }
    if (verifyLastStartup && verifyLastStartup.open === false) {
      if (
        verifyLastStartup.fk_status === 1 ||
        verifyLastStartup.fk_status === 3
      ) {
        return {
          status: false,
          message:
            "Already exists a startup closed and approved with this code_op",
        };
      }
    }
    if (codeOpIsEmpty) {
      return { status: false, message: "code_op is required" };
    }
    if (userIdIsEmpty) {
      return { status: false, message: "user_id is required" };
    }
    if (!userExists) {
      return { status: false, message: "User not found", statusCode: 404 };
    }
    if (clientIsEmpty) {
      return { status: false, message: "client is required" };
    }
    if (codeClientIsEmpty) {
      return { status: false, message: "code_client is required" };
    }
    if (codeProductIsEmpty) {
      return { status: false, message: "code_product is required" };
    }
    if (descProductIsEmpty) {
      return { status: false, message: "desc_product is required" };
    }
    if (machineIsEmpty) {
      return { status: false, message: "machine is required" };
    }
    if (productMoldIsEmpty) {
      return { status: false, message: "product_mold is required" };
    }
    if (quantityIsEmpty) {
      return { status: false, message: "quantity is required" };
    }
    if (dayIsEmpty) {
      return { status: false, message: "day is required" };
    }
    if (startTimeIsEmpty) {
      return { status: false, message: "start_time is required" };
    }
    if (cavityIsEmpty) {
      return { status: false, message: "cavity is required" };
    }
    if (cycleIsEmpty) {
      return { status: false, message: "cycle is required" };
    }
    if (componentsIsEmpty) {
      return { status: false, message: "components is required" };
    }

    return { status: true };
  }

  async function BasicValidationsOfFillReportStartup({
    fk_startup,
    user_id,
  }: IFillReportStartupToUseCaseDTO): Promise<IResponseValidation> {
    const { IsEmpty } = FactoryOfGeneralValidations();

    const fkStartupIsEmpty = await IsEmpty(fk_startup);
    const userIdIsEmpty = await IsEmpty(user_id);

    if (fkStartupIsEmpty) {
      return { status: false, message: "fk_startup is required" };
    }

    if (userIdIsEmpty) {
      return { status: false, message: "user_id is required" };
    }

    const startup = await reportStartupsInPrisma.findReportStartupById(
      fk_startup,
    );

    const codeOp = startup.fk_op;

    const productCode = await reportStartupsInPrisma.takeProductCodeByCodeOp(
      codeOp,
    );

    if (!productCode) {
      return {
        status: false,
        message:
          "internal error 'product_code' not found in 'startupValidations'",
        statusCode: 500,
      };
    }

    const verifyIfStartupIsAlreadyFilled =
      await reportStartupsInPrisma.findFillByReportStartupId(fk_startup);

    if (verifyIfStartupIsAlreadyFilled) {
      return {
        status: false,
        message: "Startup is already filled",
        statusCode: 406,
      };
    }

    return { status: true };
  }

  async function DefaultQuestionsValidations({
    default_questions,
  }: IFillReportStartupToUseCaseDTO): Promise<IResponseValidationSpecificQuestion> {
    const defaultQuestionsIdentification =
      await defaultQuestionsInPrisma.list();

    if (!default_questions) {
      return {
        status: false,
        message: "default_questions is required",
      };
    }

    const defaultQuestionsFound = [];

    defaultQuestionsIdentification.forEach((questionDB) => {
      default_questions.forEach((questionSent) => {
        if (questionDB.id === questionSent.fk_default_question) {
          const verify = defaultQuestionsFound.find(
            (question) => question.id === questionDB.id,
          );
          if (!verify) {
            defaultQuestionsFound.push(questionDB);
          }
        }
      });
    });

    if (
      defaultQuestionsFound.length !== defaultQuestionsIdentification.length
    ) {
      const valueMissing =
        defaultQuestionsIdentification.length - defaultQuestionsFound.length;

      return {
        status: false,
        message: `Must fill all default questions, is missing ${valueMissing}`,
      };
    }

    return { status: true };
  }

  async function SpecificQuestionsValidations({
    specific_questions,
    code_product,
  }: IFillReportStartupToUseCaseDTO): Promise<IResponseValidationSpecificQuestion> {
    if (!specific_questions) {
      return { status: false, message: "specific_questions must be required" };
    }

    const listOfSpecificQuestionsByProductCode =
      await attributeRepositoryInPrisma.listAttributesInProduct(code_product);

    const specificQuestionsAvailable = [];

    listOfSpecificQuestionsByProductCode.forEach((questionEnabled) => {
      if (questionEnabled.is_enabled) {
        const verify = specificQuestionsAvailable.find(
          (specificQuestionInList) =>
            specificQuestionInList.id === questionEnabled.id,
        );
        if (!verify) {
          specificQuestionsAvailable.push(questionEnabled);
        }
      }
    });

    if (!specificQuestionsAvailable.length) {
      return {
        status: true,
        specificQuestions: specificQuestionsAvailable,
      };
    }

    const specificQuestionsFound = [];

    specificQuestionsAvailable.forEach((specificQuestionInDB) => {
      specific_questions.forEach((specificQuestionSent) => {
        if (
          specificQuestionInDB.id === specificQuestionSent.fk_specific_question
        ) {
          const verify = specificQuestionsFound.find(
            (question) => question.id === specificQuestionInDB.id,
          );
          if (!verify) {
            specificQuestionsFound.push(specificQuestionInDB);
          }
        }
      });
    });

    if (specificQuestionsFound.length !== specificQuestionsAvailable.length) {
      const valueMissing =
        specificQuestionsAvailable.length - specificQuestionsFound.length;

      return {
        status: false,
        message: `Must fill all specific questions, is missing ${valueMissing}`,
      };
    }

    return { status: true };
  }

  return {
    CreateStartupValidations,
    DefaultQuestionsValidations,
    SpecificQuestionsValidations,
    BasicValidationsOfFillReportStartup,
  };
}

export { StartupValidations };
