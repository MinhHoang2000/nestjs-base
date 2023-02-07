import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { API_TAG } from '../../common/constant';
import { CreateUserDto } from './common/user.common.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';
import { ResponseDto } from '../../common/base/base.response';
import { HttpException } from '@nestjs/common/exceptions';
import { ERROR_CODE } from '../../common/error';
import { CustomHttpException } from '../../common/exception/exception.custom-htpp';

@ApiTags(API_TAG.USER)
@ApiHeader({
  name: 'Authorization',
  description: 'Authorization: Bearer <ACCESS_TOKEN>',
})
@Controller({ path: '/', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    try {
      const user: User = await this.userService.create(userData);
      return ResponseDto.ok<User>({ data: user }, 201);
    } catch (err) {
      CustomHttpException.badRequest({
        code: 1000,
        message: `Can't create user`,
      });
    }
  }

  @Get()
  async getUser() {
    CustomHttpException.notFound({
      code: 1001,
      message: `User doesn't exist`,
    });
  }
}
