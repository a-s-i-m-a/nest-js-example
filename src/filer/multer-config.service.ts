import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { GridFsStorage } from 'multer-gridfs-storage';
import { configService } from '../config/config.service';

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {

  private readonly gridFsStorage;
  constructor() {
    this.gridFsStorage = new GridFsStorage({
      url: configService.getMongoUri(),
      file: (req, file) => {
        return new Promise((resolve, reject) => {
          const filename = file.originalname.trim();
          const fileInfo = {
            filename: filename
          };
          resolve(fileInfo);
        });
      }
    });
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.gridFsStorage,
    };
  }
}
