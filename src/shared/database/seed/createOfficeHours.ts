import { prismaAgent } from "../prismaAgent";

export async function CreateOfficeHours() {
  const verifyExists = await prismaAgent.officeHour.findUnique({
    where: {
      id: 1,
    },
  });
  if (verifyExists) {
    return console.log("Office Hours already created");
  }
  await prismaAgent.officeHour.createMany({
    data: [
      { id: 1, description: "1 turno" },
      { id: 2, description: "2 turno" },
      { id: 3, description: "3 turno" },
      { id: 4, description: "Comercial" },
    ],
  });
  return console.log("Created Office Hours");
}
