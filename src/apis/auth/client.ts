import messaging from '@react-native-firebase/messaging';
import {logout as kakaoLogout} from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';

import {SessionType} from '@/types/Session';
import {UserType} from '@/types/UserType';
import {getStorage, setStorage} from '@/utils/storage';

import apiClient from '../ApiClient';
import {registerFCMToken} from '../Fcm';
import {signInWithApple, signInWithKakao, signInWithNaver} from './oauthHelper';

/**
 * POST /common/members/sign-up
 * body: { email, password, name, phoneNumber }
 */
export const credentialSignUp = async ({
  email,
  password,
  name,
  phoneNumber,
}: {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}) => {
  try {
    const res = await apiClient.post<{
      code: number;
      message: string;
    }>('/common/members/sign-up', {
      email,
      password,
      name,
      phoneNumber,
    });

    return res && res.code === 200;
  } catch (error) {
    console.error('Credential Sign Up Error:', error);
    return false;
  }
};

/**
 * POST /auth/login
 * body: { email, password }
 * TODO: error handling
 * @see https://ummgoban.com/v1/swagger-ui/index.html#/%EC%9D%B8%EC%A6%9D/login
 */
export const credentialLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const res = await apiClient.post<{
      code: number;
      data: object;
    }>('/common/auth/login', {
      email,
      password,
    });

    if (res && res.code === 200) {
      await setStorage('session', res.data);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Credential Login Error:', error);
    return false;
  }
};

/**
 * @description 로그인 함수
 * @param {SessionType['OAuthProvider']} OAuthProvider
 * @returns {Promise<boolean>} 성공 시 true, 실패 시 false
 */
// TODO: 로그인 후 리프레쉬
export const loginWithOAuth = async (
  oAuthProvider: SessionType['OAuthProvider'],
): Promise<boolean> => {
  let res: SessionType | null = null;
  if (oAuthProvider === 'KAKAO') {
    res = await signInWithKakao();
  } else if (oAuthProvider === 'NAVER') {
    res = await signInWithNaver();
  } else if (oAuthProvider === 'APPLE') {
    res = await signInWithApple();
  } else {
    throw new Error(`Unsupported OAuthProvider: ${oAuthProvider}`);
  }

  if (res) {
    await setStorage('session', res);

    try {
      console.log('test FCM after login');
      const token = await messaging().getToken();
      await registerFCMToken(token);
    } catch (error) {
      console.error('FCM 설정 중 오류 발생:', error);
    }
    return true;
  }

  return false;
};

// TODO: 로그아웃 후 리프레쉬
export const logout = async (): Promise<boolean> => {
  // TODO: credentail logout 추가
  try {
    const storageRes: SessionType | null = await getStorage('session');
    if (!storageRes) {
      return false;
    }

    if (storageRes.OAuthProvider === 'KAKAO') {
      await kakaoLogout();
    } else if (storageRes.OAuthProvider === 'NAVER') {
      await NaverLogin.logout();
    }

    await setStorage('session', {});

    return true;
  } catch (error) {
    console.error('로그아웃 에러:', error);
    return false;
  }
};

export const getProfile = async (): Promise<UserType | null> => {
  try {
    const res = await apiClient.get<UserType | null>(
      '/common/members/profiles',
    );

    if (res) {
      return {
        id: res.id,
        name: res.name || '고객',
        provider: res.provider,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error fetching profile: ${error}`);
    return null;
  }
};
