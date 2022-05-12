import { Machine } from "../entities/Machine";

export interface IMachinesRepository {
  createMachine(description: string): Promise<void>;
  findMachineByDescription(description: string): Promise<Machine>;
  listMachines(): Promise<Machine[]>;
}
