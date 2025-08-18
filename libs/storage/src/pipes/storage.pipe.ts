import { STORAGE_MAX_FILE_SIZE } from '@app/storage/constants/storage.constants';
import {
  FileNotFoundException,
  FileTooLargeException,
} from '@app/storage/exceptions/storage.exceptions';
import { MulterFile } from '@app/storage/types/storage.types';
import { Injectable, PipeTransform } from '@nestjs/common';
import { fromBuffer } from 'file-type';

@Injectable()
export class StoragePipe implements PipeTransform {
  /**
   *
   * @param file
   */
  async transform(file: Express.Multer.File): Promise<MulterFile> {
    if (!file) {
      throw new FileNotFoundException('File not received');
    }
    if (file.size > STORAGE_MAX_FILE_SIZE) {
      throw new FileTooLargeException(
        `File received is too large. Max size: ${STORAGE_MAX_FILE_SIZE} bytes`,
      );
    }
    const fileType = await fromBuffer(file.buffer);
    return {
      ...file,
      mimetype: fileType?.mime || file.mimetype,
      ext: fileType.ext,
    };
  }
}
