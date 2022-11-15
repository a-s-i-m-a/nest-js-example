import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UserService } from '../user/user.service';
import { UpdateListDto } from './dto/update-list.dto';
import { AuthGuard } from '../token/auth.guard';

@Controller('list')
export class ListController {
  constructor(
    private listService: ListService,
    private userService: UserService,
  ) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() dto: CreateListDto, @Request() req) {
    return this.listService.create(dto, req.user);
  }

  @Get()
  async list(@Query('user_id') userId: string) {
    return this.listService.list(userId);
  }

  @Get('/:id')
  async show(@Param('id') id: string) {
    return this.listService.getById(id);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateListDto,
    @Request() req,
  ) {
    return this.listService.updateById(id, dto, { user: req.user });
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async delete(
    @Param('id') id: string,
  ) {
    return this.listService.remove(id);
  }
}
