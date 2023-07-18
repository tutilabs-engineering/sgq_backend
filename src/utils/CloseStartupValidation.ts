import { ReportStartupsInPrisma } from "../modules/startup/repositories/implementations/ReportStartupsInPrisma";
import { MoldsRepositoryInPrisma } from "@modules/startup/repositories/implementations/MoldsRepositoryInPrisma";
import { AppError } from "@shared/errors/AppError";

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
const moldsRepositoryInPrisma = new MoldsRepositoryInPrisma();

export async function CloseStartupValidation({
  code_machine,
  code_mold,
}: ICloseReportStartup): Promise<ICloseReportStartupResponse> {
  // buscando todas as startups com essa máquina
  const startups = await reportStartupsInPrisma.findStartupsByMachine(
    code_machine,
  );

  const validationResponse = startups.find((startup)=>{
    if(startup.open && !startup.filled){
        return startup
    }else{
      return undefined
    }
  })
  if(validationResponse){  
  return {
    status: true,
    message: "A ultima Startup precisa ser preenchida.",
    needToClose: false,
  };
 }
 
  startups.map(async (startup)=>{
    const mold = await moldsRepositoryInPrisma.findMoldByDescription(code_mold)
    if (code_mold == startup.op.product_mold && !mold.is_family) {
      await reportStartupsInPrisma.closeReportStartup(
        startup.id,
      );
    } else if (code_mold != startup.op.product_mold) {
      await reportStartupsInPrisma.closeReportStartup(
        startup.id,
        );
      }
    })

}
