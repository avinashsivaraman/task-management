import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService){}

  async signPayload(payload: any) {
    console.log('Getting the token')
    return await sign(payload, 'secretKey', {expiresIn: '12h'})
  }
  async validateUser(payload: any) {
    return await this.usersService.findByPayload(payload);
  }

}
