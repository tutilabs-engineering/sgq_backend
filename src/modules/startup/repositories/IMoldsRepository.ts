import { Mold } from "../entities/Mold";

export interface IMoldsRepository {
  createMold(description: string): Promise<void>;
  findMoldByDescription(description: string): Promise<Mold>;
  listMold(): Promise<Mold[]>;
}
