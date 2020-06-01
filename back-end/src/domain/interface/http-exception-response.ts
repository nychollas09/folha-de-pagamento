import { HttpStatus } from '@nestjs/common';

export interface HttpExceptionResponse {
  message: string | string[];
  error: string;
  statusCode: HttpStatus;
}
