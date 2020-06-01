import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { HttpExceptionResponse } from 'src/domain/interface/http-exception-response';

@Catch(HttpException)
export class HttpExceptionHandlerFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const exceptionStatus = exception.getStatus();
    const { message, error } = exception.getResponse() as HttpExceptionResponse;

    response.status(exceptionStatus).json({
      statusCode: exceptionStatus,
      timestamp: new Date(),
      path: request.url,
      message,
      error,
    });
  }
}
