import {
  STORAGE_FORBIDDEN_FILE_TYPES,
  STORAGE_MAX_FILE_SIZE,
} from '@app/storage/constants/storage.constants';
import {
  FileNotFoundException,
  InvalidFileException,
  FileTooLargeException,
} from '@app/storage/exceptions/storage.exceptions';
import { MulterFile } from '@app/storage/types/storage.types';
import { Injectable, PipeTransform } from '@nestjs/common';
import { fromBuffer } from 'file-type';

@Injectable()
export class MultipartFormFilesPipe implements PipeTransform {
  /**
   *
   * @param file
   */
  public async validateAttachment(file: Express.Multer.File): Promise<MulterFile> {
    if (!file) {
      throw new FileNotFoundException('File not received');
    }
    const fileType = await fromBuffer(file.buffer);
    if (STORAGE_FORBIDDEN_FILE_TYPES.includes(fileType?.ext)) {
      throw new InvalidFileException(fileType?.ext);
    }
    return {
      ...file,
      mimetype: fileType?.mime || file.mimetype,
      ext: fileType.ext,
    };
  }

  /**
   *
   * @param files
   */
  public validateFullSize(files: Express.Multer.File[]): boolean {
    let size = 0;
    files.forEach(file => {
      size += file.size;
    });
    return size <= STORAGE_MAX_FILE_SIZE;
  }

  /**
   *
   * @param files
   */
  async transform(files: Express.Multer.File[]): Promise<MulterFile[]> {
    if (!files || !files.length) return [];
    const promises = files.map(this.validateAttachment);
    const output = await Promise.all(promises);
    if (!this.validateFullSize(files)) {
      throw new FileTooLargeException(
        `Total size of attachments exceeded. Max size: ${STORAGE_MAX_FILE_SIZE} bytes`,
      );
    }
    return output;
  }
}
