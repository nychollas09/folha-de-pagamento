import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionHandlerFilter } from './exception-handler/http-exception-handler.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:4200'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionHandlerFilter());

  const options = new DocumentBuilder()
    .setTitle('Folha de pagamento')
    .setDescription(
      'É um projeto que visa automatizar os processos manuais que algumas empresas de pequeno e médio porte realizam.',
    )
    .setVersion('1.0')
    .addTag('Enterprise, Api, REST')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT || 3333);
}
bootstrap();
