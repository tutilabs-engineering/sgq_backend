import { ICreatePointToPointDTO } from "@modules/productAnalysis/dtos/ICreatePointToPointDTO";
import { IPointToPointRepository } from "../IPointToPointRepository";
import { prismaAgent } from "@shared/database/prismaAgent";

export class PointToPointRepositoryInPrisma implements IPointToPointRepository {
    async createPointToPoint({ file, quantity, userThatCreate, createdAt, code_product, cod_client, desc_client, desc_product, fk_product_ana }: ICreatePointToPointDTO): Promise<void> {

        await prismaAgent.productPointToPoint.create({
            data: {
                file, quantity, userThatCreate: { connect: { id: userThatCreate } }, createdAt, product_ana: {
                    connectOrCreate: {
                        where: {
                            id: fk_product_ana
                        },
                        create: {
                            cod_client,
                            desc_client,
                            desc_product,
                            cod_product: code_product,
                        }
                    }
                }
            }
        })
    }

    async findByProductId(fk_product_ana: string): Promise<PointToPoint> {
        const data = await prismaAgent.productPointToPoint.findUnique({
            where: {
                fk_product_ana
            }
        })
        return data
    }
}