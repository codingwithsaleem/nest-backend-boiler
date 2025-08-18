import { AwsService } from '@app/aws/aws.service';
import {
  CopyObjectOptions,
  DeleteObjectOptions,
  DeleteObjectsOptions,
  GetObjectOptions,
  HeadObjectOptions,
  ListObjectsOptions,
  PutObjectOptions,
} from '@app/aws/types/s3.types';
import {
  CopyObjectCommandOutput,
  DeleteObjectCommandOutput,
  DeleteObjectsCommandOutput,
  GetObjectCommandOutput,
  HeadObjectCommandOutput,
  ListObjectsV2Output,
  PutObjectCommandOutput,
  S3,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

/** AWS S3 CRUD */
@Injectable()
export class S3Service {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(private readonly awsService: AwsService) {}

  /*********************************** LIBRARY ******************************************/
  /**
   * Create a new S3 object.
   * https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/putobjectcommand.html
   * @param key Name of the new object.
   * @param buffer Content of the new object.
   * @param options Other options.
   * @returns https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/putobjectcommandoutput.html
   */
  public async putObject(
    key: string,
    buffer: Buffer,
    options?: PutObjectOptions,
  ): Promise<PutObjectCommandOutput> {
    return await this.client.putObject({
      Bucket: this.bucket,
      Key: key,
      Body: buffer,
      ...options,
    });
  }

  /**
   * Get an existing S3 object.
   * https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/getobjectcommand.html
   * @param key Name of the object.
   * @param options Other options.
   * @returns https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/getobjectcommandoutput.html
   */
  public async getObject(
    key: string,
    options?: GetObjectOptions,
  ): Promise<GetObjectCommandOutput> {
    return await this.client.getObject({
      Bucket: this.bucket,
      Key: key,
      ...options,
    });
  }

  /**
   * Head an existing S3 object.
   * https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/headobjectcommand.html
   * @param key Name of the object.
   * @param options Other options.
   * @returns https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/headobjectcommandoutput.html
   */
  public async headObject(
    key: string,
    options?: HeadObjectOptions,
  ): Promise<HeadObjectCommandOutput> {
    return await this.client.headObject({
      Bucket: this.bucket,
      Key: key,
      ...options,
    });
  }

  /**
   * Delete an existing S3 object
   * https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/deleteobjectcommand.html
   * @param key Name of the object to delete.
   * @param options Other options.
   * @returns https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/deleteobjectcommandoutput.html
   */
  public async deleteObject(
    key: string,
    options?: DeleteObjectOptions,
  ): Promise<DeleteObjectCommandOutput> {
    return await this.client.deleteObject({
      Bucket: this.bucket,
      Key: key,
      ...options,
    });
  }

  /**
   * Creates a copy of an object that is already stored in Amazon S3.
   * https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/copyobjectcommand.html
   * @param to Copy target key.
   * @param from https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/copyobjectcommandinput.html#copysource.
   * @param options Other options.
   * @returns https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/copyobjectcommandoutput.html
   */
  public async copyObject(
    from: string,
    to: string,
    options?: CopyObjectOptions,
  ): Promise<CopyObjectCommandOutput> {
    return await this.client.copyObject({
      Bucket: this.bucket,
      Key: to,
      CopySource: from,
      ...options,
    });
  }

  /**
   * Determines whether an object exists.
   * @param key Name of the object.
   * @returns True if the object exists, false otherwise.
   */
  public async isObject(key: string): Promise<boolean> {
    try {
      await this.headObject(key);
      return true;
    } catch (error) {
      if (error.$metadata.httpStatusCode == 404) {
        return false;
      }
      throw error;
    }
  }

  /**
   * List all objects contained in the bucket
   * https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/listobjectscommand.html
   * @param options options.
   * @returns https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/listobjectsv2output.html
   */
  public async listObjects(options?: ListObjectsOptions): Promise<ListObjectsV2Output> {
    return await this.client.listObjectsV2({
      Bucket: this.bucket,
      ...options,
    });
  }

  /**
   * Delete many Objects
   * https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/deleteobjectscommand.html
   * @param keys The names of the objects to delete.
   * @param options other options.
   * @returns https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/deleteobjectscommandoutput.html
   */
  public async deleteObjects(
    keys: string[],
    options?: DeleteObjectsOptions,
  ): Promise<DeleteObjectsCommandOutput> {
    if (keys.length === 0) {
      return;
    }
    return await this.client.deleteObjects({
      Bucket: this.bucket,
      Delete: { Objects: keys.map(key => ({ Key: key })) },
      ...options,
    });
  }

  /**
   * Deletes an entire folder in the S3 bucket.
   * @param folderName The name of the folder to delete.
   */
  public async deleteFolder(folderName: string): Promise<void> {
    let continuationToken: string | undefined;
    let isTruncated = true;
    while (isTruncated) {
      const listResponse = await this.client.listObjectsV2({
        Bucket: this.bucket,
        Prefix: folderName.endsWith('/') ? folderName : `${folderName}/`,
        ContinuationToken: continuationToken,
      });
      isTruncated = listResponse.IsTruncated;
      continuationToken = listResponse.NextContinuationToken;
      const objectsToDelete = listResponse.Contents?.map(({ Key }) => ({ Key }));
      if (objectsToDelete && objectsToDelete.length > 0) {
        await this.client.deleteObjects({
          Bucket: this.bucket,
          Delete: {
            Objects: objectsToDelete,
            Quiet: true,
          },
        });
      }
    }
  }

  /**
   * Deletes all objects contained in the bucket.
   */
  public async cleanBucket(): Promise<void> {
    let isTruncated = true;
    let continuationToken: string | undefined;
    while (isTruncated) {
      const objects = await this.listObjects({
        ContinuationToken: continuationToken,
      });
      isTruncated = objects.IsTruncated;
      continuationToken = objects.NextContinuationToken;
      if (objects?.Contents) {
        await this.deleteObjects(objects.Contents.map(object => object.Key));
      }
    }
  }

  /*********************************** CLIENTS ******************************************/
  /**
   *
   */
  public get client(): S3 {
    return new S3(this.awsService.client);
  }

  /**
   *
   */
  public get bucket(): string {
    return this.awsService.s3.bucket;
  }
}
