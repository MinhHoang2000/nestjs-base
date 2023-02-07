import { ConfigObject } from '@nestjs/config';

interface AppConfig extends ConfigObject {
  PORT: number;
  PINO_HTTP_CONFIG: any;
}

const PINO_HTTP_CONFIG_DEV = {
  transport: {
    target: 'pino-pretty',
    options: {
      ignore: 'req.headers,res.headers',
      colorize: true,
      levelFirst: true,
      levelKey: 'level',
      timestampKey: 'time',
      translateTime: 'SYS:dd-mm-yyyy, HH:MM:ss Z',
    },
  },
};

const PINO_HTTP_CONFIG_PRO = {
  transport: {
    target: 'pino-pretty',
    options: {
      ignore: 'req,res',
      colorize: true,
      levelFirst: true,
      levelKey: 'level',
      timestampKey: 'time',
      translateTime: 'SYS:dd-mm-yyyy, HH:MM:ss Z',
      messageFormat:
        'method: {req.method} - url:{req.url} - remoteAddress: {req.remoteAddress} - remotePort: {req.remotePort} - {res.statusCode} ',
      singleLine: true,
      customColors: 'err:red,info:blue',
    },
  },
};

export const getConfig = (): AppConfig => {
  const config: AppConfig = {
    PORT: parseInt(process.env.PORT, 10) || 3001,
    PINO_HTTP_CONFIG:
      process.env.NODE_ENV === 'development'
        ? PINO_HTTP_CONFIG_DEV
        : PINO_HTTP_CONFIG_PRO,
  };
  return config;
};

export const isProd = (): boolean => {
  return process.env.NODE_ENV === 'production';
};

export const isDev = (): boolean => {
  return process.env.NODE_ENV === 'development';
};
