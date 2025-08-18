import { EnvironmentValidator } from '@api/environment/src/validation/environment.validator';
import { LoggerService } from '@app/logger';
import { Injectable } from '@nestjs/common';
import {
  CorsOptions,
  CorsOptionsDelegate,
} from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentService {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(
    private readonly configService: ConfigService<EnvironmentValidator, true>,
    public readonly logger: LoggerService,
  ) {}

  /**
   * Application port getter
   * @returns Application port
   */
  public get port(): number {
    return this.configService.get('PORT', { infer: true });
  }

  /**
   * Application name getter
   * @returns Application name
   */
  public get name(): string {
    return this.configService.get('API_NAME', { infer: true });
  }

  /**
   * Get CORS configuration
   * @returns CORS configuration
   */
  public getCorsConfig(): CorsOptions | CorsOptionsDelegate<any> {
    return {
      origin: [
        this.configService.get('FRONTEND_URL', { infer: true }),
        'https://www.staging.greeka.com',
      ],
      credentials: true,
    };

    //my changes
    // return {
    //   origin: '*',
    //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    //   credentials: true,
    // };
    //my changes
  }

  /**
   * Get frontend url
   * @returns Frontend url
   */
  public get frontUrl() {
    return this.configService.get('FRONTEND_URL', {
      infer: true,
    });
  }
}
