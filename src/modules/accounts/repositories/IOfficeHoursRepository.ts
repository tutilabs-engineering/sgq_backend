import { OfficeHour } from "@prisma/client";

export interface IOfficeHoursRepository {
  listOfficeHours(): Promise<OfficeHour[]>;
}
