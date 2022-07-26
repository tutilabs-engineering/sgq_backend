/* eslint-disable @typescript-eslint/no-unused-vars */
import "reflect-metadata";
import "dotenv/config";
import { port } from "@config/ServerConfig";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";
import { AppError } from "@shared/errors/AppError";
import { router } from "@shared/routes";
import swaggerFile from "./swagger.json";
import "@shared/container";

interface IApp {
  start: () => void;
}

export function App(): IApp {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
  app.use("/static", express.static(`uploads`));

  app.use(router);

  app.use(
    (
      error: Error,
      request: Request,
      response: Response,
      next: NextFunction,
    ) => {
      if (error instanceof AppError) {
        return response
          .status(error.statusCode)
          .json({ message: error.message });
      }
      return response.status(500).json({
        status: "error",
        message: `Internal server error - ${error.message}`,
      });
    },
  );
  const start = () => {
    app.listen(port, () => {
      console.log(`Server is running in http://localhost:${port}`);
      console.log(`documentation: http://localhost:${port}/api-docs`);
    });
  };

  return { start };
}
