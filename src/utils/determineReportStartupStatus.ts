import { IFindMetrologyByStartup } from "@modules/metrology/dtos/IFindMetrologyByStartup";
import { Metrology } from "@modules/metrology/entities/Metrology";
import { IFillReportStartupToUseCaseDTO } from "@modules/startup/dtos/IFillReportStartupDTO";

interface IResponse {
  status: number;
  description: string;
}

function DetermineReportStartupStatus() {
  async function determineStatusDefaultQuestions({
    default_questions,
  }: IFillReportStartupToUseCaseDTO): Promise<IResponse> {
    const disapproved = default_questions.find(
      (question) => Number(question.status) === 2,
    );
    const approvedWithCondition = default_questions.find(
      (question) => Number(question.status) === 3,
    );

    if (!disapproved) {
      if (approvedWithCondition) {
        return { status: 3, description: "approved with condition" };
      }
      return { status: 1, description: "approved" };
    }
    return { status: 2, description: "disapproved" };
  }

  async function determineStatusSpecificQuestions({
    specific_questions,
  }: IFillReportStartupToUseCaseDTO): Promise<IResponse> {
    if (!specific_questions) {
      return {
        status: 1,
        description:
          "approved because does not exists specific questions for this reportStartup",
      };
    }
    const disapproved = specific_questions.find(
      (question) => Number(question.status) === 2,
    );
    const approvedWithCondition = specific_questions.find(
      (question) => Number(question.status) === 3,
    );

    if (!disapproved) {
      if (approvedWithCondition) {
        return { status: 3, description: "approved with condition" };
      }
      return { status: 1, description: "approved" };
    }
    return { status: 2, description: "disapproved" };
  }

  async function determineStatusVariablesByMetrology({
    metrology,
  }: IFillReportStartupToUseCaseDTO): Promise<IResponse> {
    let verifyStatus: IResponse = { status: 1, description: "approved" };
    if (!metrology) {
      return verifyStatus;
    }

    await Promise.all(
      // eslint-disable-next-line array-callback-return
      metrology.map((item) => {
        if (item.value > item.variable.max || item.value < item.variable.min) {
          verifyStatus = { status: 2, description: "disapproved" };
        }
      }),
    );

    return verifyStatus;
  }

  return {
    determineStatusDefaultQuestions,
    determineStatusSpecificQuestions,
    determineStatusVariablesByMetrology,
  };
}

async function FinalResultOfStatus({
  default_questions,
  specific_questions,
  metrology,
}: IFillReportStartupToUseCaseDTO): Promise<IResponse> {
  const resultDefaultQuestions =
    await DetermineReportStartupStatus().determineStatusDefaultQuestions({
      default_questions,
    });

  const resultSpecificQuestions =
    await DetermineReportStartupStatus().determineStatusSpecificQuestions({
      specific_questions,
    });

  const resultVariablesByMetrology =
    await DetermineReportStartupStatus().determineStatusVariablesByMetrology({
      metrology,
    });

  if (
    resultDefaultQuestions.status === 2 ||
    resultSpecificQuestions.status === 2 ||
    resultVariablesByMetrology.status === 2
  ) {
    return { status: 2, description: "disapproved" };
 // eslint-disable-next-line no-else-return
  } else if (
    resultDefaultQuestions.status === 1 &&
    resultSpecificQuestions.status === 1 &&
    resultVariablesByMetrology.status === 1
  ) {
    return { status: 1, description: "approved" };
  } else if (
    resultDefaultQuestions.status === 3 ||
    resultSpecificQuestions.status === 3
  ) {
    return { status: 3, description: "approved with condition" };
  }
  return { status: 0, description: "error" };
}

export { DetermineReportStartupStatus, FinalResultOfStatus };
