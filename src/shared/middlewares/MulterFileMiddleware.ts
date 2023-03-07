import cryto from "crypto";
import { Request } from "express";
import fs from "fs";
import mime from "mime-types";
import multer from "multer"; // Importaremos para realizar o upload
import path from "path"; // Ajudara no aminho para guardar imagems

class UploadFile {

  private URL = path.resolve(process.cwd(), 'uploads','variables');

  private storage(): multer.StorageEngine {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        if (!fs.existsSync(this.URL)) {
          fs.mkdirSync(this.URL);
        }
        cb(null, this.URL);
      },
      filename: (req, file, cb) => {
        cryto.randomBytes(16, (error, hash) => {
          const fileName = `${hash.toString("hex")}-${file.originalname}`;

          return cb(null, fileName);
        });
      },
    });
  }

  private fileFilter() {
    return (
      req: Request,
      file: Express.Multer.File,
      cb: multer.FileFilterCallback,
    ) => {
      const type = mime.extension(file.mimetype);
      const conditions = ["png", "jpg", "jpeg"];

      if (conditions.includes(`${type}`)) {
        cb(null, true);
      }
      cb(null, false);
    };
  }

  get getConfig(): multer.Options {
    return {
      storage: this.storage(),
      // fileFilter: this.fileFilter(),
    };
  }
}

export { UploadFile };
