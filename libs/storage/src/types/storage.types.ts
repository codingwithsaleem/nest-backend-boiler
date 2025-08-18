// Enum of all accepted image mime types that can be compressed by sharp
export enum CompressibleImageMime {
  GIF = 'image/gif',
  JPEG = 'image/jpeg',
  PNG = 'image/png',
}

// Enum of all accepted image mime types
export enum ImageMime {
  GIF = 'image/gif',
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  WEBP = 'image/webp',
}

export interface ImageFormatOutput {
  medium: Buffer;
  small: Buffer;
}

export interface MulterFile<T extends string = string> extends Express.Multer.File {
  ext: string;
  mimetype: T;
}

export type MulterImage = MulterFile<ImageMime>;

export type DownloadedFile = Pick<MulterFile, 'buffer' | 'mimetype'> & {
  originalname?: string;
  size?: number;
  sourceUrl?: string;
  ext?: string;
};

export type DownloadedImage = Pick<MulterFile<ImageMime>, 'buffer' | 'mimetype'> & {
  originalname?: string;
  size?: number;
  sourceUrl?: string;
  ext?: string;
};

export interface UploadedFile {
  /**
   * AWS S3 bucket key.
   */
  key: string;

  /**
   * File content type (Mime).
   */
  contentType: string;

  /**
   * File size.
   */
  size?: number;

  /**
   * Original file name.
   */
  originalname?: string; // must be similar to Multer.File originalname property

  /**
   * Url from which the file was downloaded
   */
  sourceUrl?: string;
}
