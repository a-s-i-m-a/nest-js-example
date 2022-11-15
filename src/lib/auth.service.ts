import * as net from 'net';
import { Logger } from '@nestjs/common';

const logger = new Logger('AuthService');

export const methods = {
  methodValidate: 'validate',
  methodGetUserData: 'т',
};

export interface Response {
  status?: boolean;
  need_fields?: boolean;
  errors?: Array<any>;
  values?: Array<any>;
  tm_req?: string;
}

export const authRequest = {
  request: (host, port, cfg): Promise<Response> => {
    try {
      return new Promise((resolve, reject) => {
        const client = net.createConnection({ port, host }, function () {
          logger.log(
            `Connection remote address: ${client.remoteAddress}:${client.remotePort}`,
          );
        });
        client.on('data', function (data) {
          try {
            const res = JSON.parse(data.toString());
            resolve(res);
          } catch (e) {
            logger.error(e);
            resolve({});
          }
        });
        client.on('end', function () {
          logger.log('Client socket disconnect.');
        });
        client.on('error', function (err) {
          reject(err);
        });

        client.write(`${JSON.stringify(cfg)}\n`);
      });
    } catch (err) {
      logger.error(err);
      throw new Error(err);
    }
  },
};
