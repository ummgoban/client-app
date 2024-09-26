import {login as kakaoLogin} from '@react-native-seoul/kakao-login';
import {post} from './methods';
import {NativeModules, Platform} from 'react-native';
import {NaverLoginInitParams} from '@/types/Login';
import {NaverLoginResponse} from '@/types/Login';
import Config from 'react-native-config';

// iOS 네이버 로그인 초기 셋팅 함수
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
      console.log('serviceUrlSchemeIOS is missing in iOS initialize.');
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
  appName: `${Config.NAVER_APP_NAME}`,
  consumerKey: `${Config.NAVER_CONSUMER_KEY}`,
  consumerSecret: `${Config.NAVER_CONSUMER_SECRET_KEY}`,
  serviceUrlSchemeIOS: `${Config.NAVER_URL_SCHEME}`,
  disableNaverAppAuthIOS: false,
};

// 네이버 로그인 함수
export const signInWithNaver = async (): Promise<boolean> => {
  initializeNaver(naverLoginParams);
  try {
    // OAuth 토큰 생성
    const loginResult = await naverLogin();
    if (loginResult.isSuccess && loginResult.successResponse) {
      const {accessToken} = loginResult.successResponse;
      // JWT 토큰 발급 요청
      const response = await post('/auth/login', {
        provider: 'NAVER',
        roles: 'ROLE_USER',
        accessToken,
      });

      if (response) {
        console.log('네이버 로그인 성공:', response);
        return true;
      } else {
        console.log('네이버 로그인 실패');
        return false;
      }
    } else {
      console.log('네이버 로그인 실패:', loginResult.failureResponse);
      return true;
    }
  } catch (error) {
    console.error('네이버 로그인 에러:', error);
    return false;
  }
};

// 카카오 로그인 함수
export const signInWithKakao = async (): Promise<boolean> => {
  try {
    // OAuth 토큰 생성
    const token = await kakaoLogin();
    // JWT 토큰 발급 요청
    console.log(token);
    const response = await post('/auth/login', {
      provider: 'KAKAO',
      roles: 'ROLE_USER',
      accessToken: token.accessToken,
    });

    if (response) {
      console.log('카카오 로그인 성공:', response);
      return true;
    } else {
      console.log('카카오 로그인 실패');
      return false;
    }
  } catch (error) {
    console.error('카카오 로그인 에러:', error);
    return false;
  }
};
