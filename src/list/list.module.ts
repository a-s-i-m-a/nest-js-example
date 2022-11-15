import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { List, ListSchema } from './schemas/list.schema';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    UserModule,
    TokenModule,
    MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]),
  ],
  providers: [ListService],
  controllers: [ListController],
})
export class ListModule {}
