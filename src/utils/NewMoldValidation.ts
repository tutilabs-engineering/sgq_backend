import { MoldsRepositoryInPrisma } from "@modules/startup/repositories/implementations/MoldsRepositoryInPrisma";

const moldsRepositoryInPrisma = new MoldsRepositoryInPrisma();

export async function NeedToCreateNewMold(
  description: string,
): Promise<boolean> {
  const mold = await moldsRepositoryInPrisma.findMoldByDescription(description);

  if (mold) {
    return false;
  }

  return true;
}
