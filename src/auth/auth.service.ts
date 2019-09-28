import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { UserService } from '../shared/user.service';
import { Payload } from '../types/payload';
import authConfig from '../config/auth';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async signPayload(payload: Payload) {
    return sign(payload, authConfig.secret, {
      expiresIn: authConfig.expiresIn
    });
  }

  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }
}
