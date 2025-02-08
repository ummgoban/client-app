import {
  login as kakaoLogin,
  logout as kakaoLogout,
  KakaoOAuthToken,
} from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import {Alert, NativeModules, Platform} from 'react-native';
import Config from 'react-native-config';

import {NaverLoginInitParams, NaverLoginResponse} from '@/types/Login';
import {SessionType} from '@/types/Session';
import {UserType} from '@/types/UserType';
import {getStorage, setStorage} from '@/utils/storage';
import apiClient from './ApiClient';
import appleAuth from '@invertase/react-native-apple-authentication';
import messaging from '@react-native-firebase/messaging';
import {registerFCMToken} from './Fcm';
// 네이버 로그인 관련 설정
const {RNNaverLogin} = NativeModules;
const initializeNaver = ({
  appName,
  consumerKey,
  consumerSecret,
  disableNaverAppAuthIOS = false,
  serviceUrlSchemeIOS = '',
}: NaverLoginInitParams) => {
  if (Platform.OS === 'ios') {
    if (!serviceUrlSchemeIOS) {
      console.debug('serviceUrlSchemeIOS is missing in iOS initialize.');
      return;
    }
    RNNaverLogin.initialize(
      serviceUrlSchemeIOS,
      consumerKey,
      consumerSecret,
      appName,
      disableNaverAppAuthIOS,
    );
  } else if (Platform.OS === 'android') {
    RNNaverLogin.initialize(consumerKey, consumerSecret, appName);
  }
};

const naverLogin = (): Promise<NaverLoginResponse> => {
  return RNNaverLogin.login();
};

const naverLoginParams = {
  appName: Config.NAVER_APP_NAME,
  consumerKey: Config.NAVER_CONSUMER_KEY,
  consumerSecret: Config.NAVER_CONSUMER_SECRET_KEY,
  serviceUrlSchemeIOS: Config.NAVER_URL_SCHEME,
  disableNaverAppAuthIOS: false,
};

/**
 * @description 네이버 로그인 함수
 * @returns {Promise<SessionType | null>} 성공 시 세션 정보, 실패 시 null
 */
const signInWithNaver = async (): Promise<SessionType | null> => {
  initializeNaver(naverLoginParams);
  try {
    // Oauth 토큰 생성
    const loginResult = await naverLogin();
    if (loginResult.isSuccess && loginResult.successResponse) {
      const {accessToken, refreshToken, expiresAtUnixSecondString} =
        loginResult.successResponse;
      console.debug('Naver Access Token:', accessToken);
      // JWT 토큰
      const response = await apiClient.post<{
        data: {
          accessToken: string;
          refreshToken: string;
        };
      }>('/common/auth/oauth-login', {
        provider: 'NAVER',
        roles: 'ROLE_USER',
        accessToken,
      });

      if (response) {
        console.debug('네이버 로그인 성공:', response);
        const accessTokenExpiresAt = Number(expiresAtUnixSecondString) * 1000;

        return {
          accessToken: accessToken,
          refreshToken: refreshToken,
          accessTokenExpiresAt,
          refreshTokenExpiresAt: accessTokenExpiresAt,
          OAuthProvider: 'NAVER',
          jwt: response.data.accessToken,
        };
      } else {
        console.debug('네이버 로그인 실패');
        return null;
      }
    } else {
      console.debug('네이버 로그인 실패:', loginResult.failureResponse);
      return null;
    }
  } catch (error) {
    console.error('네이버 로그인 에러:', error);
    return null;
  }
};

/**
 * @description 카카오 로그인 함수
 * @returns {Promise<boolean>} 성공 시 true, 실패 시 false
 */
const signInWithKakao = async (): Promise<SessionType | null> => {
  let token: KakaoOAuthToken | null = null;
  try {
    token = await kakaoLogin();
  } catch (error) {
    Alert.alert('카카오 로그인 에러');
  }

  if (!token) {
    return null;
  }

  try {
    // JWT 토큰
    const response = await apiClient.post<{
      data: {
        accessToken: string;
        refreshToken: string;
      };
    }>('/common/auth/oauth-login', {
      provider: 'KAKAO',
      roles: 'ROLE_USER',
      accessToken: token.accessToken,
    });

    if (response) {
      console.debug('카카오 로그인 성공:', response);
      return {
        //TODO: JWT 토큰으로 대체 필요
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        accessTokenExpiresAt: new Date(token.accessTokenExpiresAt).getTime(),
        refreshTokenExpiresAt: new Date(token.refreshTokenExpiresAt).getTime(),
        OAuthProvider: 'KAKAO',
        jwt: response.data.accessToken,
      };
    } else {
      console.debug('카카오 로그인 실패');
      return null;
    }
  } catch (error) {
    console.error('카카오 로그인 에러:', error);
    Alert.alert(
      '카카오 로그인 에러',
      '카카오 로그인에 실패했습니다.\n오류가 계속될 경우 관리자에게 문의해주세요.',
    );
    return null;
  }
};

/**
 * @description 애플 로그인 함수
 * @returns {Promise<boolean>} 성공 시 true, 실패 시 false
 */
const signInWithApple = async (): Promise<SessionType | null> => {
  try {
    // Apple 로그인 요청 수행
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    // 애플에서 반환한 jwt
    const token = appleAuthRequestResponse.identityToken;

    // 인증 상태 확인
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    if (token && credentialState === appleAuth.State.AUTHORIZED) {
      console.log('Apple User is authenticated');
      const response = await apiClient.post<{
        data: {
          accessToken: string;
          refreshToken: string;
        };
      }>('/common/auth/oauth-login', {
        provider: 'APPLE',
        roles: 'ROLE_USER',
        accessToken: token,
      });
      console.log(response);
      if (response) {
        console.log('애플 로그인 성공:', response);
        return {
          accessToken: token,
          OAuthProvider: 'APPLE',
          jwt: response.data.accessToken,
        };
      } else {
        console.log('애플 로그인 실패');
        return null;
      }
    } else {
      console.log('User is not authenticated');
      return null;
    }
  } catch (error) {
    console.error('Apple Sign-In Error:', error);
    return null;
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
      setStorage('session', res.data);
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
    setStorage('session', res);

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
