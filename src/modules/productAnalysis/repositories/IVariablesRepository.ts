import { ICreateVariableDTO } from "../dtos/ICreateVariableDTO";
import { IFindVariablesDTO } from "../dtos/IFindVariablesDTO";
import { Variable } from "../entities/Variable";

interface IVariablesRepository {
  createdVariable(data: ICreateVariableDTO): Promise<void>;
  findByVariableInProduct(
    code_product: string,
    description: string,
  ): Promise<Variable>;
  listVariablesInProduct(code: string): Promise<Variable[]>;
  updateStatus(id: string, state: boolean): Promise<void>;
  findByVariable(id: string): Promise<Variable>;
  deleteVariable(id: string): Promise<void>;
  findByVariablesAlreadyExists(
    variables: IFindVariablesDTO[],
  ): Promise<Variable[]>;
}

export { IVariablesRepository };
