import { IListMetrologyHistory } from "../dtos/IListMetrologyHistory";
import { MetrologyHistory } from "../entities/MetrologyHistory";

interface IMetrologyHistoryRepository {
  create(fk_user: string): Promise<MetrologyHistory>;
  finish(id: string): Promise<void>;
}
export { IMetrologyHistoryRepository };
