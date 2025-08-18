import { ValidationException } from '@app/shared/exceptions/shared.exceptions';
import { FileTooLargeException } from '@app/storage';
import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';

/**
 * This middleware parses multipart form data requests before guards.
 */
@Injectable()
export class MultipartMiddleware implements NestMiddleware {
  private readonly _multerExceptions = {
    LIMIT_PART_COUNT: 'Too many parts',
    LIMIT_FILE_SIZE: 'File too large',
    LIMIT_FILE_COUNT: 'Too many files',
    LIMIT_FIELD_KEY: 'Field name too long',
    LIMIT_FIELD_VALUE: 'Field value too long',
    LIMIT_FIELD_COUNT: 'Too many fields',
    LIMIT_UNEXPECTED_FILE: 'Unexpected field',
  };

  /**
   *
   * @param error
   */
  private _transformException(error: Error | undefined) {
    if (!error || error instanceof HttpException) {
      return error;
    }
    switch (error.message) {
      case this._multerExceptions.LIMIT_FILE_SIZE:
        return new FileTooLargeException(error.message);
      case this._multerExceptions.LIMIT_FILE_COUNT:
      case this._multerExceptions.LIMIT_FIELD_KEY:
      case this._multerExceptions.LIMIT_FIELD_VALUE:
      case this._multerExceptions.LIMIT_FIELD_COUNT:
      case this._multerExceptions.LIMIT_UNEXPECTED_FILE:
      case this._multerExceptions.LIMIT_PART_COUNT:
        return new ValidationException(error.message);
    }
    return error;
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  async use(req: Request, res: Response, next: NextFunction) {
    // Read multipart form data request
    // Multer modifies the request object
    await new Promise<void>((resolve, reject) => {
      multer().any()(req, res, (err: any) => {
        if (err) {
          const error = this._transformException(err);
          return reject(error);
        }
        resolve();
      });
    });
    next();
  }
}
