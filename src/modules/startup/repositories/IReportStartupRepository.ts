import { IListReportStartupDTO } from "@modules/metrology/dtos/IListReportStartupDTO";
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
import { ReportStartupFillState } from "../entities/ReportStartupFillState";

interface IReportStartupRepository {
  create(
    data: ICreateStartupDTO,
    metrology: IMetrologyDTO[],
  ): Promise<ReportStartup>;
  findStartupByCodeOp(code_op: number): Promise<ReportStartup>;
  findAll(
    skip?: number,
    take?: number,
    fk_op?: number,
    condition?: any,
  ): Promise<IListAllStartupsDTO[]>;
  findAllByStatus(skip?: number, take?: number, status?: number): Promise<any>;
  findAllFilterByCount(start_time: Date, end_time: Date): Promise<any>;
  findReportStartupById(startup_id: string): Promise<IReportStartupByIdDTO>;
  fillReportStartup({
    fk_startup,
    default_questions,
    specific_questions,
    user_id,
    final_time,
    statusReportStartup,
    open,
    filled,
  }: IFillReportStartupToDatabaseDTO): Promise<void>;
  findFillByReportStartupId(
    startup_id: string,
  ): Promise<ReportStartupFillState>;
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
  deleteFillReportStartup(idFillReportStartup: string): Promise<void>;
  findStartupReprovedAndClosed(id: string): Promise<IListReportStartupDTO>;
}

export { IReportStartupRepository };
