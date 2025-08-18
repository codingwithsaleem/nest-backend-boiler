import { S3Service } from '@app/aws';
import { LoggerService } from '@app/logger';
import {
  DOWNLOAD_MAX_BODY_LENGTH,
  DOWNLOAD_TIMEOUT_MS,
  IMAGE_DEFAULT_QUALITY,
  IMAGE_SMALL_WEIGHT,
  SHARP_CPU_EFFORT,
} from '@app/storage/constants/storage.constants';
import {
  FileDeletionException,
  FileDownloadException,
  FileUploadException,
  InvalidFileException,
} from '@app/storage/exceptions/storage.exceptions';
import {
  CompressibleImageMime,
  DownloadedFile,
  DownloadedImage,
  ImageMime,
  MulterFile,
  MulterImage,
  UploadedFile,
} from '@app/storage/types/storage.types';
import {
  DeleteObjectCommandOutput,
  DeleteObjectsCommandOutput,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { isEnum } from 'class-validator';
import { fromBuffer } from 'file-type';
import { request } from 'gaxios';
import sharp from 'sharp';

@Injectable()
export class StorageService {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(
    private readonly s3Service: S3Service,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Upload a file to S3
   * @param key Key to store file
   * @param file File to upload
   * @returns Uploaded file
   */
  public async upload(
    file: MulterFile | DownloadedFile,
    key: string,
  ): Promise<UploadedFile> {
    await this.s3Service
      .putObject(key, file.buffer, {
        ContentType: file.mimetype,
      })
      .catch(error => {
        this.logger.error(`Unable to upload file to S3`, error.stack, error);
        throw new FileUploadException(`Unable to upload file to S3`, error);
      });
    return {
      key,
      contentType: file.mimetype,
      ...file,
    };
  }

  /**
   * Resize, compress and upload an image to S3.
   * @param file File to upload
   * @param rootFolder S3 folder to put uploaded image in
   * @param key
   * @param size
   * @param quality
   * @returns Uploaded image
   */
  public async uploadImage(
    file: MulterImage | DownloadedImage,
    key: string,
    size: number = IMAGE_SMALL_WEIGHT,
    quality: number = IMAGE_DEFAULT_QUALITY,
  ): Promise<UploadedFile> {
    let buffer: Buffer = file.buffer;
    if (file.size && file.size > size * size) {
      buffer = await this._formatImage(file.buffer, file.mimetype, size, quality);
    }
    await this.s3Service
      .putObject(key, buffer, {
        ContentType: file.mimetype,
      })
      .catch(error => {
        this.logger.error(error.message, error.stack, error);
        throw new FileUploadException(`Unable to upload file to S3`, error);
      });
    return { key, contentType: file.mimetype, ...file };
  }

  /**
   * Upload a file from an URL and upload it to S3
   * @param url Source URL
   * @param key Key to store file
   * @returns Uploaded file
   */
  public async uploadFrom(url: string, key: string): Promise<UploadedFile> {
    const file = await this._download(url);
    await this.s3Service
      .putObject(key, file.buffer, {
        ContentType: file.mimetype,
      })
      .catch(error => {
        this.logger.error(error.message, error.stack, error);
        throw new FileUploadException(`Unable to upload file ${url} to S3`, error);
      });
    return { key, contentType: file.mimetype, ...file };
  }

  /**
   * Upload an image from an URL and upload it to S3
   * @param url Source URL
   * @param rootFolder S3 folder to put uploaded images in
   * @param key
   * @returns Uploaded image
   */
  public async uploadImageFrom(url: string, key: string): Promise<UploadedFile> {
    const file = await this._download(url);
    if (!this.isImageMime(file.mimetype)) {
      throw new InvalidFileException('Target file is not an image');
    }
    const image = await this.uploadImage(file as DownloadedImage, key);
    image.sourceUrl = url;
    return image;
  }

  /**
   * Delete a file from S3
   * @param key Key of the file to delete
   */
  public async delete(key: string): Promise<DeleteObjectCommandOutput> {
    return await this.s3Service.deleteObject(key).catch(e => {
      const error = new FileDeletionException('Unable to delete file from S3', e);
      this.logger.error('delete', error.stack, error);
      throw error;
    });
  }

  /**
   * Delete multiple files from S3
   * @param keys Keys of files to delete
   */
  public async deleteMany(keys: string[]): Promise<DeleteObjectsCommandOutput> {
    return await this.s3Service.deleteObjects(keys).catch(e => {
      const error = new FileDeletionException('Unable to delete files from S3', e);
      this.logger.error('deleteMany', error.stack, error);
      throw error;
    });
  }

  /**
   * Determines if the transmitted mime translates an image.
   * @param mime Mime to analyze.
   */
  public isImageMime(mime: string): boolean {
    return isEnum(mime, ImageMime);
  }

  /**
   * Determine if the transmitted mime translates a compressible image.
   * @param mime Mime to analyze.
   */
  public isCompressibleImageMime(mime: string): boolean {
    return isEnum(mime, CompressibleImageMime);
  }

  /**
   * Determine if transmitted mime translate an animated mime.
   * @param mime Mime to analyze.
   */
  public isAnimatedMime(mime: string): boolean {
    return mime === ImageMime.GIF;
  }

  /**
   * Download a file from an URL.
   * @param url Source URL
   * @returns Downloaded file
   */
  private async _download(url: string): Promise<DownloadedFile> {
    try {
      const response = await request<any>({
        method: 'GET',
        url,
        responseType: 'arraybuffer',
        timeout: DOWNLOAD_TIMEOUT_MS,
        maxContentLength: DOWNLOAD_MAX_BODY_LENGTH,
      });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fileType = await fromBuffer(buffer);
      const mimetype = fileType?.mime || response.headers['content-type'];
      return {
        buffer,
        mimetype,
        ext: fileType?.ext,
        size: buffer.length,
        sourceUrl: url,
      };
    } catch (err) {
      const error = new FileDownloadException(`Unable to download file from ${url}`, err);
      this.logger.error('_download', error.stack, error);
      throw error;
    }
  }

  /**
   * Resize an image.
   * @param buffer Buffer to resize
   * @param contentType
   * @param width
   * @returns Resized buffer.
   */
  private async _resizeImage(
    buffer: Buffer,
    contentType: string,
    width: number,
  ): Promise<Buffer> {
    return await sharp(buffer, {
      unlimited: true,
      limitInputPixels: false,
      pages: -1,
      animated: this.isAnimatedMime(contentType),
    })
      .resize({ width })
      .toBuffer();
  }

  /**
   * Compress an image if it is compressible.
   * If it isnt compressible, returns the original buffer.
   * @dev Compressible means not a webp.
   * @param contentType
   * @param quality
   * @param buffer Buffer to compress.
   * @returns Compressed buffer or original buffer if not compressible.
   */
  private async _compressImage(
    buffer: Buffer,
    contentType: string,
    quality: number = IMAGE_DEFAULT_QUALITY,
  ): Promise<Buffer> {
    if (!this.isCompressibleImageMime(contentType)) return buffer;
    sharp.cache(false);
    return await sharp(buffer, {
      unlimited: true,
      limitInputPixels: false,
      pages: -1,
      animated: this.isAnimatedMime(contentType),
    })
      .webp({
        quality,
        effort: SHARP_CPU_EFFORT,
      })
      .toBuffer();
  }

  /**
   * Resize an image and compress it to WebP format.
   * @dev Compression is done after resize to optimize performance and quality.
   * @param contentType
   * @param size
   * @param quality
   * @param buffer Buffer to format.
   * @returns The compressed image.
   * @throws Error if buffer is not an image.
   */
  private async _formatImage(
    buffer: Buffer,
    contentType: string,
    size: number,
    quality: number = IMAGE_DEFAULT_QUALITY,
  ): Promise<Buffer> {
    const resizedBuffer = await this._resizeImage(buffer, contentType, size);
    return await this._compressImage(resizedBuffer, contentType, quality);
  }
}
