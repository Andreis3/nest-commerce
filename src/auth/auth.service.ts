import { Injectable } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async signPayload(payload: any) {
    return sign(payload, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });
  }

  async validateUser(payload: any) {
    return await this.userService.findByPayload(payload);
  }
}
