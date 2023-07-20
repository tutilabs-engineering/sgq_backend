import { IOpsToCloseData } from "@modules/startup/dtos/ICloseStartupDTO";
import { IReportStartupRepository } from "@modules/startup/repositories/IReportStartupRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CloseStartupByOpUseCase {
    constructor(@inject("ReportStartupsInPrisma") private reportStartupsInPrisma: IReportStartupRepository){}

    async execute(data: IOpsToCloseData[]){
        data.forEach(async (data)=>{
            try {
                await this.reportStartupsInPrisma.closeReportsStartupByOp(data)
            } catch (error) {
                console.log(error)
            }
        })
    }
}

export { CloseStartupByOpUseCase }