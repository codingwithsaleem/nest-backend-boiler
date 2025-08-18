import { ValidationException } from '@app/shared';
import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { ValidationError } from 'class-validator';

export class WsValidationPipe extends ValidationPipe {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(options?: Omit<ValidationPipeOptions, 'exceptionFactory'>) {
    super({
      ...options,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map(
          error => `${Object.values(error.constraints).join(', ')}`,
        );
        return new WsException(new ValidationException('Validation failed', messages));
      },
    });
  }
}
