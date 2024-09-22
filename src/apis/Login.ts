import {login as kakaoLogin} from '@react-native-seoul/kakao-login';
import {post} from './methods';
import {NativeModules, Platform} from 'react-native';
import {NaverLoginInitParams} from '@/types/Login';
import {NaverLoginResponse} from '@/types/Login';

//TODO: 토큰 스토리지 저장 flow

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

// TODO: 이 객체 입니다
const naverLoginParams = {
  appName: '이거 객체 지우시고',
  consumerKey: '슬랙 객체 복붙',
  consumerSecret: '하시면',
  serviceUrlSchemeIOS: '된답니다',
  disableNaverAppAuthIOS: false,
};
// 네이버 로그인 함수
export const signInWithNaver = async () => {
  initializeNaver(naverLoginParams);
  try {
    // Oauth 토큰 생성
    const loginResult = await naverLogin();
    if (loginResult.isSuccess && loginResult.successResponse) {
      const {accessToken} = loginResult.successResponse;
      console.log('Naver Access Token:', accessToken);
      // JWT 토큰
      const response = await post('/auth/login', {
        provider: 'NAVER',
        roles: 'ROLE_USER',
        accessToken,
      });

      if (response) {
        console.log('네이버 로그인 성공:', response);
      } else {
        console.log('네이버 로그인 실패');
      }
    } else {
      console.log('네이버 로그인 실패:', loginResult.failureResponse);
    }
  } catch (error) {
    console.error('네이버 로그인 에러:', error);
  }
};

// 카카오 로그인 함수
export const signInWithKakao = async () => {
  try {
    // Oauth 토큰 생성
    const token = await kakaoLogin();
    console.log('Kakao Token:', token);
    // JWT 토큰
    const response = await post('/auth/login', {
      provider: 'KAKAO',
      roles: 'ROLE_USER',
      accessToken: token.accessToken,
    });

    if (response) {
      console.log('카카오 로그인 성공:', response);
    } else {
      console.log('카카오 로그인 실패');
    }
  } catch (error) {
    console.error('카카오 로그인 에러:', error);
  }
};
