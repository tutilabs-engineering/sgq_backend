import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateVariableImageUseCase } from "./UpdateVariableImageUseCase";
import { AppError } from "@shared/errors/AppError";

class UpdateVariableImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    if (!request.file) {
      throw new AppError("file should not be empty");
    }
    console.log(typeof request.file.filename);
    const { id } = request.params;
    const filename = request.file.filename;

    const updateVariableImageUseCase = container.resolve(
      UpdateVariableImageUseCase,
    );

    await updateVariableImageUseCase.execute({ id, filename });

    return response.status(200).json({ message: "Successfully updated" });
  }
}

export { UpdateVariableImageController };
