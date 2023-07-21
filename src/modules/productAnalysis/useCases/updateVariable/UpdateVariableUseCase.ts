import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { IVariablesRepository } from "@modules/productAnalysis/repositories/IVariablesRepository";
import { IUpdateVariableDTO } from "@modules/productAnalysis/dtos/IUpdateVariableDTO";


@injectable()
class UpdateVariableUseCase {
    
    constructor(@inject("VariablesRepositoryInPrisma") private variablesRepositoryInPrisma: IVariablesRepository) { }

    async execute({ id, file }: IUpdateVariableDTO): Promise<void> {
        if(!id){
            throw new AppError('Id da variável é obrigatório')
        }

        if(!file){
            throw new AppError('Imagem é obrigatória')
        }
        const variable = await this.variablesRepositoryInPrisma.findByVariable(id)
        if(!variable){
            throw new AppError('Variável não encontrada')
        }

        if(variable.file){
            throw new AppError('Variável já possui imagem associada a ela')
        }

        await this.variablesRepositoryInPrisma.updateVariable({id,file})
    }
}

export { UpdateVariableUseCase };
