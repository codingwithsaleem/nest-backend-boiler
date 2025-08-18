import {
  TIME_30_SECONDS_MLS,
  TIME_1_SECOND_MLS,
} from '@app/shared/constants/time.constants';
import { RetryConfig } from 'gaxios';

export const GAXIOS_RETRY_CONFIG: RetryConfig = {
  retry: 6,
  retryDelay: TIME_30_SECONDS_MLS,
  statusCodesToRetry: [[500, 599]],
};

export const GAXIOS_FAST_RETRY_CONFIG: RetryConfig = {
  retry: 6,
  retryDelay: TIME_1_SECOND_MLS,
  statusCodesToRetry: [[500, 599]],
};
