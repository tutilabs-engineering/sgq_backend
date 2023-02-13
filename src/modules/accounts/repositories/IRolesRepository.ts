import { Role } from "../entities/Role";

interface IRolesRepository {
  createRole(description: string): Promise<void>;
  findRoleById(id: number): Promise<Role>;
  findByDescription(description: string): Promise<Role>;
  listAllRoles(): Promise<Role[]>;
}

export { IRolesRepository };
