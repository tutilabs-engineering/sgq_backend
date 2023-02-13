import { Role } from "@modules/accounts/entities/Role";
import { prismaAgent } from "@shared/database/prismaAgent";
import { IRolesRepository } from "../IRolesRepository";

class RolesRepositoryInPrisma implements IRolesRepository {
  async listAllRoles(): Promise<Role[]> {
    const allRoles = await prismaAgent.role.findMany();
    return allRoles;
  }
  async findByDescription(description: string): Promise<Role> {
    const role = await prismaAgent.role.findFirst({ where: { description } });
    return role;
  }
  async findRoleById(id: number): Promise<Role> {
    const role = await prismaAgent.role.findFirst({ where: { id } });
    return role;
  }

  async createRole(description: string): Promise<void> {
    await prismaAgent.role.create({
      data: {
        description,
      },
    });
  }
}

export { RolesRepositoryInPrisma };
