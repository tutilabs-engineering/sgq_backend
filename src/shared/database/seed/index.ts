import { CreateDefaultQuestions } from "./createDefaultQuestions";
import { CreateRoles } from "./createRoles";
import { CreateStatusStartup } from "./createStatusStartup";
import { CreateUnits } from "./createUnits";
import { CreateUserDefault } from "./createUserDefault";

async function executeSeeds() {
  await CreateRoles();
  await CreateUnits();
  CreateUserDefault();
  CreateDefaultQuestions();
  CreateStatusStartup();
}

executeSeeds();
