import type {PickerErrorCode} from 'react-native-image-crop-picker';

export type ImagePickerErrorCodeType =
  | PickerErrorCode
  | 'E_PATH_NOT_FOUND'
  | 'E_UNKNOWN'
  | 'E_UNEXPECTED';

export enum ImagePickerErrorCode {
  // react-native-image-crop-picker error code
  E_PICKER_CANCELLED = 'E_PICKER_CANCELLED',
  E_NO_IMAGE_DATA_FOUND = 'E_NO_IMAGE_DATA_FOUND',
  E_NO_LIBRARY_PERMISSION = 'E_NO_LIBRARY_PERMISSION',
  E_NO_CAMERA_PERMISSION = 'E_NO_CAMERA_PERMISSION',
  E_ERROR_WHILE_CLEANING_FILES = 'E_ERROR_WHILE_CLEANING_FILES',
  E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR = 'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR',
  E_CROPPER_IMAGE_NOT_FOUND = 'E_CROPPER_IMAGE_NOT_FOUND',
  E_CANNOT_SAVE_IMAGE = 'E_CANNOT_SAVE_IMAGE',
  E_CANNOT_PROCESS_VIDEO = 'E_CANNOT_PROCESS_VIDEO',
  E_ACTIVITY_DOES_NOT_EXIST = 'E_ACTIVITY_DOES_NOT_EXIST',
  E_CALLBACK_ERROR = 'E_CALLBACK_ERROR',
  E_FAILED_TO_SHOW_PICKER = 'E_FAILED_TO_SHOW_PICKER',
  E_FAILED_TO_OPEN_CAMERA = 'E_FAILED_TO_OPEN_CAMERA',
  E_CAMERA_IS_NOT_AVAILABLE = 'E_CAMERA_IS_NOT_AVAILABLE',
  E_CANNOT_LAUNCH_CAMERA = 'E_CANNOT_LAUNCH_CAMERA',

  // custom error code
  E_PATH_NOT_FOUND = 'E_PATH_NOT_FOUND',
  E_UNKNOWN = 'E_UNKNOWN',
  E_UNEXPECTED = 'E_UNEXPECTED',
}

export class ImagePickerError extends Error {
  code: ImagePickerErrorCodeType;

  constructor(message: string, code: ImagePickerErrorCodeType) {
    super(message);
    this.name = 'ImagePickerError';
    this.code = code;
  }

  private static hasCode(error: Error): error is Error & {code: string} {
    return Object.hasOwn(error, 'code');
  }

  public static throwError(error: unknown): never {
    if (error instanceof ImagePickerError) {
      throw error;
    }
    if (error instanceof Error) {
      if (
        this.hasCode(error) &&
        error.code === ImagePickerErrorCode.E_PICKER_CANCELLED
      ) {
        throw new ImagePickerError(
          error.message,
          ImagePickerErrorCode.E_PICKER_CANCELLED,
        );
      }
      throw new ImagePickerError(error.message, ImagePickerErrorCode.E_UNKNOWN);
    }
    throw new ImagePickerError(
      error as string,
      ImagePickerErrorCode.E_UNEXPECTED,
    );
  }
}
