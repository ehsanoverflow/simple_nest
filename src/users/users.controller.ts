import {Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {FileInterceptor} from "@nestjs/platform-express";
import {createWriteStream, readFileSync} from 'fs'
var path = require('path')

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('avatar'))
  async create(@UploadedFile() avatar: Express.Multer.File, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.create(createUserDto);
      const ws = createWriteStream('uploads/avatar/' + newUser.id + path.extname(avatar.originalname))
      ws.write(avatar.buffer);
      ws.close();
      const contents = readFileSync('uploads/avatar/' + newUser.id + path.extname(avatar.originalname), {
        encoding: 'base64'
      });
      console.log(avatar);
      return {
        result: true,
        data: newUser
      };
    } catch (errors) {
      return {
        result: false,
        errors: errors
      };
    }

  }

  @Get('')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    try {
      let user = await this.usersService.findOne(id);
      return {
        result: (!!user),
        data: user
      };
    } catch (errors) {
      console.log('catch')
      return {
        result: false,
        errors: errors
      };
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Delete('/:id/avatar')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
