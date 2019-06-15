import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService, private authService: AuthService){}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  testAuth() {
    return {auth: 'works'}
  }

  @Post('login')
  async login(@Body() userDTO: any) {
    const user = await this.userService.findByLogin(userDTO)
    const payload = {
      username: user.username,
    }
    const token = await this.authService.signPayload(payload)
    return { token }
  }

  @Post('register')
  async registerUser(@Body() userDTO: RegisterDTO) {
    const user = await this.userService.create(userDTO)
    const payload = {
      username: user.username,
    }
    const token = await this.authService.signPayload(payload)
    return { token }
  }
}
