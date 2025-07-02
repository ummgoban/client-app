import {
  login as kakaoLogin,
  KakaoOAuthToken,
} from '@react-native-seoul/kakao-login';
import {Alert, NativeModules, Platform} from 'react-native';
import Config from 'react-native-config';

import {NaverLoginInitParams, NaverLoginResponse} from '@/types/Login';
import {SessionType} from '@/types/Session';
import appleAuth from '@invertase/react-native-apple-authentication';
import apiClient from '../ApiClient';
// 네이버 로그인 관련 설정
const {RNNaverLogin} = NativeModules;

const initializeNaver = async ({
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
export const signInWithNaver = async (): Promise<SessionType | null> => {
  await initializeNaver(naverLoginParams);
  try {
    // Oauth 토큰 생성
    const loginResult = await naverLogin();

    if (!(loginResult.isSuccess && loginResult.successResponse)) {
      Alert.alert(
        '네이버 호출부터 실패',
        JSON.stringify(loginResult.failureResponse),
      );
      console.debug('네이버 로그인 실패:', loginResult.failureResponse);
      return null;
    }

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
      oauthRefreshToken: refreshToken,
    });

    if (!response) {
      Alert.alert('백엔드 통신 실패', '서버 응답 없음');
      console.debug('네이버 로그인 실패');
      return null;
    }

    console.debug('네이버 로그인 성공:', response);
    const accessTokenExpiresAt = Number(expiresAtUnixSecondString) * 1000;

    return {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt: accessTokenExpiresAt,
      OAuthProvider: 'NAVER',
    };
  } catch (error) {
    console.error('네이버 로그인 에러:', error);
    Alert.alert(
      '캐치에서 잡힘',
      typeof error === 'string' ? error : JSON.stringify(error),
    );
    return null;
  }
};

/**
 * @description 카카오 로그인 함수
 * @returns {Promise<boolean>} 성공 시 true, 실패 시 false
 */
export const signInWithKakao = async (): Promise<SessionType | null> => {
  let token: KakaoOAuthToken | null = null;
  try {
    token = await kakaoLogin();
  } catch (error) {
    console.error('카카오 로그인 에러:', error);
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
      oauthRefreshToken: token.refreshToken,
    });

    if (!response) {
      console.debug('카카오 로그인 실패');
      return null;
    }

    console.debug('카카오 로그인 성공:', response);

    return {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      accessTokenExpiresAt: new Date(token.accessTokenExpiresAt).getTime(),
      refreshTokenExpiresAt: new Date(token.refreshTokenExpiresAt).getTime(),
      OAuthProvider: 'KAKAO',
    };
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
export const signInWithApple = async (): Promise<SessionType | null> => {
  try {
    // Apple 로그인 요청 수행
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    // 애플에서 반환한 jwt
    const token = appleAuthRequestResponse.authorizationCode;
    const familyName =
      appleAuthRequestResponse.fullName?.familyName ?? undefined;
    const givenName = appleAuthRequestResponse.fullName?.givenName ?? undefined;

    // 인증 상태 확인
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    if (!(token && credentialState === appleAuth.State.AUTHORIZED)) {
      console.log('User is not authenticated');
      return null;
    }
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
      familyName,
      givenName,
    });
    console.log(response);

    if (!response) {
      console.log('애플 로그인 실패');
      return null;
    }

    console.log('애플 로그인 성공:', response);
    return {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      OAuthProvider: 'APPLE',
    };
  } catch (error) {
    console.error('Apple Sign-In Error:', error);
    return null;
  }
};
