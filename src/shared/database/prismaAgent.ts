import { PrismaClient } from "@prisma/client";

const prismaAgent = new PrismaClient({
  log: [{ level: "query", emit: "event" }],
});


export { prismaAgent };
