import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseProviders from './config/orm.config';
import { ControllerModule } from './controller/controller.module';
import { ServiceModule } from './service/service.module';

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
