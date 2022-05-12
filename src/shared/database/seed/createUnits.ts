import { prismaAgent } from "../prismaAgent";

async function CreateUnits() {
  try {
    await prismaAgent.unity.createMany({
      data: [
        { id: 1, name: "matriz" },
        { id: 2, name: "filial" },
      ],
    });
    return console.log("Created units");
  } catch {
    return console.log("Units already exists!");
  }
}

export { CreateUnits };
