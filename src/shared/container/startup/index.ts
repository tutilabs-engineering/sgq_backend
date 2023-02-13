import { IDefaultQuestionsRepository } from "@modules/startup/repositories/IDefaultQuestionsRepository";
import { IMachinesRepository } from "@modules/startup/repositories/IMachinesRepository";
import { IMoldsRepository } from "@modules/startup/repositories/IMoldsRepository";
import { DefaultQuestionsInPrisma } from "@modules/startup/repositories/implementations/DefaultQuestionsInPrisma";
import { MachinesRepositoryInPrisma } from "@modules/startup/repositories/implementations/MachinesRepositoryInPrisma";
import { MoldsRepositoryInPrisma } from "@modules/startup/repositories/implementations/MoldsRepositoryInPrisma";
import { ReportStartupsInPrisma } from "@modules/startup/repositories/implementations/ReportStartupsInPrisma";
import { IReportStartupRepository } from "@modules/startup/repositories/IReportStartupRepository";
import { container } from "tsyringe";

container.registerSingleton<IDefaultQuestionsRepository>(
  "DefaultQuestionsInPrisma",
  DefaultQuestionsInPrisma,
);

container.registerSingleton<IReportStartupRepository>(
  "ReportStartupsInPrisma",
  ReportStartupsInPrisma,
);

container.registerSingleton<IMachinesRepository>(
  "MachinesRepositoryInPrisma",
  MachinesRepositoryInPrisma,
);

container.registerSingleton<IMoldsRepository>(
  "MoldsRepositoryInPrisma",
  MoldsRepositoryInPrisma,
);
