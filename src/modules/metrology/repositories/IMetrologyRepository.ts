import { IFindMetrology } from "../dtos/IFindMetrology";
import { IFindMetrologyByStartup } from "../dtos/IFindMetrologyByStartup";
import { IJoinUserInMetrology } from "../dtos/IJoinUserInMetrology";
import { IListMetrologyHistory } from "../dtos/IListMetrologyHistory";
import { IListMetrologyOfStartup } from "../dtos/IListMetrologyOfStartup";
import { IStatusMetrologyDTO } from "../dtos/IStatusMetrologyDTO";

interface IMetrologyRepository {
  listMetrologyOfStartup(): Promise<IListMetrologyOfStartup[]>;
  listMetrologyHistoryOfStartup(): Promise<IListMetrologyHistory[]>;
  findByMetrology(id: string): Promise<IFindMetrology>;
  findByMetrologyAllVariables(
    startup: string,
  ): Promise<IFindMetrologyByStartup[]>;
  updateMetrology(value: number, id: string): Promise<void>;
  updateToJoinMetrology({
    startup,
    fk_metrologyHistory,
  }: IJoinUserInMetrology): Promise<void>;
  updateToFinalizeMetrology(startup: string): Promise<void>;
  findMetrologyStatusByStartupId(
    startup_id: string,
  ): Promise<IStatusMetrologyDTO[]>;
}

export { IMetrologyRepository };
