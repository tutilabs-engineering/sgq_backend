import { Role } from "@modules/accounts/entities/Role";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { IRolesRepository } from "../../repositories/IRolesRepository";

@injectable()
class ListAllRolesUseCase {
  constructor(
    @inject("RolesRepositoryInPrisma")
    private rolesRepositoryInPrisma: IRolesRepository,
  ) {}
  async execute(): Promise<Role[]> {
    try {
      const roles = await this.rolesRepositoryInPrisma.listAllRoles();
      return roles;
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export { ListAllRolesUseCase };
