import { RolesRepositoryInPrisma } from "@modules/accounts/repositories/implementations/RolesRepositoryInPrisma";
import { UnitsRepositoryInPrisma } from "@modules/accounts/repositories/implementations/UnitsRepositoryInPrisma";
import { UsersRepositoryInPrisma } from "@modules/accounts/repositories/implementations/UsersRepositoryInPrisma";
import { IRolesRepository } from "@modules/accounts/repositories/IRolesRepository";
import { IUnitsRepository } from "@modules/accounts/repositories/IUnityRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { container } from "tsyringe";

container.registerSingleton<IRolesRepository>(
  "RolesRepositoryInPrisma",
  RolesRepositoryInPrisma,
);

container.registerSingleton<IUnitsRepository>(
  "UnitsRepositoryInPrisma",
  UnitsRepositoryInPrisma,
);

container.registerSingleton<IUsersRepository>(
  "UsersRepositoryInPrisma",
  UsersRepositoryInPrisma,
);
