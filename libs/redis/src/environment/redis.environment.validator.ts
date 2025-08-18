import { IsNotEmpty, IsNumber } from 'class-validator';

// This class is used to do validation on the redis environment, same way as DTOs
export class RedisEnvironmentValidator {
  @IsNotEmpty()
  REDIS_HOST: string;

  @IsNumber()
  REDIS_PORT: number;
}
