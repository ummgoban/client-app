import {useReducer} from 'react';
import {Alert} from 'react-native';

import * as imagePickerLib from '../lib/image-picker';
import {
  ImagePickerError,
  ImagePickerErrorCode,
} from '../lib/image-picker.error';

import {imagePickerReducer} from './use-image-picker.reducer';

export const useImagePicker = () => {
  const [state, dispatch] = useReducer(imagePickerReducer, {
    latestPath: null,
    loading: false,
    error: null,
  });

  async function handleImageAction(
    action: () => Promise<string>,
  ): Promise<string | null> {
    try {
      dispatch({type: 'SET_LOADING', payload: {loading: true}});
      const imagePath = await action();
      dispatch({
        type: 'SET_IMAGE_PATH',
        payload: {path: imagePath, loading: false, error: null},
      });
      return imagePath;
    } catch (error) {
      if (
        error instanceof ImagePickerError &&
        error.code === ImagePickerErrorCode.E_PICKER_CANCELLED
      ) {
        // 사용자가 이미지 피커를 취소했을 경우 에러를 던지지 않는다.
        dispatch({type: 'DONE', payload: {}});
        console.info('사용자가 이미지 피커를 취소했습니다.');
        return null;
      }

      dispatch({
        type: 'DONE_WITH_ERROR',
        payload: {
          error:
            error instanceof ImagePickerError
              ? error
              : new ImagePickerError(
                  error as string,
                  ImagePickerErrorCode.E_UNKNOWN,
                ),
        },
      });

      console.error(error);
      Alert.alert('이미지 업로드에 실패했습니다.');
    }
    return null;
  }

  /**
   *
   * @returns 선택된 이미지의 경로. null이면 사용자가 이미지 피커를 취소
   */
  async function pickImage(): Promise<string | null> {
    return handleImageAction(imagePickerLib.pickImage);
  }

  /**
   *
   * @returns 선택된 이미지의 경로. null이면 사용자가 이미지 피커를 취소
   */
  async function takePhoto(): Promise<string | null> {
    return handleImageAction(imagePickerLib.takePhoto);
  }

  return {
    latestPath: state.latestPath,
    loading: state.loading,
    error: state.error,
    pickImage,
    takePhoto,
  };
};
