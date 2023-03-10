import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '../../common/base/base.service';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
}
