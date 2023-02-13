import { prismaAgent } from "../prismaAgent";

async function CreateRoles() {
  try {
    await prismaAgent.role.createMany({
      data: [
        { id: 1, description: "admin" },
        { id: 2, description: "gestor" },
        { id: 3, description: "analista" },
        { id: 4, description: "metrologista" },
        { id: 5, description: "inspetor" },
      ],
    });
    return console.log("Created roles");
  } catch {
    return console.log("Roles already exists!");
  }
}

export { CreateRoles };
