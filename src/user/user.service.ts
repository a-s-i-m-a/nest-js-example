import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './types/user-roles';
import { TokenService } from '../token/token.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private tokenService: TokenService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  async list() {
    return this.userModel.find({ $or :[{ isDeleted: false }, { isDeleted: null }] });
  }

  async getById(_id): Promise<User> {
    const user = await this.userModel.findOne({ _id, $or :[{ isDeleted: false }, { isDeleted: null }] });
    if (!user) {
      throw new NotFoundException('user is not found');
    }
    return user;
  }

  async setUserRole(userId: string, roles: UserRole[]) {
    const user = await this.getById(userId);
    return this.userModel.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          roles: roles,
        },
      },
      {
        new: true,
      },
    );
  }

  async getByToken(token: string) {
    const { status } = await this.tokenService.validate(token);
    if (!status) {
      throw new HttpException('token is not valid', 400);
    }
    // roles: [ { service: 'assessment', role: 'user' } ]
    const { values } = await this.tokenService.getUserData(token);
    const [userData] = values;
    if (!userData) {
      throw new NotFoundException('user not found');
    }
    let user = await this.userModel.findOne({ _id: userData.id });
    if (user) {
      await this.userModel.findOneAndUpdate(
        { _id: user._id },
        {
          $set: {
            firstName: userData.user_info.passport.name,
            lastName: userData.user_info.passport.sur_name,
          },
        },
        {
          new: true,
        },
      )
    }
    if (!user) {
      user = await this.userModel.create({ _id: userData.id, firstName: userData.user_info.passport.name, lastName: userData.user_info.passport.sur_name, roles: ['opop-developer'] });
    }
    return user;
  }

  delete(_id) {
    return this.userModel.findOneAndUpdate(
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
