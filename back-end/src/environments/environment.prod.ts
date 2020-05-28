import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const urlSplited: string[] = process.env.JDBC_DATABASE_URL.split(':');
const host = urlSplited[2].replace(/\/\//g, '');
const portAndDataBaseSplited = urlSplited[3].split('/');
const port = Number(portAndDataBaseSplited[0]);
const database = portAndDataBaseSplited[1];

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host,
  port,
  database,
  username: process.env.JDBC_DATABASE_USERNAME,
  password: process.env.JDBC_DATABASE_PASSWORD,
  url: process.env.JAWSDB_URL,
  charset: 'utf8',
};
