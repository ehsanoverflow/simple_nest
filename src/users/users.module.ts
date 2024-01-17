import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {usersProviders} from "./users.provider";
import {DatabaseModule} from "../database.module";
import {avatarProviders} from "./avatar.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...usersProviders, ...avatarProviders
  ],
})
export class UsersModule {}
