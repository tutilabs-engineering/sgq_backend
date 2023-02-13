import { hash } from "bcryptjs";
import { prismaAgent } from "../prismaAgent";

async function CreateUserDefault(): Promise<void> {
  const register = "0001";
  const password = `admin@${register}`;
  const passwordHash = await hash(password, 8);

  try {
    const user = await prismaAgent.user.create({
      data: {
        name: "tutilabs admin",
        email: "tutilabs.engineer@gmail.com",
        cpf: "12345678910",
        register,
        password: passwordHash,
        fk_role: 1,
        fk_unity: 1,
        fk_office_hour: 4,
      },
    });

    return console.log({
      UserDefault: {
        name: user.name,
        register,
        password,
      },
    });
  } catch {
    return console.log("User Default already created!");
  }
}

export { CreateUserDefault };
