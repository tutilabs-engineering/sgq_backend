import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePointToPointUseCase } from "./CreatePointToPointUseCase";

class CreatePointToPointController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { code_product, quantity } = request.body
        const user = request.user.id;

        const filename = request?.file.filename;

        const createPointToPointUseCase = container.resolve(CreatePointToPointUseCase);

        await createPointToPointUseCase.execute({ code_product, file: filename,quantity: Number(quantity), userThatCreate: user })

        return response.status(201).json({ message: "Created" })

    }
}

export { CreatePointToPointController }