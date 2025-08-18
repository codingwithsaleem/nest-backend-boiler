import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  /**
   * Health Check
   * @returns success status
   */
  @Get()
  @ApiExcludeEndpoint()
  healthCheck(): { success: boolean } {
    return { success: true };
  }

  /**
   * Returns a greeting message
   * @returns A promise that resolves to a greeting string
   */
  @Get('hello')
  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
