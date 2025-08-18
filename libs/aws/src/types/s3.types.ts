import {
  PutObjectCommandInput,
  GetObjectCommandInput,
  DeleteObjectCommandInput,
  ListObjectsV2CommandInput,
  DeleteObjectsCommandInput,
  HeadObjectCommandInput,
  CopyObjectCommandInput,
} from '@aws-sdk/client-s3';

export type PutObjectOptions = Omit<PutObjectCommandInput, 'Bucket' | 'Key' | 'Body'>;
export type GetObjectOptions = Omit<GetObjectCommandInput, 'Bucket' | 'Key'>;
export type HeadObjectOptions = Omit<HeadObjectCommandInput, 'Bucket' | 'Key'>;
export type CopyObjectOptions = Omit<
  CopyObjectCommandInput,
  'Bucket' | 'Key' | 'CopySource'
>;
export type ListObjectsOptions = Omit<ListObjectsV2CommandInput, 'Bucket'>;
export type DeleteObjectOptions = Omit<DeleteObjectCommandInput, 'Bucket' | 'Key'>;
export type DeleteObjectsOptions = Omit<DeleteObjectsCommandInput, 'Bucket' | 'Delete'>;
