import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { ListType } from '../types/list-type';
import { ListStatus } from '../types/list-status';

export type ListDocument = List & Document;

@Schema()
export class List {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  type: ListType;

  @Prop()
  status: ListStatus;

  @Prop({ type: JSON })
  data: JSON;

  @Prop({ type: Date, default: () => new Date() })
  createDate: Date;

  @Prop({ type: Date })
  updateDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  updateBy: User;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  rdpList: []

  @Prop()
  rppList: []

  @Prop()
  upload: string
}

export const ListSchema = SchemaFactory.createForClass(List);
