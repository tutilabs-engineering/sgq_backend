import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateVariableUseCase } from "./UpdateVariableUseCase";

class UpdateVariableController{
    async handle(request: Request, response: Response): Promise<Response>{
        const { id } = request.params;
        const filename = request?.file.filename;

        const updateVariableUseCase = container.resolve(UpdateVariableUseCase);
        
        await updateVariableUseCase.execute({id,file: filename})

        return response.status(200).json({message: 'Variável atualizada!'})
    }
}

export { UpdateVariableController }