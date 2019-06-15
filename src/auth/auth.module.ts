import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  // providers: [AuthService]
})
export class AuthModule {}
