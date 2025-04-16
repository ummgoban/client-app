import messaging from '@react-native-firebase/messaging';
import {logout as kakaoLogout} from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';

import {SessionType} from '@/types/Session';
import {UserType} from '@/types/UserType';
import {getStorage, setStorage} from '@/utils/storage';

import {signInWithApple, signInWithKakao, signInWithNaver} from './oauthHelper';
import {VerifyEmailCodeRequest, SendEmailCodeRequest} from './model';

import apiClient from '../ApiClient';
import CustomError from '../CustomError';

export const refreshAccessToken = async (
  refreshToken: string,
): Promise<SessionType | null> => {
  try {
    const res = await apiClient.post<{
      code: number;
      data: SessionType;
    }>('/auth/refresh', {
      refreshToken,
    });

    if (res && res.code === 200) {
      await setStorage('session', res.data);
      return res.data;
    }

    return null;
  } catch (error) {
    throw new CustomError(error);
  }
};

export const registerFCMToken = async (
  deviceToken: string,
): Promise<boolean> => {
  try {
    console.log('Registering FCM token:', deviceToken);
    const res = await apiClient.post<{code: number; message: string}>(
      '/common/members/device-token',
      {},
      {
        params: {
          deviceToken,
        },
      },
    );
    return !!res && res.code === 200;
  } catch (error) {
    throw new CustomError(error);
  }
};

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
      roles: 'ROLE_USER',
    });

    return !!res && res.code === 200;
  } catch (error) {
    throw new CustomError(error);
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
      roles: 'ROLE_USER',
    });

    if (res && res.code === 200) {
      await setStorage('session', res.data);
      try {
        console.log('test FCM after login');
        const token = await messaging().getToken();
        await registerFCMToken(token);
      } catch (error) {
        throw new CustomError(error);
      }
      return true;
    }
    return false;
  } catch (error) {
    throw new CustomError(error);
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
      throw new CustomError(error);
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
    throw new CustomError(error);
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
        nickname: res.nickname,
        email: res.email,
        phoneNumber: res.phoneNumber,
      };
    } else {
      return null;
    }
  } catch (error) {
    throw new CustomError(error);
  }
};

export const patchNickname = async (nickname: string) => {
  try {
    const res = await apiClient.patch('/common/members/nickname', {
      nickname,
    });
    return !!res;
  } catch (error) {
    throw new CustomError(error);
  }
};

export const sendEmailCode = async ({
  email,
}: SendEmailCodeRequest): Promise<boolean> => {
  try {
    const res = await apiClient.post(
      '/common/auth/send-code',
      {},
      {
        params: {
          email,
          roles: 'ROLE_USER',
        },
      },
    );

    return !!res;
  } catch (error) {
    throw new CustomError(error);
  }
};

export const verifyEmailCode = async ({
  email,
  code,
}: VerifyEmailCodeRequest): Promise<boolean> => {
  try {
    const res = await apiClient.post('/common/auth/verify-code', {
      email,
      code,
    });

    return !!res;
  } catch (error) {
    throw new CustomError(error);
  }
};

export const withdraw = async () => {
  try {
    const res = await apiClient.del('/common/auth/withdraw');
    return !!res;
  } catch (error) {
    throw new CustomError(error);
  }
};
