import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { IRolesRepository } from "../../repositories/IRolesRepository";

interface IRequest {
  description: string;
}

@injectable()
class CreateRoleUseCase {
  constructor(
    @inject("RolesRepositoryInPrisma")
    private rolesRepositoryInPrisma: IRolesRepository,
  ) {}

  async execute({ description }: IRequest): Promise<void> {
    const roleAlreadyExits =
      await this.rolesRepositoryInPrisma.findByDescription(
        description.toLowerCase(),
      );
    if (roleAlreadyExits) {
      throw new AppError("Role already exists");
    }
    await this.rolesRepositoryInPrisma.createRole(
      description.toLocaleLowerCase(),
    );
  }
}

export { CreateRoleUseCase };
