import { CreateDefaultQuestions } from "./createDefaultQuestions";
import { CreateOfficeHours } from "./createOfficeHours";
import { CreateRoles } from "./createRoles";
import { CreateStatusStartup } from "./createStatusStartup";
import { CreateUnits } from "./createUnits";
import { CreateUserDefault } from "./createUserDefault";

async function executeSeeds() {
  await CreateRoles();
  await CreateUnits();
  await CreateOfficeHours();
  CreateUserDefault();
  CreateDefaultQuestions();
  CreateStatusStartup();
}

executeSeeds();
