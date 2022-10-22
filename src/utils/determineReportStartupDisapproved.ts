/* eslint-disable @typescript-eslint/ban-types */
import { IListReportStartupDTO } from "@modules/metrology/dtos/IListReportStartupDTO";
import { IFillReportStartupDTO } from "@modules/startup/dtos/IFillReportStartupDTOHand";
import dayjs from "dayjs";
import fs from "fs";
import Handlebars, { log, template } from "handlebars";
import path from "path";
import { IMailProvider } from "@shared/container/providers/mailProvider/IMailProvider";
// import { log } from "handlebars";

function DetermineReportStartupDisapproved() {
  function determineStatusDefaultQuestions({
    default_questions,
  }: IFillReportStartupDTO) {
    const verifyStatus = [];

    if (!default_questions) {
      if (default_questions.length >= 0) {
        return verifyStatus;
      }
    }

    default_questions.map((question) => {
      if (Number(question.status) === 2) {
        // return question
        verifyStatus.push({
          message: "Reprovado em Perguntas Padrões",
          question: question.title,
          res: question.description,
        });
      }
      return null;
    });

    return verifyStatus;
  }

  function determineStatusSpecificQuestions({
    specific_questions,
  }: IFillReportStartupDTO) {
    const verifyStatus = [];

    if (!specific_questions) {
      if (specific_questions.length >= 0) {
        return verifyStatus;
      }
    }

    specific_questions.map((question) => {
      if (Number(question.status) === 2) {
        // return question
        verifyStatus.push({
          message: "Reprovado em Perguntas Especificas",
          question: question.question,
          res: question.description,
        });
      }
      return null;
    });

    return verifyStatus;
  }

  function determineStatusVariablesByMetrology({
    metrology,
  }: IFillReportStartupDTO) {
    const verifyStatus = [];
    if (!metrology) {
      if (metrology.length <= 0) {
        return verifyStatus;
      }
    }

    // eslint-disable-next-line array-callback-return
    metrology.map((item) => {
      if (item.value > item.variable.max || item.value < item.variable.min) {
        verifyStatus.push({
          title: item.variable.description,
          max: item.variable.max,
          value: item.value,
          min: item.variable.min,
        });
      }
    });

    return verifyStatus;
  }

  return {
    determineStatusDefaultQuestions,
    determineStatusSpecificQuestions,
    determineStatusVariablesByMetrology,
  };
}

async function FinalResultReportStartupDisapproved(
  startupDisapproved: IListReportStartupDTO,
  mailProvider: IMailProvider,
) {
  const data = [];

  const default_questions = JSON.parse(
    startupDisapproved.report_startup_fill[0].default_questions_responses[0]
      .default_questions,
  );
  const specific_questions =
    JSON.parse(
      startupDisapproved.report_startup_fill[0].specific_questions_responses
        .specific_questions,
    ) || [];

  const default_q =
    DetermineReportStartupDisapproved().determineStatusDefaultQuestions({
      default_questions,
    });
  const specific_q =
    DetermineReportStartupDisapproved().determineStatusSpecificQuestions({
      specific_questions,
    });
  const metro =
    DetermineReportStartupDisapproved().determineStatusVariablesByMetrology({
      metrology: startupDisapproved.metrology,
    });

  // eslint-disable-next-line no-use-before-define
  await sendMailReprovedStartup(mailProvider, {
    startup: startupDisapproved.code_startup,
    op: startupDisapproved.op.code_op,
    product: startupDisapproved.op.desc_product,
    client: startupDisapproved.op.client,
    hour_reproved: new Date(),
    machine: startupDisapproved.op.machine,
    metrologiaReproved: metro,
    questionsSpecificReproved: specific_q,
    questionsDefaultReproved: default_q,
  });

  // return {
  //   code_startup: startupDisapproved.code_startup,
  //   code_op: startupDisapproved.op.code_op,
  //   desc_product: startupDisapproved.op.desc_product,
  //   client: startupDisapproved.op.client,
  //   machine: startupDisapproved.op.machine,
  //   start_time: dayjs(startupDisapproved.start_time).format(
  //     "DD/MM/YYYY HH:mm:ss",
  //   ),
  //   default_questions: default_q,
  //   specific_questions: specific_q,
  //   metrology: metro,
  // };

  // return data;

  //   return  {
  //       default_questions : default_q,
  //       specific_questions : specific_q,
  //       metrology:  metro,
  //      }
}

async function sendMailReprovedStartup(
  smailProvider: IMailProvider,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dataStartup: {
    startup: number;
    op: number;
    product: string;
    client: string;
    hour_reproved: Date;
    machine: string;
    metrologiaReproved: any;
    questionsSpecificReproved: any;
    questionsDefaultReproved: any;
  },
): Promise<void> {
  const source = fs.readFileSync(
    path.join(
      __dirname,
      "../assets/handlebars/emailDisapprovedStructure-v2.hbs",
    ),
    "utf8",
  );

  const attachments = [
    {
      filename: "logotuti.png",
      path: path.join(`${__dirname}../../assets/imgs/logotuti.png`),
      cid: "unique@cid",
    },
    {
      filename: "tutilabs_dark.png",
      path: path.join(`${__dirname}../../assets/imgs/tutilabs_dark.png`),
      cid: "unique2@cid",
    },
  ];

  Handlebars.registerPartial(
    "metrologia",
    `<tr> <td>{{metrologia.title}}</td> <td>{{metrologia.max}}</td> <td style="color: #FF5349;">{{metrologia.value}}</td> <td>{{metrologia.min}}</td>  </tr>`,
  );

  Handlebars.registerPartial(
    "questionsSpecific",
    `<tr> <td>{{questionsSpecific.question}}</td> <td>{{questionsSpecific.res}}</td>  </tr>`,
  );

  Handlebars.registerPartial(
    "questionsDefault",
    `<tr> <td>{{questionsDefault.question}}</td> <td>{{questionsDefault.res}}</td>   </tr>`,
  );

  const template = Handlebars.compile(source);

  smailProvider.sendMail({
    from: {
      name: "SGQ - Sistema de Garantia da Qualidade",
      email: `${process.env.EMAIL_MAIL}`,
    },
    to: {
      name: "Colaboradores SGQ",
      email: ["luan.santos@tutiplast.com.br"],
    },
    subject: `Relatorio de Startup Reprovada - OP ${dataStartup.op}`,
    body: template(dataStartup),
    attachments,
  });
}

export { FinalResultReportStartupDisapproved };
