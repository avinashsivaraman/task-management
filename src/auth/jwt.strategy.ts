import { Injectable, HttpException, HttpCode, HttpStatus } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt, VerifiedCallback } from "passport-jwt";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(private authService: AuthService){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey'
    })
  }

  async validate(payload: any, done: VerifiedCallback) {
    const user = await this.authService.validateUser(payload)
    if(!user) {
      done(new HttpException('Not authorized -- Please login', HttpStatus.UNAUTHORIZED), user, payload)
    }
    return done(null, user, payload)
  }
}