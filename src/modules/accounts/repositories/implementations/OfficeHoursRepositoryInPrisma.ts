import { OfficeHour } from "@prisma/client";
import { prismaAgent } from "@shared/database/prismaAgent";
import { IOfficeHoursRepository } from "../IOfficeHoursRepository";

export class OfficeHoursRepositoryInPrisma implements IOfficeHoursRepository {
  async listOfficeHours(): Promise<OfficeHour[]> {
    return prismaAgent.officeHour.findMany();
  }
}
