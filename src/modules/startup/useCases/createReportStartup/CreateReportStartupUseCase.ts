import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateStartupDTO } from "@modules/startup/dtos/ICreateStartupDTO";
import { IMachinesRepository } from "@modules/startup/repositories/IMachinesRepository";
import { IMoldsRepository } from "@modules/startup/repositories/IMoldsRepository";
import { IReportStartupRepository } from "@modules/startup/repositories/IReportStartupRepository";
// import dayjs from "dayjs";
import { CloseStartupValidation } from "@utils/CloseStartupValidation";
import { FormatDataMetrologyProvider } from "@utils/formatDataToMetrology";
import { NeedToCreateNewMachine } from "@utils/NewMachineValidation";
import { NeedToCreateNewMold } from "@utils/NewMoldValidation";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { StartupValidations } from "@shared/errors/factoryValidations/startup/validations/StartupValidations";

interface IReturnFormattedOnCreateStartup {
  id: string;
  fk_op: number;
  userIdWhoCreated: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  user?:{
    id: string,
    unity?:{
      id: number,
      name: string
    }
  }
}

@injectable()
class CreateReportStartupUseCase {
  constructor(
    @inject("ReportStartupsInPrisma")
    private reportStartupsInPrisma: IReportStartupRepository,
    @inject("UsersRepositoryInPrisma")
    private usersRepositoryInPrisma: IUsersRepository,
    @inject("MachinesRepositoryInPrisma")
    private machinesRepositoryInPrisma: IMachinesRepository,
    @inject("MoldsRepositoryInPrisma")
    private moldsRepositoryInPrisma: IMoldsRepository,
  ) {}
  async execute({
    code_op,
    user_id,
    header: {
      client,
      code_client,
      code_product,
      desc_product,
      product_mold,
      machine,
      day,
      start_time,
      quantity,
      nqa,
      level,
      piq
    },
    user,
    techniqueData: { cavity, cycle },
    components,
  }: ICreateStartupDTO): Promise<IReturnFormattedOnCreateStartup> {
    const { CreateStartupValidations } = StartupValidations();

    const newReportStartup = {
      code_op,
      user_id,
      header: {
        client,
        code_client,
        code_product,
        desc_product,
        machine,
        product_mold,
        quantity: quantity.toString(),
        day,
        start_time,
        nqa,
        piq,
        level
      },
      techniqueData: {
        cavity,
        cycle,
      },
      components,
      user,

    };

    const validation = await CreateStartupValidations(newReportStartup);
    if (!validation.status) {
      throw new AppError(validation.message, validation.statusCode);
    }

    const formattedDataMetrology = await FormatDataMetrologyProvider({
      cavity: Number(cavity),
      code_product,
    });

    const startupCloseValidation = await CloseStartupValidation({
      code_machine: machine,
      code_mold: product_mold,
    });
    // A ultima Startup precisa ser preenchida
    if (startupCloseValidation && startupCloseValidation.status && !startupCloseValidation.needToClose) {
      throw new AppError(startupCloseValidation.message);
    }
    const needToCreateANewMachine = await NeedToCreateNewMachine(machine);
    const needToCreateANewMold = await NeedToCreateNewMold(product_mold);

    const startupCreated = await this.reportStartupsInPrisma.create(
      newReportStartup,
      formattedDataMetrology,
    );

    if (needToCreateANewMachine) {
      await this.machinesRepositoryInPrisma.createMachine(machine);
    }

    if (needToCreateANewMold) {
      await this.moldsRepositoryInPrisma.createMold(product_mold);
    }

    const formattedData: IReturnFormattedOnCreateStartup = {
      id: startupCreated.id,
      fk_op: startupCreated.fk_op,
      status: startupCreated.fk_status,
      userIdWhoCreated: startupCreated.fk_user_create,
      createdAt: startupCreated.createdAt,
      updatedAt: startupCreated.updatedAt,
    };

    return formattedData;
  }
}

export { CreateReportStartupUseCase };
