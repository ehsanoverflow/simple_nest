import {Inject, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from "../interfaces/user.interface";
import {Model} from "mongoose";
import {Avatar} from "../interfaces/avatar.interface";
import {CreateAvatarDto} from "./dto/create-avatar.dto";
var ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class UsersService {

  constructor(
      @Inject('USER_MODEL')
      private userModel: Model<User>,
      @Inject('AVATAR_MODEL')
      private avatarModel: Model<Avatar>,

  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    let failValidation = createdUser.validateSync();
    if(failValidation) {
      throw Object.values(failValidation.errors).map((errorVal) => errorVal.toString());
    }
    return createdUser.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string) : Promise<User> {
    if(!ObjectId.isValid(id))
      throw ['invalid objectId'];
    return this.userModel.findById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async saveAvatar(createAvatarDto: CreateAvatarDto) {
    const createdAvatar = new this.avatarModel(createAvatarDto)
    let failValidation = createdAvatar.validateSync();
    if(failValidation) {
      throw Object.values(failValidation.errors).map((errorVal) => errorVal.toString());
    }
    createdAvatar.save();
    // return createdAvatar;
    let user = await this.findOne(createdAvatar.user_id)
    user.avatar = createdAvatar.id;
    user.save();
    // return createdAvatar;
  }
}
