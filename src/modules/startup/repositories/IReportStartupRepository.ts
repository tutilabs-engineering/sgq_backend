import { IMetrologyDTO } from "@modules/metrology/dtos/IMetrologyDTO";
import { ICreateStartupDTO } from "../dtos/ICreateStartupDTO";
import {
  IDefaultQuestionsDisapprovedDTO,
  IFillReportStartupToDatabaseDTO,
} from "../dtos/IFillReportStartupDTO";
import { IReportStartupByIdDTO } from "../dtos/IFindReportStartupByIdDTO";
import { IFindStartupByMachineDTO } from "../dtos/IFindStartupByMachineDTO";
import { IInsertOpInStartupDTO } from "../dtos/IInsertOpInStartupDTO";
import { IListAllDataStartupByIdDTO } from "../dtos/IListAllDataStartupByIdDTO";
import { IListAllStartupsDTO } from "../dtos/IListAllStartupsDTO";
import { ITakeProductCodeDTO } from "../dtos/ITakeProductCodeDTO";
import { ReportStartup } from "../entities/ReportStartup";
import { ReportStartupFill } from "../entities/ReportStartupFill";

interface IReportStartupRepository {
  create(
    data: ICreateStartupDTO,
    metrology: IMetrologyDTO[],
  ): Promise<ReportStartup>;
  findStartupByCodeOp(code_op: number): Promise<ReportStartup>;
  findAll(): Promise<IListAllStartupsDTO[]>;
  findReportStartupById(startup_id: string): Promise<IReportStartupByIdDTO>;
  fillReportStartup({
    fk_startup,
    default_questions,
    specific_questions,
    user_id,
    final_time,
    statusReportStartup,
    open,
  }: IFillReportStartupToDatabaseDTO): Promise<void>;
  findFillByReportStartupId(startup_id: string): Promise<ReportStartupFill>;
  findAllDataStartupById(
    startup_id: string,
  ): Promise<IListAllDataStartupByIdDTO>;
  takeProductCodeByCodeOp(code_op: number): Promise<ITakeProductCodeDTO>;
  insertOpInStartup(data: IInsertOpInStartupDTO): Promise<void>;
  listAllOpByIdStartup(startup_id: string): Promise<number[]>;
  findStartupsByMachine(
    code_machine: string,
  ): Promise<IFindStartupByMachineDTO[]>;
  closeReportStartup(id_startup: string): Promise<void>;
  insertDefaultQuestionsDisapproved(
    default_questions_disapproved: IDefaultQuestionsDisapprovedDTO[],
  ): Promise<void>;
}

export { IReportStartupRepository };
