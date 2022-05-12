import { MachinesRepositoryInPrisma } from "@modules/startup/repositories/implementations/MachinesRepositoryInPrisma";

const machinesRepositoryInPrisma = new MachinesRepositoryInPrisma();

export async function NeedToCreateNewMachine(
  description: string,
): Promise<boolean> {
  const machine = await machinesRepositoryInPrisma.findMachineByDescription(
    description,
  );

  if (machine) {
    return false;
  }

  return true;
}
