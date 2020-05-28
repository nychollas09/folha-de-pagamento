import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from 'src/environments/environment';

const databaseProviders: TypeOrmModuleOptions = {
  ...typeOrmModuleOptions,
  synchronize: false,
  logging: true,
  entities: [__dirname + '/../domain/model/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../domain/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/domain/migrations',
  },
};

export = databaseProviders;
