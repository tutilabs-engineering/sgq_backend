import { IListAllDataFilter } from "@modules/dashboard/dtos/IListAllDataFilter";
import { IListClientDTO } from "@modules/dashboard/dtos/IListClientDTO";
import { IListMachineDTO } from "@modules/dashboard/dtos/IListMachineDTO";
import { IListProductDTO } from "@modules/dashboard/dtos/IListProductDTO";
import { prismaAgent } from "../../../../shared/database/prismaAgent";
import {
  IDashboardRepository,
  IDefaultQuestionsDisapproved,
  IFilterByDateDefaultQuestionsDisapproved,
} from "../IDashboardRepository";

class DashboardRepositoryInPrisma implements IDashboardRepository {
  async listDefaultQuestionsDisapprovedByDate({
    date_end,
    date_start,
    id_default_question,
    hourStart,
    hourEnd,
  }: IFilterByDateDefaultQuestionsDisapproved): Promise<any> {
    // return prismaAgent.$queryRawUnsafe(`
    //   SELECT * FROM default_questions_disapproved
    //   WHERE created_at BETWEEN '%${date_start}%' and '%${date_end}%'
    //   AND id_default_question = '${id_default_question}'
    // `);
    return prismaAgent.$queryRawUnsafe(`
      SELECT * FROM default_questions_disapproved dqd
      inner join report_startup re on re.id = dqd.id_startup
      WHERE dqd.created_at BETWEEN '${date_start}' and '${date_end}'
      AND id_default_question = '${id_default_question}'
      and cast(re.start_time as time) BETWEEN '${hourStart}' and '${hourEnd}'  
    `);
  }

  async listDefaultQuestionsDisapproved(
    id_default_question: string,
  ): Promise<IDefaultQuestionsDisapproved[]> {
    return prismaAgent.defaultQuestionsDisapproved.findMany({
      where: {
        id_default_question,
      },
    });
  }

  async listAllDataFilterByStartup({
    machine,
    code_product,
    code_client,
    day,
    dayEnd,
    hourStart,
    hourEnd,
    dataQuery = ''
  }: IListAllDataFilter): Promise<any> {
    const data = await prismaAgent.$queryRawUnsafe(`
    select count(rs.code_startup) as QuantityStartup,
    cast (avg(rs.final_time - rs.start_time)  AS varchar(255)) as time,
    to_char(rs.start_time,'yyyy-mm-dd 00:00:00') as start_time  from report_startup rs
    inner join op on op.code_op = rs.fk_op
    where rs.filled = true and op.machine like '%${machine}%' and op.code_product like '%${code_product}%' and op.code_client like '%${code_client}%' and rs.start_time >= '${day}' and rs.start_time <= '${dayEnd}'
    and cast(rs.start_time as time) BETWEEN '${hourStart}' and '${hourEnd}' 
    ${dataQuery}
    group by to_char(rs.start_time,'yyyy-mm-dd 00:00:00')`);

    return data;
  }

  async listAllDataFilterByMetrology({
    day,
    dayEnd,
    hourStart,
    hourEnd,
  }: IListAllDataFilter): Promise<any> {
    const data = await prismaAgent.$queryRawUnsafe(
      ` 
    select count(DISTINCT me.fk_startup) as quantityMetrology,
    cast(avg(mh."endDate" - mh."startDate")  AS varchar(255)) as time,
    to_char(mh."startDate",'yyyy-mm-dd 00:00:00') as DATE from metrology me
    left join "metrologyHistory" mh on me."fk_metrologyHistory" = mh.id
    where me.metrology = false and mh."startDate" >= '${day}' and mh."endDate" <= '${dayEnd}' 
    and cast(mh."startDate" as time) BETWEEN '${hourStart}' and '${hourEnd}' 
    group by to_char(mh."startDate",'yyyy-mm-dd 00:00:00');
    `,
    );

    return data;
  }

  async listAllDataMachine(): Promise<IListMachineDTO[]> {
    const listMachine = await prismaAgent.op.findMany({
      distinct: ["machine"],
      select: {
        machine: true,
      },
    });
    return listMachine;
  }

  async listAllDataClient(): Promise<IListClientDTO[]> {
    const listClient = await prismaAgent.op.findMany({
      distinct: ["client"],
      select: {
        client: true,
        code_client: true,
      },
    });
    return listClient;
  }
  async listAllDataCodeProduct(): Promise<IListProductDTO[]> {
    const listProduct = await prismaAgent.op.findMany({
      distinct: ["client"],
      select: {
        code_product: true,
        desc_product: true,
      },
    });
    return listProduct;
  }
  async listAllDataStandardQUestions(): Promise<any> {
    const listStandardQUestions = await prismaAgent.reportStartupFill.findMany({
      select: {
        startup: true,
        default_questions_responses: true,
      },
    });

    return listStandardQUestions;
  }
}

export { DashboardRepositoryInPrisma };
