import { ICreatePointToPointDTO } from "@modules/productAnalysis/dtos/ICreatePointToPointDTO";
import { IPointToPointRepository } from "@modules/productAnalysis/repositories/IPointToPointRepository";
import { IProductRepository } from "@modules/productAnalysis/repositories/IProductRepository";
import { AppError } from "@shared/errors/AppError";
import { VariableValidation } from "@shared/errors/factoryValidations/productAnalysis/validations/VariableValidation";
import { FindProductByCodeInSAP } from "@utils/sap/FindProductByCode";
import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

@injectable()
class CreatePointToPointUseCase {
    constructor(@inject("PointToPointRepositoryInPrisma") private pointToPointRepository: IPointToPointRepository, @inject("ProductRepositoryInPrisma")
    private productRepositoryInPrisma: IProductRepository,) { }

    async execute(data: ICreatePointToPointDTO) {
        const {
            ProductDataValidation,
          } = VariableValidation();
          
        if (!data.file) {
            throw new AppError("Imagem é obrigatória")
        }

        if (!data.code_product) {
            throw new AppError("Código do produto é obrigatório")
        }

        if (!data.quantity) {
            throw new AppError("Quantidade é obrigatória")
        }

        if(isNaN(data.quantity)){
            throw new AppError("Quantidade precisa ser um número")
        }

        const sap_product = await FindProductByCodeInSAP(data.code_product);
 
    
        if (!sap_product.status) {
          throw new AppError("Produto não existe", 404);
        }
    
        const desc_product = sap_product.product.name_product;
        const cod_client = "XXX";
        const desc_client = "XXX";

        const productDataValidation = await ProductDataValidation({
          cod_client,
          desc_client,
          cod_product: data.code_product,
          desc_product,
        });

        if (!productDataValidation.status) {
            throw new AppError(productDataValidation.message);
          }
        
        const product = await this.productRepositoryInPrisma.findByProduct(data.code_product)
        if (product) {
            const productPointToPoint = await this.pointToPointRepository.findByProductId(product.id)
            if (productPointToPoint) {
                throw new AppError("Já existe ponto a ponto criado para este produto")
            }
            Object.assign(data, { fk_product_ana: product.id });
        } else {
            Object.assign(data, { fk_product_ana: "undefined" });
        }

        const createdAt = dayjs().format("YYYY-MM-DDTHH:mm:ss-00:00")
        Object.assign(data, {createdAt,desc_client,desc_product,cod_client})
        
        await this.pointToPointRepository.createPointToPoint(data)
    }
}

export { CreatePointToPointUseCase }