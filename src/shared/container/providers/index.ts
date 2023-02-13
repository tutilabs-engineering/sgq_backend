import { container } from "tsyringe";
import { IDateProvider } from "./dateProvider/IDateProvider";
import { DayjsDateProvider } from "./dateProvider/implementations/DayJsDateProvider";
import { IMailProvider } from "./mailProvider/IMailProvider";
import { MailProvider } from "./mailProvider/implementations/MailProviders";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider,
);

container.registerSingleton<IMailProvider>("MailProvider", MailProvider);
