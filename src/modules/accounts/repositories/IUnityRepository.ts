import { Unity } from "../entities/Unity";

interface IUnitsRepository {
  listAllUnits(): Promise<Unity[]>;
  findById(id: number): Promise<Unity>;
}

export { IUnitsRepository };
