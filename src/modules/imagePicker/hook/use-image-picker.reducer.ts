import {ImagePickerError} from '../lib/image-picker.error';

type ImagePickerState = {
  latestPath: string | null;
  loading?: boolean;
  error?: ImagePickerError | null;
};

type ImagePickerActionPayload = {
  path: string | null;
  loading?: boolean;
  error?: ImagePickerError | null;
};

type ImagePickerActionType =
  | 'SET_IMAGE_PATH'
  | 'SET_LOADING'
  | 'DONE_WITH_ERROR'
  | 'DONE';

type ImagePickerAction = {
  type: ImagePickerActionType;
  payload: Partial<ImagePickerActionPayload>;
};

export const imagePickerReducer = (
  state: ImagePickerState,
  action: ImagePickerAction,
): ImagePickerState => {
  switch (action.type) {
    case 'SET_IMAGE_PATH':
      return {
        ...state,
        latestPath: action.payload.path ?? null,
        loading: action.payload.loading,
        error: action.payload.error,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload.loading ?? false,
      };
    case 'DONE':
      return {
        ...state,
        loading: false,
        error: null,
      };
    case 'DONE_WITH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload.error ?? null,
      };
    default:
      return state;
  }
};
