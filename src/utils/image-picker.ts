import ImageCropPicker, {
  Image as CropImage,
} from 'react-native-image-crop-picker';

export async function pickImage(): Promise<string> {
  try {
    const image: CropImage = await ImageCropPicker.openPicker({
      mediaType: 'photo',
      cropping: true,
      cropperAspectRatio: {x: 1, y: 1},
      cropperToolbarTitle: '사진 자르기',
      cropperChooseText: '확인',
      cropperChooseColor: '#e2e2e2',
      cropperCancelText: '취소',
      cropperCancelColor: '#999999',
    });

    return image.path ?? '';
  } catch (error: any) {
    console.error('이미지 선택 실패:', error?.message);
    return '';
  }
}

export async function takePhoto(cropping: boolean = true): Promise<string> {
  try {
    const image: CropImage = await ImageCropPicker.openCamera({
      mediaType: 'photo',
      cropping,
      compressImageQuality: 0.8,
      cropperToolbarTitle: '사진 자르기',
      cropperAspectRatio: {x: 1, y: 1},
      cropperChooseText: '확인',
      cropperCancelText: '취소',
    });

    return image.path ?? '';
  } catch (error: any) {
    console.error('카메라 실행 실패', error?.message);
    return '';
  }
}
