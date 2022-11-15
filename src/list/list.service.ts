import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List, ListDocument } from './schemas/list.schema';
import { Model } from 'mongoose';
import { CreateListDto } from './dto/create-list.dto';
import { User } from '../user/schemas/user.schema';
import { UpdateListDto } from './dto/update-list.dto';
import { ListStatus } from './types/list-status';

@Injectable()
export class ListService {
  constructor(@InjectModel(List.name) private listModel: Model<ListDocument>) {}
  create(data: CreateListDto, user: User) {
    return this.listModel.create({
      ...data,
      user,
      status: ListStatus.DRAFT,
    });
  }

  list(userId: string) {
    let list = this.listModel.find({ isDeleted: false });
    if (userId) {
      list = this.listModel.find({ isDeleted: false, user: userId })
    }
    return list;
  }

  getById(_id) {
    return this.listModel.findOne({ _id, isDeleted: false });
  }

  updateById(_id, data: UpdateListDto, { user }) {
    return this.listModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          ...data,
          updateDate: new Date(),
          updateBy: user,
        },
      },
      {
        new: true,
      },
    );
  }

  remove(_id) {
    return this.listModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          isDeleted: true,
        },
      },
      {
        new: true,
      },
    );
  }
}
