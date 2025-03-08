import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

export async function pickImage(
  options: ImageLibraryOptions = {mediaType: 'photo'},
): Promise<string> {
  const imagePickerResUri = await launchImageLibrary(options, res => {
    if (res.didCancel || !res.assets) {
      return;
    }

    if (res.errorCode) {
      console.log(res.errorMessage);
      return;
    }

    return res;
  });

  if (!imagePickerResUri || !imagePickerResUri.assets) {
    return '';
  }

  return imagePickerResUri.assets[0].uri ?? '';
}
