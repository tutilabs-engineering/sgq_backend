import { prismaAgent } from "../prismaAgent";

async function CreateStatusStartup(): Promise<void> {
  const verify = await prismaAgent.statusStartup.findUnique({
    where: { id: 1 },
  });

  if (verify) {
    return console.log("Status of startup already created");
  }

  await prismaAgent.statusStartup.createMany({
    data: [
      {
        id: 1,
        description: "approved",
      },
      {
        id: 2,
        description: "disapproved",
      },
      {
        id: 3,
        description: "approved with condition",
      },
      {
        id: 4,
        description: "not applicable",
      },
      {
        id: 5,
        description: "undefined",
      },
    ],
  });

  console.log("Created status startup");
}

export { CreateStatusStartup };
