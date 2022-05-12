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

export async function CloseStartupValidation({
  code_machine,
  code_mold,
}: ICloseReportStartup): Promise<ICloseReportStartupResponse> {
  const startups = await reportStartupsInPrisma.findStartupsByMachine(
    code_machine,
  );

  if (!startups.length) {
    return {
      status: false,
      message: "The machine is not registered in any report startup",
      needToClose: false,
    };
  }

  let index = 0;

  const validationResponse = startups.map((startup) => {
    if (startup.open) {
      if (!startup.filled) {
        // console.log("Last report Startup must be filled");
        return {
          status: true,
          message: "The last report startup must be filled",
          needToClose: false,
          data: startup.id,
        };
      }
      if (startup.op.machine === code_machine) {
        if (startup.op.product_mold === code_mold) {
          // console.log("Same mold in machine");
          return {
            status: false,
            message: "Same mold in machine",
            needToClose: false,
          };
        }
        // console.log("New mold in machine");
        return {
          status: true,
          message: "New mold in machine",
          data: startup.id,
          needToClose: true,
        };
      }
    }
    // console.log("The last report startup is already Closed");
    index += 1;
    return {
      status: false,
      message: "Last Report Startup is already Closed",
      needToClose: false,
    };
  });

  if (validationResponse.length === 1) {
    return validationResponse[0];
  }

  return validationResponse[index];
}
