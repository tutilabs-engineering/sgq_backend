import { IDashboardRepository } from "@modules/dashboard/repositories/IDashboardRepository";
import { DashboardRepositoryInPrisma } from "@modules/dashboard/repositories/implementations/DashboardRepositoryInPrisma";
import { container } from "tsyringe";

container.registerSingleton<IDashboardRepository>(
  "DashboardRepositoryInPrisma",
  DashboardRepositoryInPrisma,
);
