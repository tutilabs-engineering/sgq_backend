import { IMetrologyHistoryRepository } from "@modules/metrology/repositories/IMetrologyHistoryRepository";
import { IMetrologyRepository } from "@modules/metrology/repositories/IMetrologyRepository";
import { MetrologyHistoryRepositoryInPrisma } from "@modules/metrology/repositories/implements/MetrologyHistoryRepositoryInPrisma";
import { MetrologyRepositoryInPrisma } from "@modules/metrology/repositories/implements/MetrologyRepositoryInPrisma";
import { container } from "tsyringe";

container.registerSingleton<IMetrologyRepository>(
  "MetrologyRepositoryInPrisma",
  MetrologyRepositoryInPrisma,
);

container.registerSingleton<IMetrologyHistoryRepository>(
  "MetrologyHistoryRepositoryInPrisma",
  MetrologyHistoryRepositoryInPrisma,
);
