import {NaverLoginInitParams, NaverLoginResponse} from '@/types/Login';
import {SessionType} from '@/types/Session';
import {UserType} from '@/types/UserType';
import {getStorage, setStorage} from '@/utils/session';
import {
  getProfile as getKakaoProfile,
  login as kakaoLogin,
  logout as kakaoLogout,
} from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import {NativeModules, Platform} from 'react-native';
import Config from 'react-native-config';
import {post} from './methods';

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
      console.log('Naver Access Token:', accessToken);
      // JWT 토큰
      const response = await post('/auth/login', {
        provider: 'NAVER',
        roles: 'ROLE_USER',
        accessToken,
      });

      if (response) {
        console.log('네이버 로그인 성공:', response);
        const accessTokenExpiresAt = Number(expiresAtUnixSecondString) * 1000;

        return {
          accessToken: accessToken,
          refreshToken: refreshToken,
          accessTokenExpiresAt,
          refreshTokenExpiresAt: accessTokenExpiresAt,
          OAuthProvider: 'NAVER',
        };
      } else {
        console.log('네이버 로그인 실패');
        return null;
      }
    } else {
      console.log('네이버 로그인 실패:', loginResult.failureResponse);
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
      console.log(token);

      return {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        accessTokenExpiresAt: new Date(token.accessTokenExpiresAt).getTime(),
        refreshTokenExpiresAt: new Date(token.refreshTokenExpiresAt).getTime(),
        OAuthProvider: 'KAKAO',
      };
    } else {
      console.log('카카오 로그인 실패');
      return null;
    }
  } catch (error) {
    console.error('카카오 로그인 에러:', error);
    return null;
  }
};

/**
 * @description 로그인 함수
 * @param {SessionType['OAuthProvider']} OAuthProvider
 * @returns {Promise<boolean>} 성공 시 true, 실패 시 false
 */
export const login = async (
  OAuthProvider: SessionType['OAuthProvider'],
): Promise<boolean> => {
  let res: SessionType | null = null;
  if (OAuthProvider === 'KAKAO') {
    res = await signInWithKakao();
  } else if (OAuthProvider === 'NAVER') {
    res = await signInWithNaver();
  } else {
    throw new Error(`Unsupported OAuthProvider: ${OAuthProvider}`);
  }

  if (res) {
    setStorage('session', res);
    return true;
  }

  return false;
};

export const logout = async (): Promise<boolean> => {
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

    return true;
  } catch (error) {
    console.error('로그아웃 에러:', error);
    return false;
  }
};

export const getProfile = async () => {
  try {
    const storageRes: SessionType | null = await getStorage('session');
    if (!storageRes) {
      return null;
    }

    let res: UserType | null = null;

    if (storageRes.OAuthProvider === 'KAKAO') {
      const kakaoProfileRes = await getKakaoProfile();

      if (kakaoProfileRes) {
        res = {
          id: kakaoProfileRes.id,
          name: kakaoProfileRes.nickname,
          image: kakaoProfileRes.profileImageUrl,
        };
      }
    } else if (storageRes.OAuthProvider === 'NAVER') {
      const naverProfileRes = await NaverLogin.getProfile(
        storageRes.accessToken,
      );

      if (naverProfileRes.resultcode === '200') {
        res = {
          id: naverProfileRes.response.id,
          name: naverProfileRes.response.name,
          image: naverProfileRes.response.profile_image ?? '',
        };
      }
    }

    return res;
  } catch (error) {
    console.error('프로필 불러오기 에러:', error);
    return null;
  }
};
