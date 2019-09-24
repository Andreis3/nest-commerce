import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  controllers: [AuthController],
  imports: [SharedModule]
})
export class AuthModule {}
