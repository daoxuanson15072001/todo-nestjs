import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import config from 'src/config';

@Injectable()
export default class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}
  public genarateAccessToken(payload : any) {
    return this.jwtService.sign(payload, {
      secret: config.AUTH.JWT_SECRET_KEY,
      expiresIn: config.AUTH.JWT_SECRET_KEY_EXPIRESIN,
    });
  }

  public genarateRefreshToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: config.AUTH.JWT_REFRESH_TOKEN_KEY,
      expiresIn: config.AUTH.JWT_REFRESH_TOKEN_KEY_EXPIRESIN,
    });
  }

  public verifyAccessToken(accessToken : string){
    try {
        const payload = this.jwtService.verify(accessToken , {secret : config.AUTH.JWT_SECRET_KEY});
        if(!payload) return false;
        return payload;
    } catch (error) {
        return false;
    }
  }

  public verifyRefreshToken(refreshToken : string){
    try {
        const payload = this.jwtService.verify(refreshToken , {secret : config.AUTH.JWT_REFRESH_TOKEN_KEY});
        if(!payload) return false;
        return payload;
    } catch (error) {
        return false;
    }
  }
}