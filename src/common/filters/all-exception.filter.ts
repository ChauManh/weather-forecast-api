import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse } from '../dto/api-response.dto';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const request = ctx.getRequest<Request>();
    console.error(`[${request.method}] ${request.url}`);

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      } else if (typeof res === 'object' && (res as any).message) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        message = (res as any).message;
      }
    }

    console.error('Exception caught by AllExceptionsFilter:');
    console.error({
      status,
      message,
      error: exception instanceof Error ? exception.stack : exception,
    });

    response.status(status).json(new ApiResponse<null>(status, message, null));
  }
}
