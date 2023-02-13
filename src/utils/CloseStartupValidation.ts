import { MetrologyRepositoryInPrisma } from "@modules/metrology/repositories/implements/MetrologyRepositoryInPrisma";
import { ReportStartupsInPrisma } from "../modules/startup/repositories/implementations/ReportStartupsInPrisma";

export interface ICloseReportStartup {
  code_machine: string;
  code_mold: string;
}

interface ICloseReportStartupResponse {
  status: boolean;
  needToClose: boolean;
  message?: string;
  data?: string;
}

const reportStartupsInPrisma = new ReportStartupsInPrisma();
const metrologyRepositoryInPrisma = new MetrologyRepositoryInPrisma();

export async function CloseStartupValidation({
  code_machine,
  code_mold,
}: ICloseReportStartup): Promise<ICloseReportStartupResponse> {
  // buscando todas as startups com essa máquina
  const startups = await reportStartupsInPrisma.findStartupsByMachine(
    code_machine,
  );

  console.log("startupsss", startups);

  // verificando se máquina existe em algum startup
  if (startups.length <= 0) {
    return {
      status: false,
      message: "The machine is not registered in any report startup",
      needToClose: false,
    };
  }

  let index = 0;
  // contagem de startups encontradas

  const validationResponse = startups.map(async (startup) => {
    // const metrology =
    //   await metrologyRepositoryInPrisma.findMetrologyStatusByStartupId(
    //     startup.id,
    //   );

    // let metrologyFilled = true;

    // metrology.forEach((m) => {
    //   if (m.metrology) {
    //     metrologyFilled = false;
    //   }
    // });

    if (startup.open) {
      if (!startup.filled) {
        // console.log("Last report Startup must be filled");
        return {
          status: true, // para enviar mensagem no body para o cliente
          message: "A ultima Startup precisa ser preenchida.", // mensagem enviada ao cliente
          needToClose: false, // para fechar startup
          data: startup.id, // para identificar startup que precisa ser preenchida
        };
      }
      // if (metrologyFilled) {
      // eslint-disable-next-line eqeqeq
      if (startup.op.machine == code_machine) {
        // eslint-disable-next-line eqeqeq
        if (startup.op.product_mold == code_mold) {
          // console.log("Same mold in machine");
          return {
            status: true,
            message: "Mesmo molde na máquina.",
            data: startup.id,
            needToClose: true,
          };
        }
        // console.log("New mold in machine");
        return {
          status: true,
          message: "Novo molde na máquina.",
          data: startup.id,
          needToClose: true,
        };
      }
      // }
      // console.log("retorno de metrologia");
      // return {
      //   status: true,
      //   message: "A metrologia deve ser preenchida.",
      //   needToClose: false,
      // };
    }
    // console.log("The last report startup is already Closed");
    index += 1;
    return {
      status: false,
      message: "A última Startup já está fechada.",
      needToClose: false,
    };
  });

  console.log("aqui");
  console.log(validationResponse);
  console.log("saiu");

  // if (validationResponse.length === 1) {
  //   return validationResponse[0];
  // }

  // return validationResponse[index];
  return validationResponse[0];
}
