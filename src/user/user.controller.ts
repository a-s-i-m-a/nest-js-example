import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SetRoleDto } from './dto/set-role.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  list() {
    return this.userService.list();
  }

  @Get('/:id')
  show(@Param('id') id: string) {
    return this.userService.getById(id);
  }
  @Put('/:id')
  setRole(@Param('id') id: string, @Body() payload: SetRoleDto) {
    return this.userService.setUserRole(id, payload.roles);
  }

  @Get('/token/:token')
  getByToken(@Param('token') token: string) {
    return this.userService.getByToken(token);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
