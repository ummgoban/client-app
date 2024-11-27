import {UserType} from '../types/UserType';
import {getProfile as getKakaoProfile} from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';

export const getUserProfile = async (): Promise<UserType | null> => {
  try {
    const kakaoRes = await getKakaoProfile();
    const naverRes = await NaverLogin.getProfile('').then(res => res.response);

    if (!kakaoRes || !naverRes) {
      return null;
    }

    let userProfile: UserType | null = null;

    if (kakaoRes) {
      userProfile = {
        id: kakaoRes.id,
        name: kakaoRes.nickname,
        image: kakaoRes.profileImageUrl,
        provider: 'KAKAO',
      };
    } else if (naverRes) {
      userProfile = {
        id: naverRes.id.toString(),
        name: naverRes.name,
        image: naverRes.profile_image ?? '',
        provider: 'NAVER',
      };
    }

    return userProfile;
  } catch (e) {
    console.error(e);
    return null;
  }
};
