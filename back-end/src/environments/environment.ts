import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  database: 'folha_de_pagamento',
  username: 'root',
  password: '1234',
  url: 'mysql://root:1234@localhost:3306/folha_de_pagamento',
  charset: 'utf8',
};
