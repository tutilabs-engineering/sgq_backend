import { IListAllDataFilter } from "../dtos/IListAllDataFilter";
import { IListClientDTO } from "../dtos/IListClientDTO";
import { IListMachineDTO } from "../dtos/IListMachineDTO";
import { IListProductDTO } from "../dtos/IListProductDTO";

export interface IDefaultQuestionsDisapproved {
  id: string;
  id_startup: string;
  id_default_question: string;
}

export interface IFilterByDateDefaultQuestionsDisapproved {
  date_start: Date;
  date_end: Date;
  id_default_question: string;
}

interface IDashboardRepository {
  listAllDataFilterByStartup(data: IListAllDataFilter): Promise<any>;
  listAllDataFilterByMetrology(data: IListAllDataFilter): Promise<any>;
  listAllDataMachine(): Promise<IListMachineDTO[]>;
  listAllDataCodeProduct(): Promise<IListProductDTO[]>;
  listAllDataClient(): Promise<IListClientDTO[]>;
  listDefaultQuestionsDisapproved(
    id_default_question: string,
  ): Promise<IDefaultQuestionsDisapproved[]>;
  listDefaultQuestionsDisapprovedByDate(
    data: IFilterByDateDefaultQuestionsDisapproved,
  ): Promise<any>;
}

export { IDashboardRepository };
