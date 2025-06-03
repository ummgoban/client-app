import ImageCropPicker, {
  Image as CropImage,
} from 'react-native-image-crop-picker';

export async function pickImage(): Promise<string> {
  try {
    const image: CropImage = await ImageCropPicker.openPicker({
      mediaType: 'photo',
      cropping: true,
      // 사진 사이즈, 필요 시 조정 가능
      width: 512,
      height: 512,
      cropperToolbarTitle: '사진 자르기',
      // 비율 변경 못하게 고정
      freeStyleCropEnabled: false,
      cropperCircleOverlay: false,
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
      forceJpg: true,
      // 사진 사이즈, 필요 시 조정 가능
      width: 512,
      height: 512,
      // 비율 변경 못하게 고정
      freeStyleCropEnabled: false,
      cropperCircleOverlay: false,
      cropperChooseText: '확인',
      cropperCancelText: '취소',
    });

    return image.path ?? '';
  } catch (error: any) {
    console.error('카메라 실행 실패', error?.message);
    return '';
  }
}
