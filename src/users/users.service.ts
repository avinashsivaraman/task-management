import { Model } from 'mongoose';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/users.interface';
import { UserSchema } from './schemas/users.schema';
import { RegisterDTO, LoginDTO } from 'src/auth/auth.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async findAll () {
    return await this.userModel.find().exec()
  }

  async create(userDTO: RegisterDTO) {
    const { username }  = userDTO
    console.log(username, userDTO.password)
    const user = await this.userModel.findOne({username})
    if(user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
    }
    const createdUser = new this.userModel(userDTO)
    return createdUser.save()

  }

  async findByLogin(userDTO: LoginDTO) {
    const { username, password } = userDTO
    const user = await this.userModel.findOne({username})
    if(!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED)
    }
    console.log(user)
    if(await bcrypt.compare(password, user.password)) {
      return user
    } else {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED)
    }
  }

  async findByPayload(payload) {
    const { username } = payload
    return await this.userModel.findOne({ username })

  }
}