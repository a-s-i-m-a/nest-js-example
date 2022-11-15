import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { configService } from './config/config.service';
import { ListModule } from './list/list.module';
import { FilesModule } from './filer/file.module';

@Module({
  imports: [
    MongooseModule.forRoot(configService.getMongoUri()),
    UserModule,
    ListModule,
    FilesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
