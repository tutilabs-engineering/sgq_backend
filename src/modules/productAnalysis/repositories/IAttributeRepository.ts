import { ICreateAttributeDTO } from "../dtos/ICreateAttributeDTO";
import { Attribute } from "../entities/Attribute";

interface IAttributeRepository {
  createAttribute(data: ICreateAttributeDTO): Promise<void>;
  listAttributesInProduct(code_product: string): Promise<Attribute[]>;
  findByAttributeInProduct(
    code_product: string,
    question: string,
  ): Promise<Attribute>;
  findByAttribute(id: string): Promise<Attribute>;
  updateStatus(id: string, state: boolean): Promise<void>;
  updateAttention(id: string, state: boolean): Promise<void>;
  deleteAttribute(id: string): Promise<void>;
}

export { IAttributeRepository };
