import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt'; 

import { User } from 'src/types/user';
import { RegisterDTO, LoginDTO } from '../auth/auth.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  private sanitizeUser(user: User) {
    return user.depopulate('password');
  }

  async create(userDTO: RegisterDTO) {
    const { username } = userDTO;
    const user = await this.userModel.findOne({ username });

    if (user) {
      throw new HttpException(
        'User already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const createUser = new this.userModel(userDTO);
    await createUser.save();
    return this.sanitizeUser(createUser);
  }

  async findByLogin(userDTO: LoginDTO) {
    const { username, password } = userDTO;
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    if(await bcrypt.compare(password, user.password)){
      return this.sanitizeUser(user);
    }else {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async findByPayload(payload: any){
    const { username } = payload;
    return await this.userModel.findOne({ username });
  }
}
