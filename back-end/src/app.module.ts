import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllerModule } from './controller/controller.module';
import { ServiceModule } from './service/service.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseProviders from './config/orm.config';

@Module({
  imports: [
    ControllerModule,
    ServiceModule,
    TypeOrmModule.forRoot(databaseProviders),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
