import { STORAGE_MAX_FILE_SIZE } from '@app/storage/constants/storage.constants';
import {
  FileNotFoundException,
  FileTooLargeException,
  InvalidFileException,
} from '@app/storage/exceptions/storage.exceptions';
import { ImageMime, MulterImage } from '@app/storage/types/storage.types';
import { Injectable, PipeTransform } from '@nestjs/common';
import { isEnum } from 'class-validator';
import { fromBuffer } from 'file-type';

@Injectable()
export class ImagePipe implements PipeTransform {
  /**
   *
   * @param file
   */
  async transform(file: Express.Multer.File): Promise<MulterImage> {
    if (!file) {
      throw new FileNotFoundException('Image not received');
    }
    if (file.size > STORAGE_MAX_FILE_SIZE) {
      throw new FileTooLargeException(
        `Image received is too large. Max size: ${STORAGE_MAX_FILE_SIZE} bytes`,
      );
    }
    const fileType = await fromBuffer(file.buffer);
    if (!isEnum(fileType?.mime, ImageMime)) {
      throw new InvalidFileException('Received file is not an image');
    }
    return { ...file, mimetype: fileType.mime as ImageMime, ext: fileType.ext };
  }
}
