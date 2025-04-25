import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import AppError from './AppError';
import { ResponseFormat } from './ResponseFormat';
import AppValidationError from './AppValidationError';
import { ResponseCodes } from './ResponseCodes';
import { ErrorCode } from 'src/shared/utils/error-code';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.error('APPLICATION ERROR: ', exception);

    if (exception instanceof AppError) {
      ResponseFormat.handleAppErrorResponse(
        response,
        exception.responseCode,
        exception.httpStatus(),
        exception.message,
      );
    } else if (exception instanceof AppValidationError) {
      ResponseFormat.sendResponse(
        response,
        ResponseCodes[ErrorCode['0002']],
        undefined,
        exception.message,
        HttpStatus.BAD_REQUEST,
      );
      // } else if (exception instanceof AxiosError) {
      //   ResponseFormat.handleAppErrorResponse(
      //     response,
      //     ErrorCode['0006'],
      //     HttpStatus.BAD_REQUEST,
      //     'External API request failed',
      //   );
    } else if (
      exception instanceof Error &&
      (exception.name === 'JsonWebTokenError' ||
        exception.name === 'TokenExpiredError')
    ) {
      ResponseFormat.handleAppErrorResponse(
        response,
        ErrorCode['0005'],
        HttpStatus.UNAUTHORIZED,
        'Invalid or expired token',
      );
    } else if (exception instanceof Error && exception.name === 'CastError') {
      ResponseFormat.handleAppErrorResponse(
        response,
        ErrorCode['0002'],
        HttpStatus.BAD_REQUEST,
        'Invalid data format',
      );
    } else if (
      exception instanceof Error &&
      exception.message === 'ENOTFOUND'
    ) {
      ResponseFormat.handleAppErrorResponse(
        response,
        ErrorCode['0002'],
        HttpStatus.BAD_REQUEST,
        'Network error: Host not found',
      );
    } else {
      // Handle all other unknown errors
      ResponseFormat.handleAppErrorResponse(
        response,
        ErrorCode['0006'],
        HttpStatus.FORBIDDEN,
        'An unexpected error occurred',
      );
    }
  }
}
