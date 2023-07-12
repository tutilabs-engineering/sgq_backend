import { MetrologyRepositoryInPrisma } from "@modules/metrology/repositories/implements/MetrologyRepositoryInPrisma";
import { ReportStartupsInPrisma } from "../modules/startup/repositories/implementations/ReportStartupsInPrisma";
import { MoldsRepositoryInPrisma } from "@modules/startup/repositories/implementations/MoldsRepositoryInPrisma";
import { AppError } from "@shared/errors/AppError";

export interface ICloseReportStartup {
  code_machine: string;
  code_mold: string;
}

const reportStartupsInPrisma = new ReportStartupsInPrisma();
const metrologyRepositoryInPrisma = new MetrologyRepositoryInPrisma();
const moldsRepositoryInPrisma = new MoldsRepositoryInPrisma();

export async function CloseStartupValidation({
  code_machine,
  code_mold,
}: ICloseReportStartup){
  // buscando todas as startups com essa máquina
  const startups = await reportStartupsInPrisma.findStartupsByMachine(
    code_machine,
  );
  let index = 0;
  startups.map(async (startup) => {
    if (startup.open) {
      if (!startup.filled) {
        throw new AppError("A ultima Startup precisa ser preenchida.");
      }
      // if (metrologyFilled) {
      // eslint-disable-next-line eqeqeq
      const mold = await moldsRepositoryInPrisma.findMoldByDescription(code_mold)
      if (startup.op.machine == code_machine && !mold.is_family) {
        // eslint-disable-next-line eqeqeq
        if (startup.op.product_mold == code_mold) {
          await reportStartupsInPrisma.closeReportStartup(startup.id)
        }else{
          await reportStartupsInPrisma.closeReportStartup(startup.id)
        }
      }
    }
    index += 1;
  });
}
