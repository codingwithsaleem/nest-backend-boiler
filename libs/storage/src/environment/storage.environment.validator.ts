import { IsUrl } from 'class-validator';

// This class is used to do validation on the storage environment, same way as DTOs
export class StorageEnvironmentValidator {
  @IsUrl()
  STORAGE_PUBLIC_URL: string;
}
