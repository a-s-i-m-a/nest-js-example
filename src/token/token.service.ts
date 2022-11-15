import { Injectable } from '@nestjs/common';
import { authRequest, methods } from 'src/lib/auth.service';
import { configService } from '../config/config.service';

@Injectable()
export class TokenService {
  async validate(token: string) {
    const cfg = {
      method: methods.methodValidate,
      service: configService.getServiceName(),
      data: Date.now(),
      token,
    };
    return this.request(cfg);
  }

  getUserData(token: string) {
    const cfg = {
      method: methods.methodGetUserData,
      service: configService.getServiceName(),
      data: Date.now(),
      token: token,
      key: configService.getAuthKey(),
    };
    return this.request(cfg);
  }

  request(cfg) {
    return authRequest.request(
      configService.getAuthHost(),
      configService.getAuthPort(),
      cfg,
    );
  }
}
