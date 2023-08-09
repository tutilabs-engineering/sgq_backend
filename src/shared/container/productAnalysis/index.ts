import { IAttributeRepository } from "@modules/productAnalysis/repositories/IAttributeRepository";
import { AttributeRepositoryInPrisma } from "@modules/productAnalysis/repositories/implementations/AttributeRepositoryInPrisma";
import { PointToPointRepositoryInPrisma } from "@modules/productAnalysis/repositories/implementations/PointToPointRepositoryInPrisma";
import { ProductRepositoryInPrisma } from "@modules/productAnalysis/repositories/implementations/ProductRepositoryInPrisma";
import { VariablesRepositoryInPrisma } from "@modules/productAnalysis/repositories/implementations/VariablesRepositoryInPrisma";
import { SAPProductRepositoryInMemory } from "@modules/productAnalysis/repositories/inMemory/SAPProductRepositoryInMemory";
import { IPointToPointRepository } from "@modules/productAnalysis/repositories/IPointToPointRepository";
import { IProductRepository } from "@modules/productAnalysis/repositories/IProductRepository";
import { ISAPProductRepository } from "@modules/productAnalysis/repositories/ISAPProductRepository";
import { IVariablesRepository } from "@modules/productAnalysis/repositories/IVariablesRepository";
import { container } from "tsyringe";


container.registerSingleton<IPointToPointRepository>(
  "PointToPointRepositoryInPrisma",
  PointToPointRepositoryInPrisma
)

container.registerSingleton<IVariablesRepository>(
  "VariablesRepositoryInPrisma",
  VariablesRepositoryInPrisma,
);

container.registerSingleton<IProductRepository>(
  "ProductRepositoryInPrisma",
  ProductRepositoryInPrisma,
);

container.registerSingleton<IAttributeRepository>(
  "AttributeRepositoryInPrisma",
  AttributeRepositoryInPrisma,
);

container.registerSingleton<ISAPProductRepository>(
  "SAPProductRepositoryInMemory",
  SAPProductRepositoryInMemory,
);
